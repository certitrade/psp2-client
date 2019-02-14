import { Payment } from "./Payment"

describe("Payment", () => {
	it("is", async () => {
		const payment: Payment = { amount: "10000", currency: "SEK", language: "en", reference: "1337", description: "A test.", method: "CARD", return_url: "https://example.com" }
		expect(Payment.is(payment)).toBeTruthy()
	})
})
