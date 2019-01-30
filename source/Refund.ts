export interface Refund {
	id: string
	created: string
	state: "PENDING" | "DONE" | "CANCELLED" | "FAILED"
	amount: string
	_links: { self: string, payment: string }
	_embedded: { }
}
