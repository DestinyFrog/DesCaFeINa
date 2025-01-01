import Connection from "../db/conn.js"

class Repository {
	private _query = ""
	private _process_data_callback: Function

	protected table_name: string
	protected primary_key: string
	protected fields: string[]

	constructor(table_name:string, fields:string[], process_data_callback:Function, primary_key:string = "_id") {
		this._process_data_callback = process_data_callback
		this.table_name = table_name
		this.primary_key = primary_key
		this.fields = fields
		this.reset_query()
	}

	reset_query() {
		this._query = ""
	}

	protected get_fields() {
		const _fields = this.fields
		_fields.push(this.primary_key)
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

	public order_by(field:string) {
		this._query = `ORDER BY ${field} ${this._query}`
		return this
	}

	public async read_it() {
		try {
			const conn = Connection.open()
			const crude_data = await conn.execute(this._query)
			const data = crude_data.rows.map((d) => this._process_data_callback(d))
			return data
		}
		catch(err) {
			throw err
		}
	}

	public async do_it() {
		try {
			const conn = Connection.open()
			await conn.execute(this._query)
		}
		catch(err) {
			throw err
		}
	}
}

export default Repository