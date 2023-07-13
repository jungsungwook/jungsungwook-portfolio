import { SwiperSlide } from "swiper/react";
import Typed from 'typed.js';
import { useRef, useEffect } from "react";
import anime from "animejs";
class Props {
    currentPage: number | undefined;
}
const IndexPage = (props: Props) => {
    const pageNumber = 0;
    const el = useRef(null);
    const el2 = useRef(null);
    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Hi, there.^500 I'm <strong>Sung Wook.</strong>^800 I'm a <strong>Back-end Developer.</strong>^500"],
            typeSpeed: 50,
            startDelay: 0,
            backSpeed: 0,
            smartBackspace: true,
            shuffle: false,
            backDelay: 0,
            fadeOut: true,
            loop: false,
            contentType: 'html',
            onComplete: (self) => {
                self.cursor.remove();
                const typed2 = new Typed(el2.current, {
                    strings: ["^300Welcome to my <strong>Portfolio</strong> website.^300"],
                    typeSpeed: 50,
                    startDelay: 0,
                    backSpeed: 0,
                    smartBackspace: true,
                    shuffle: false,
                    backDelay: 0,
                    fadeOut: true,
                    loop: false,
                    contentType: 'html',
                    onComplete: (self2) => {
                        const fireworks = document.querySelector('.fireworks');
                        const ctx = fireworks.getContext('2d');
                        const numberOfParticules = 30;
                        let pointerX = 0;
                        let pointerY = 0;
                        const tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'click';
                        const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
                        const setCanvasSize = () => {
                            fireworks.width = window.innerWidth * 2;
                            fireworks.height = window.innerHeight * 2;
                            fireworks.style.width = window.innerWidth + 'px';
                            fireworks.style.height = window.innerHeight + 'px';
                            fireworks.getContext('2d').scale(2, 2);
                        }
                        const updateCoords = (e: any) => {
                            pointerX = e.clientX || e.touches[0].clientX;
                            pointerY = e.clientY || e.touches[0].clientY;
                        }
                        const setParticuleDirection = (p: any) => {
                            const angle = anime.random(0, 360) * Math.PI / 180;
                            const value = anime.random(50, 180);
                            const radius = [-1, 1][anime.random(0, 1)] * value;
                            return {
                                x: p.x + radius * Math.cos(angle),
                                y: p.y + radius * Math.sin(angle)
                            }
                        }
                        const createParticule = (x: any, y: any) => {
                            const p: any = {};
                            p.x = x;
                            p.y = y;
                            p.color = colors[anime.random(0, colors.length - 1)];
                            p.radius = anime.random(16, 32);
                            p.endPos = setParticuleDirection(p);
                            p.draw = function () {
                                ctx.beginPath();
                                ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
                                ctx.fillStyle = p.color;
                                ctx.fill();
                            }
                            return p;
                        }
                        const createCircle = (x: any, y: any) => {
                            const p: any = {};
                            p.x = x;
                            p.y = y;
                            p.color = '#FFF';
                            p.radius = 0.1;
                            p.alpha = .5;
                            p.lineWidth = 6;
                            p.draw = function () {
                                ctx.globalAlpha = p.alpha;
                                ctx.beginPath();
                                ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
                                ctx.lineWidth = p.lineWidth;
                                ctx.strokeStyle = p.color;
                                ctx.stroke();
                                ctx.globalAlpha = 1;
                            }
                            return p;
                        }
                        const renderParticule = (anim: any) => {
                            for (let i = 0; i < anim.animatables.length; i++) {
                                anim.animatables[i].target.draw();
                            }
                        }
                        const animateParticules = (x: any, y: any) => {
                            const circle = createCircle(x, y);
                            const particules = [];
                            for (let i = 0; i < numberOfParticules; i++) {
                                particules.push(createParticule(x, y));
                            }
                            anime.timeline().add({
                                targets: particules,
                                x(p) { return p.endPos.x; },
                                y(p) { return p.endPos.y; },
                                radius: 0.1,
                                duration: anime.random(1200, 1800),
                                easing: 'easeOutExpo',
                                update: renderParticule
                            })
                                .add({
                                    targets: circle,
                                    radius: anime.random(80, 160),
                                    lineWidth: 0,
                                    alpha: {
                                        value: 0,
                                        easing: 'linear',
                                        duration: anime.random(600, 800),
                                    },
                                    duration: anime.random(1200, 1800),
                                    easing: 'easeOutExpo',
                                    update: renderParticule,
                                    offset: 0
                                });
                        }
                        const render = anime({
                            duration: Infinity,
                            update: () => {
                                ctx.clearRect(0, 0, fireworks.width, fireworks.height);
                            }
                        });
                        document.addEventListener(tap, (e) => {
                            window.human = true;
                            render.play();
                            updateCoords(e);
                            animateParticules(pointerX, pointerY);
                        }
                            , false);
                        const centerX = window.innerWidth / 2;
                        const centerY = window.innerHeight / 2;
                        const autoClick = () => {
                            if (window.human) return;
                            const rand_duration = Math.floor(Math.random() * 400) + 100;
                            animateParticules(
                                anime.random(centerX - 200, centerX + 200),
                                anime.random(centerY - 200, centerY + 200)
                            );
                            anime({ duration: rand_duration }).finished.then(autoClick);
                        };
                        autoClick();
                        setCanvasSize();
                        window.addEventListener('resize', setCanvasSize, false);
                    }
                });
            }
        });
        return () => {
            typed.destroy();
        }
    }, []);
    return (
        <>
            <div className="swiper-slide">
                <div className="page_0_wrap">
                    <div className="page_0_title">
                        <span style={{ whiteSpace: 'pre' }} className="introduce_01_span" ref={el} />
                    </div>
                    <div className="page_0_title_02">
                        <span style={{ whiteSpace: 'pre' }} className="introduce_02_span" ref={el2} />
                    </div>
                    <canvas style={{ position: "fixed" }} className="fireworks"></canvas>
                </div>
            </div>
        </>
    );
};

export default IndexPage;