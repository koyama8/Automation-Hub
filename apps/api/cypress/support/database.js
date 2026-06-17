import 'dotenv/config'
import pgPromise from 'pg-promise'

const pgp = pgPromise()

const db = pgp(process.env.DATABASE_URL)

export function deleteUserByEmail(email) {
  return db.none('DELETE FROM public."User" WHERE email = $1', [email])
}
