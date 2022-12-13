let isConnected: boolean = false

type rentable = {
    name: string
    description: string
}

const rentables: rentable[] = [
    {
        name: "ian",
        description: "coding",
    },
    {
        name: "rob",
        description: "marketing",
    },
]

export type Store = {
    rentables?: rentable[]
    isConnected?: boolean
    error?: string
    loading?: boolean
}

export const initialStoreState: Store = {
    rentables,
    isConnected,
}
