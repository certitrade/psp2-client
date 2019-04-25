import * as dotenv from "dotenv"
import * as client from "."

dotenv.config()

const baseUrl = process.env.psp2Url || ""

describe("Connection", () => {
	it("psp2Url environment variable set", () => expect(process.env.psp2Url).toBeTruthy())
	it("psp2UserId environment variable set", () => expect(process.env.psp2UserId).toBeTruthy())
	it("psp2UserKey environment variable set", () => expect(process.env.psp2UserKey).toBeTruthy())
	it("new", () => {
		const connection = new client.Connection(baseUrl, "12345", "0123456789abcdefghij")
		expect(connection).toBeTruthy()
		expect(connection.baseUrl).toBe(baseUrl)
	})
	it("not authorized", async () => {
		const connection = new client.Connection(baseUrl, "12345", "0123456789abcdefghij")
		expect(connection).toBeTruthy()
		const answer = await connection.get("payment") as client.Error
		expect(answer.describedBy).toBeNull()
		expect(answer.title).toBe("Not authorized")
		expect(answer.httpStatus).toBe(403)
		expect(answer.detail).toBe("")
	})
	it("authorized", async () => {
		const connection = new client.Connection(baseUrl, process.env.psp2UserId || "", process.env.psp2UserKey || "")
		expect(connection).toBeTruthy()
		const payments = await connection.get("payment") as client.hal.Collection
		expect(payments).toHaveProperty("total_size")
		expect(payments).toHaveProperty("max_page_size")
	})
})
