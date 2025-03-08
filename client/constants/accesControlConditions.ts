const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY as string

export const accessControlConditions = [
    {
        contractAddress: '',
        standardContractType: '',
        chain: "baseSepolia",
        method: '',
        parameters: [
            ':userAddress',
        ],
        returnValueTest: {
            comparator: '=',
            value: PUBLIC_KEY,
        }
    }
]