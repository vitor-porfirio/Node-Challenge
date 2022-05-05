import http from 'http'
import { createConnection } from 'mysql'

const configDatabase = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const PORT = 3000

const queryCreate = `
    CREATE TABLE IF NOT EXISTS PEOPLE(
    ID INT NOT NULL AUTO_INCREMENT, 
    NAME VARCHAR(50) NOT NULL,
    PRIMARY KEY (ID)
    )`

const queryInsert = `INSERT INTO PEOPLE (name) values ("Name x")`
const querySelect = `SELECT * FROM PEOPLE as people`

const db = createConnection(configDatabase)
db.connect(() => db.query(queryCreate))

const server = http.createServer((_, res) => {
    db.query(queryInsert)
    db.query(querySelect, (err, results, _) => {
        console.log(results)
        res.end(response(results))
    })
})

function response(results) {
    return `
    <h1>Full Cycle Rocks!</h1>
    <ul>
        ${results.map(({ NAME }) => `<li>${NAME}</li>`)}
    </ul>
    `
}

server.listen(PORT, () => console.log(`Server is running at ${PORT}`))