export interface Memos {
    data: Memo[]
    meta: Meta
}

export interface Memo {
    id: number
    documentId: string
    Title: string
    Body: string
    Deleted_at: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: any
}

export interface Meta {
    pagination: Pagination
}

export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}
