import { Connection } from "./Connection"
import { Error } from "./Error"
import * as hal from "./hal"

import "../environment.local"

const baseUrl = "https://apitest.certitrade.net/ctpsp/ws/2.0/"

describe("Connection", () => {
	it("CertitradeUserType environment variable set", () => expect(process.env.CertitradeUserType).toBeTruthy())
	it("CertitradeUserId environment variable set", () => expect(process.env.CertitradeUserId).toBeTruthy())
	it("CertitradeUserKey environment variable set", () => expect(process.env.CertitradeUserKey).toBeTruthy())
	it("new", () => {
		const connection = new Connection(baseUrl, "m", "12345", "0123456789abcdefghij")
		expect(connection).toBeTruthy()
		expect(connection.baseUrl).toBe(baseUrl)
	})
	it("not authorized", async () => {
		const connection = new Connection(baseUrl, "m", "12345", "0123456789abcdefghij")
		expect(connection).toBeTruthy()
		const answer = await connection.get("payment") as Error
		expect(answer.describedBy).toBeNull()
		expect(answer.title).toBe("Not authorized")
		expect(answer.httpStatus).toBe(403)
		expect(answer.detail).toBe("")
	})
	it("authorized", async () => {
		const connection = new Connection(baseUrl, process.env.CertitradeUserType as "m" | "a", process.env.CertitradeUserId || "", process.env.CertitradeUserKey || "")
		expect(connection).toBeTruthy()
		const payments = await connection.get("payment") as hal.Collection
		expect(payments).toHaveProperty("total_size")
		expect(payments).toHaveProperty("max_page_size")
	})
})
