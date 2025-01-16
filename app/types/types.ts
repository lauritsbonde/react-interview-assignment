export interface AllUsers {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	data: User[];
}

export interface SingleUser {
	data: User;
	support: {
		text: string;
		url: string;
	};
}

export interface User {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
}
