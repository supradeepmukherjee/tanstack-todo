import { createTodo } from "@/actions/todo"
import { useStore } from "@/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"

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