export type Todo = {
    title: string
    description: string
    completed: boolean
    priority: 'low' | 'medium' | 'high'
    _id: string
    createdAt: string
}