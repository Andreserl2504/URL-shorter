import z from 'zod'

const urlSchema = z.string().url()

export default (url: string) => {
  return urlSchema.safeParse(url)
}
