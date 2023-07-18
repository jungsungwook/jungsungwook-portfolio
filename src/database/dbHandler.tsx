import path from 'path';
import { open } from 'sqlite';
class DbHandler {
    async getDatabase() {
        const db = await open({
            filename: path.resolve('./database/database.sqlite'),
            driver: require('sqlite3').Database
        });
        return db;
    }
}

export default DbHandler;