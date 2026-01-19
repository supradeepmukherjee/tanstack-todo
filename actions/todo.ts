'use server'

import { connectDb } from "@/lib/db"
import Todo from "@/model/Todo"
import { createSchema } from "@/validations/todo"
import { revalidatePath } from "next/cache"

export const createTodo = async (data: object) => {
    try {
        const validatedData = createSchema.parse(data)
        await connectDb()
        const todo = await Todo.create(validatedData)
        revalidatePath('/')
        return {
            success: true,
            data: JSON.parse(JSON.stringify(todo))
        }
    } catch (err) {
        console.error('Error creating todo:', err)
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Failed to create todo'
        }
    }
}

export const getTodos = async () => {
    try {
        await connectDb()
        const todos = await Todo.find({}).sort({ createdAt: -1 }).lean()
        return {
            success: true,
            data: todos
        }
    } catch (err) {
        console.error(err);
        return{
            success:false,
            error:'Failed to fetch TODOs'
        }
    }
}