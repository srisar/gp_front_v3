interface PaginationLink {
    url: string;
    label: string;
    active: boolean;
}

export interface PaginatedItems<T> {
    data: T[];
    total: number;

    current_page: number;
    last_page: number;

    from: number;
    to: number;
    per_page: number;

    links: PaginationLink[];
}
