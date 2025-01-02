import { Row } from "@libsql/client"
import Repository, { CONDITION } from "../lib/repository.js"
import DictionaryModel from "../models/dictionaryModel.js"
import { t_general_string } from "../lib/util.js"

class DictionaryRepository extends Repository {
	protected table_name: string = "dictionary"
	protected fields: string[] = [
		"terms",
		"description"
	]

	public search_for(term:string) {
		this
			.condition("symbol", CONDITION.LIKE, t_general_string(term), "OR" )
			.condition("oficial_name", CONDITION.LIKE, t_general_string(term), "OR" )
			.condition("another_names", CONDITION.LIKE, t_general_string(term), "OR" )
			.condition("discovery", CONDITION.LIKE, t_general_string(term) )
			.where()
		return this
	}

	protected process_data({_id, terms, description}: Row): DictionaryModel {
		return {
			id: <number> _id,
			terms: JSON.parse(terms as string),
			description: <string> description
		}
	}
}

export default DictionaryRepository