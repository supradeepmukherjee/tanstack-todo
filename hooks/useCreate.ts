import { createTodo, deleteTodo, getTodos, toggleTodo } from "@/actions/todo"
import { useStore } from "@/store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// export const useTodos=()=>{
//     const setTodos=useStore(state=>state.setTodos)
// }

export const todoKeys = {
    all: ['todo'],
    lists: () => [...todoKeys.all, 'lists']
}

export const useCreateTodo = () => {
    const queryClient = useQueryClient()
    const addTodo = useStore(state => state.addTodo)
    return useMutation({
        mutationFn: (data: object) => createTodo(data),
        onSuccess: result => {
            if (result.success) console.log(result.data)
            queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
        }
    })
}

export const useTodos = () => {
    const setTodos = useStore(state => state.setTodos)
    return useQuery({
        queryKey: todoKeys.lists(),
        queryFn: async () => {
            const result = await getTodos()
            if (result.success) {
                setTodos(result.data)
                return result.data
            }
            throw new Error(result.error);
        }
    })
}

export const useToggleTodo = () => {
    const queryClient = useQueryClient()
    const updateTodoInStore = useStore(s => s.updateTodo)
    return useMutation({
        mutationFn: (id: string) => toggleTodo(id),
        onSuccess: (result, id) => {
            if (result.success) {
                updateTodoInStore(id, { completed: result.data.completed })
                queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
            }
        },
    })
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient()
    const deleteTodoInStore = useStore(s => s.deleteTodo)
    return useMutation({
        mutationFn: (id: string) => deleteTodo(id),
        onSuccess: (result, id) => {
            if (result.success) {
                deleteTodoInStore(id)
                queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
            }
        },
    })
}