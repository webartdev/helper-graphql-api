import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 2,
            staleTime: 600000
        }
    }
})
export default function ReactQueryProvider(props) {
    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>

    )
}
