enum Status {
    PENDING = "pending",
    COMPLETED = "completed"
}

export interface noteType{
    title: string
    description: string
    image?: string[]
    link?: string[]
    status: Status
    isFavourite: boolean 
    userId: string
}