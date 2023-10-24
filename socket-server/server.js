const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const {
    createCanvas
} = require('canvas');

const initialize = require('./initialize');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';


console.log(dev ? `Running on development mode` : `Running on production mode`)

const app = next({
    dev: dev
}); // next 모듈을 사용

const handle = app.getRequestHandler();

//socket
const socketapp = require('express')();
const privateKey = prod ? require('fs').readFileSync(process.env.PRIVATE_KEY, 'utf8') : null;
const certificate = prod ? require('fs').readFileSync(process.env.CERTIFICATE, 'utf8') : null;
const credentials = prod ? {
    key: privateKey,
    cert: certificate
} : null;
const socketserver = prod ? require('https').createServer(credentials ,socketapp) : require('http').createServer(socketapp);
const cors = require('cors');
socketapp.use(cors());
const ports = {
    next: process.env.NEXT_PUBLIC_React_Port,
    socket: process.env.NEXT_PUBLIC_Socket_Port
};

const mainCanvas = createCanvas(2560, 1440);
const mainCtx = mainCanvas.getContext('2d');

const socketUid = {}
const canvas = {}
const ctx = {}

app.prepare().then(() => {
    //nextserver
    const server = express(); // back 서버에서의 const app = express()
    server.use(cors());
    server.use(morgan('dev'));
    server.use(express.json());
    server.use(express.urlencoded({
        extended: true
    }));
    console.log(process.env.COOKIE_SECRET)
    server.use(cookieParser(process.env.COOKIE_SECRET));

    server.use(
        expressSession({
            resave: false,
            saveUninitialized: false,
            secret: process.env.COOKIE_SECRET, // backend 서버와 같은 키를 써야한다.
            cookie: {
                httpOnly: true,
                secure: false,
            },
        }),
    );

    initialize();

    server.get('*', (req, res) => { // 모든 get 요청 처리
        return handle(req, res); // next의 get 요청 처리기
    });

    server.post('*', (req, res) => { // 모든 post 요청 처리
        return handle(req, res); // next의 post 요청 처리기
    });

    server.listen(ports.next, () => {
        console.log('next+expresss running on port ' + process.env.NEXT_PUBLIC_React_Port);
    });
    //socketserver
    const io = require('socket.io')(socketserver, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true,
        }
    });

    io.on('connection', socket => {
        // socket으로 메세지가 들어올 때 
        socket.on('message', (data) => {
                // 랜덤 uid
                const uid = Math.random().toString(36).substr(2, 11);
                socketUid[socket.id] = uid;
                // 현재 접속중인 유저 uid 전달
                const users = Object.values(socketUid);
                mergeCanvas();
                socket.emit('message', {
                    uid: uid,
                    users: users,
                    canvas: mainCanvas.toDataURL(),
                });
                socket.broadcast.emit('guest_enter', {
                    uid: uid,
                })

                canvas[uid] = createCanvas(2560, 1440);
                ctx[uid] = canvas[uid].getContext('2d');
            }),

            socket.on('drawing', (data) => {
                socket.broadcast.emit('drawing', {
                    uid: socketUid[socket.id],
                    offsetX: data.offsetX,
                    offsetY: data.offsetY,
                    color: data.color,
                    lineWidth: data.lineWidth,
                    opt: data.opt
                })
                ctx[socketUid[socket.id]].lineWidth = data.lineWidth;
                ctx[socketUid[socket.id]].globalCompositeOperation = data.opt;
                ctx[socketUid[socket.id]].strokeStyle = data.color;
                ctx[socketUid[socket.id]].lineTo(data.offsetX, data.offsetY);
                ctx[socketUid[socket.id]].stroke();
            }),

            socket.on('mouse_move', (data) => {
                socket.broadcast.emit('mouse_move', {
                    uid: socketUid[socket.id],
                    offsetX: data.offsetX,
                    offsetY: data.offsetY,
                })

                ctx[socketUid[socket.id]].beginPath();
                ctx[socketUid[socket.id]].moveTo(data.offsetX, data.offsetY);
            })

            socket.on('sync_canvas', (data) => {
                mergeCanvas();
                socket.emit('sync_canvas', {
                    canvas: mainCanvas.toDataURL(),
                })
            })
            
            socket.on('disconnect', () => {
                socket.broadcast.emit('guest_exit', {
                    uid: socketUid[socket.id],
                })
                delete socketUid[socket.id];
                delete canvas[socketUid[socket.id]];
                delete ctx[socketUid[socket.id]];
            })

    });

    socketserver.listen(ports.socket, function () {
        console.log(`listening on socket port ${process.env.NEXT_PUBLIC_Socket_Port}`);
    })

    const mergeCanvas = () => {
        mainCtx.clearRect(0, 0, 2560, 1440);
        for (let i in canvas) {
            mainCtx.drawImage(canvas[i], 0, 0);
        }
        //save 
        const fs = require('fs');
        const out = fs.createWriteStream(__dirname + '/test.png');
        const stream = mainCanvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => console.log('The PNG file was created.'));
    }

    mergeCanvasInterval = setInterval(() => {
        mergeCanvas();
    }, 10000);
});