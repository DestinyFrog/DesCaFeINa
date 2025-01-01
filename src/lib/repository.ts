import { Row } from "@libsql/client"
import Connection from "../db/conn.js"

export enum CONDITION {
	GREATER = ">",
	LOWER = "<",
	GREATER_EQUAL = ">=",
	LOWER_EQUAL = "<=",
	EQUAL = "=",
	DIFERENT = "!=",
	LIKE = "LIKE"
}

class Repository {
	private _query = ""
	private _conditions: string[] = []

	protected table_name: string = ""
	protected primary_key: string = "_id"
	protected created_at: string = "created_at"
	protected fields: string[] = []

	constructor() {
		this.reset_query()
	}

	protected process_data(d:Row) {
		throw new Error("Process Data is not defined!")
	}

	reset_query() {
		this._query = ""
		this.reset_conditions()
	}

	reset_conditions() {
		this._conditions = []
	}

	protected get_fields() {
		const _fields = this.fields
		_fields.push(this.primary_key)
		_fields.push(this.created_at)
		return _fields.join(",")
	}

	public get_all() {
		const fields = this.get_fields()
		this._query = `SELECT ${fields} FROM ${this.table_name} ${this._query}`
		return this
	}

	public get_one_by_id(id:number) {
		const fields = this.get_fields()
		this._query = `SELECT ${fields} FROM ${this.table_name} WHERE ${this.primary_key} = ${id} ${this._query}`
		return this
	}

	public get_one_by(field:string, value:string|number) {
		const fields = this.get_fields()
		this._query = `SELECT ${fields} FROM ${this.table_name} WHERE ${field} = ${value} ${this._query}`
		return this
	}

	public order_by(field:string) {
		this._query = `ORDER BY ${field} ${this._query}`
		return this
	}

	public condition(field:string, condition:CONDITION = CONDITION.EQUAL, value:any, and_or?:"AND"|"OR") {
		this._conditions.push(`${field} ${condition} ${value}`)
		if (and_or) {
			this._conditions.push(and_or)
		}
		return this
	}

	public where() {
		this._query = `WHERE ${this._conditions.join(" ")} ${this._query}`
		return this
	}

	public async read_it() {
		try {
			console.log("\n", this._query, "\n")
			const conn = Connection.open()
			const crude_data = await conn.execute(this._query)
			const data = crude_data.rows.map((d) => this.process_data(d))
			return data
		}
		catch(err) {
			throw err
		}
	}

	public async do_it() {
		try {
			console.log(this._query)
			const conn = Connection.open()
			await conn.execute(this._query)
		}
		catch(err) {
			throw err
		}
	}
}

export default Repository