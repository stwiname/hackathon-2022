export const metaDataEndpoint =
    "https://gateway.pinata.cloud/ipfs/QmTfLu91SDcwmW1zP3meF7mEcPkieYBCMA5HmRnfC2AbbL"

export type Person = {
    name: string
    address: string
}

export const people: Person[] = [
    {
        name: "ian",
        address: process.env.IANS_ADDRESS!,
    },
    {
        name: "rob",
        address: process.env.ROBS_ADDRESS!,
    },
    {
        name: "weiqi",
        address: process.env.WEIQIS_ADDRESS!,
    },
]
