const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

async function initialize() {
    const db = await sqlite.open({
        filename: './database/database.sqlite',
        driver: sqlite3.Database
    })
    await db.migrate({
        migrationsPath: './database/migrations'
    })

    await db.close()
}

module.exports = initialize;