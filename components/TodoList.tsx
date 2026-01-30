'use client'
import { useTodos } from "@/hooks/useCreate"
import { Card, CardContent } from "./ui/card"
import { Loader2 } from "lucide-react"
import { useStore } from "@/store"
import TodoItem from "./TodoItem"
import { Todo } from "@/types/Todo"
import { useEffect, useMemo } from "react"

const TodoList = () => {
    const { isLoading, error } = useTodos()
    const filter = useStore(s => s.filter)
    const todos = useStore(s => s.todos)
    const setTodos = useStore(s => s.setTodos)
    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'active':
                return todos?.filter(t => !t.completed)
            case 'completed':
                return todos?.filter(t => t.completed)
            default:
                return todos
        }
    }, [filter, todos])
    useEffect(() => {
        if (todos) setTodos(todos)
    }, [setTodos, todos])
    if (isLoading) return (
        <Card >
            <CardContent className="p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">
                    Loading todos...
                </p>
            </CardContent>
        </Card>
    )
    if (error) return (
        <Card>
            <CardContent className="p-8 text-center">
                <p className="text-destructive">
                    Error loading todos: {error.message}
                </p>
            </CardContent>
        </Card>
    )
    if (filteredTodos?.length === 0) return (
        <Card>
            <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                    {todos?.length === 0 ? 'No todos created.' : 'No todos match the current filter'}
                </p>
            </CardContent>
        </Card>
    )
    return (
        <div className="space-y-3">
            {filteredTodos?.map((t: Todo) => <TodoItem todo={t} key={t._id} />)}
        </div>
    )
}

export default TodoList