export interface IPagination {
	current_page: number;
	pages: number;
	total_count: number;
}

export interface PaginatedItems<T> {
	data: T[],
	pagination: IPagination
}