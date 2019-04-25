export interface PaymentAccount {
	id: string
	created: string
	state: "UNINITIALIZED" | "ACTIVE" | "CLOSED"
	merchant: string
	payment: string
	type: string
	expiry_date: string
	masked_cardno: string
	bin: string
	_links: {
		self: string,
		merchant: string,
	}
	_embedded: {}
}
