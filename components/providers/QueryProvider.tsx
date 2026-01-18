'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { Toaster } from "sonner"

const QueryProvider = ({ children }: { children: ReactNode }) =>
    <QueryClientProvider client={useState(() => new QueryClient())[0]}>
        {children}
        <Toaster />
    </QueryClientProvider>

export default QueryProvider