import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create(
    devtools((set, get) => ({
        todos: [],
        filter: 'all',
        isLoading: false,
        setTodos: (todos: object[]) => set({ todos }),
        addTodos: (todo: object) => set((state: { todo: object }) => ({ todos: [todo, ...state.todo] })),
        setFilter: (filter: string) => set({ filter }),
        setLoading: (isLoading: boolean) => set({ isLoading }),
        filteredTodos: () => {
            const { todos, filter }: { todos: { completed: boolean }[], filter: string } = get()
            switch (filter) {
                case 'active':
                    return todos.filter(t => !t.completed)
                case 'completed':
                    return todos.filter(t => t.completed)
                default:
                    return todos
            }
        },
        completedCount: () => get().todos.filter((todo: { completed: boolean }) => todo.completed).length,
        activeCount: () => get().todos.filter((todo: { completed: boolean }) => !todo.completed).length,
    }),
        { name: 'todoStore' }
    )
)