import Repository from "../lib/repository.js"
import ElementModel from "../models/elementModel.js"

const fields = "atomic_number oficial_name latin_name".split(" ")

function processElement({_id, atomic_number, oficial_name, latin_name}:any): ElementModel {
	return {
		id: parseInt(_id),
		atomic_number: parseInt(atomic_number),
		oficial_name: oficial_name,
		latin_name: latin_name || null
	}
}

const ElementRepository = new Repository("element", fields, processElement )
export default ElementRepository