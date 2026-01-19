import { createTodo, getTodos } from "@/actions/todo"
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