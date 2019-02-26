import * as hal from "./hal"
import { Customer } from "./Customer"
import { Product } from "./Product"
import { Currency } from "./Currency"

export interface Payment extends hal.Resource {
	id?: string
	created?: string
	state?: "CREATED" | "PENDING" | "WAITING_FOR_APPROVAL" | "READY_FOR_CAPTURE" | "CAPTURED" | "CANCELLED" | "FAILED"
	amount: string
	authorized_amount?: string
	currency: Currency
	language: "sv" | "en"
	merchant?: string
	method: "CARD"
	reference: string
	description: string
	payment_attempts?: []
	return_url: string
	callback_url?: string
	customer?: Customer
	products?: Product[]
	data?: { CARD?: [] }
	_links?: hal.Links & {
		merchant: hal.Link,
		paywin: hal.Link,
	}
}

// tslint:disable-next-line: no-namespace
export namespace Payment {
	export function is(payment: Payment | any): payment is Payment {
		return typeof(payment) == "object" &&
			typeof(payment.amount) == "string" &&
			Currency.is(payment.currency) &&
			(payment.language == "en" || payment.language == "sv") &&
			payment.method == "CARD" &&
			typeof(payment.reference) == "string" &&
			typeof(payment.description) == "string"
	}
}
