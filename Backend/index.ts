import express from 'express'
import urlValidationZod from './zod/urlValidationZod.ts'
import sql, { RowDataPacket } from 'mysql2/promise'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT ?? 3000



const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'url-shorter'
}

const connection = await sql.createConnection(config)

app.use(express.json())
app.use(cors())
app.post('/create', async (req, res) => {
  const { url } = req.body
  console.log(url)
  const { data, success } = urlValidationZod(url)
  if (success) {
    try {
      const UID = 'IU' + Math.floor(Math.random() * 999999)
      await connection.query('INSERT INTO url (id, url) VALUES (?, ?)', [
        UID,
        data
      ])
      const [[{ id }]] = await connection.query<RowDataPacket[]>(
        'SELECT id FROM url WHERE id = ?',
        [UID]
      )
      res.status(201).json({ id })
    } catch (e) {
      res.status(500).json({ Message: 'Something went wrong :,(' })
    }
  } else {
    res.status(500).json({ Message: 'You have to type an URL' })
  }
})

app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [[{ url }]] = await connection.query<RowDataPacket[]>(
      'SELECT url FROM url WHERE id = ?',
      [id]
    )
    res.status(200).json({ url })
  } catch (e) {
    res.status(500).json({ Message: 'Something went wrong :,(' })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
