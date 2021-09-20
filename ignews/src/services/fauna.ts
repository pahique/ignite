import { Client } from 'faunadb'

export const fauna = new Client({
    secret: process.env.FAUNADB_KEY,
    domain: 'db.fauna.com',   // valor para região Classic, para região US usar 'db.us.fauna.com'
})

