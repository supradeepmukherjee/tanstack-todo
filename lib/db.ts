import { connect } from "mongoose"

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) throw new Error('MONGO_URI not found')

let cached = global.mongoose

if (!cached) cached = global.mongoose = {
    conn: null,
    promise: null,
}

export const connectDb = async () => {
    if (cached.conn) return cached.conn
    if (!cached.promise) cached.promise = connect(MONGO_URI).then(_ => _)
    try {
        cached.conn = await cached.promise
    } catch (err) {
        cached.promise = null
        throw err
    }
    return cached.conn
}