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
        setLoading: (isLoading: boolean) => set({ isLoading })
    }),
        { name: 'todoStore' }
    )
)