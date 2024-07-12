import express from 'express'
import urlValidationZod from './zod/urlValidationZod.ts'
import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
dotenv.config()
const PORT = process.env.PORT ?? 3000

const db = createClient({
  url: process.env.DB_URL ?? "",
  authToken: process.env.DB_TOKEN
})

await db.execute(`
    CREATE TABLE IF NOT EXISTS "url" (
      "id"	TEXT NOT NULL,
      "original_url"	TEXT NOT NULL,
      PRIMARY KEY("id")
    );
  `)

app.use(express.json())
app.use(cors())
app.post('/create', async (req, res) => {
  const { url } = req.body
  const { data, success } = urlValidationZod(url)
  if (success) {
    try {
      const UID = 'IU' + Math.floor(Math.random() * 999999)
      await db.execute({
        sql: `INSERT INTO url (id, original_url) VALUES ($UID, $data)`,
        args: { UID, data }
      })
      const idURL = await db.execute({
        sql: `SELECT id FROM url WHERE id = $UID`,
        args: { UID }
      })
      const [id] = idURL.rows
      res.status(201).json(id)
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong :,(' })
    }
  } else {
    res.status(500).json({ message: 'You have to type an URL' })
  }
})

app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const originalURL = await db.execute({
      sql: `SELECT original_url FROM url WHERE id = $id`,
      args: { id }
    })
    const [url] = originalURL.rows
    res.status(200).json(url)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong :,(' })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
