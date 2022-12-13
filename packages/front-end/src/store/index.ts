let isConnected: boolean = false

const handleConnect = (state: any, setState: any, key: string) => {
    if (key) {
        setState({
            ...state,
            isConnected: true,
        })
    }
}

// const handleConnect = (key: string) => {
//     if (key) isConnected = true
// }

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
    handleConnect?: (state: any, useState: any, key: string) => void
    isConnected?: boolean
}

export const initialStoreState: Store = {
    handleConnect,
    rentables,
    isConnected,
}
