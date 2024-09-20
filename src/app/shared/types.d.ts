export type Ticket = {
	email: string;
	name: string;
	phone: string;
	screenshot: string;
	ticket_type: string;
};

export type Donation = {
	email: string;
	phone: string;
	screenshot: string;
	amount: string;
};

export type Payment = {
	name: string;
	account: string;
	description: string;
};
