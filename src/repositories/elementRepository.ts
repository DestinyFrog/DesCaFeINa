import { Row } from "@libsql/client"
import Repository, { CONDITION } from "../lib/repository.js"
import ElementModel, { Category, Fase } from "../models/elementModel.js"
import { t_string } from "../lib/util.js"

class ElementRepository extends Repository {
	protected table_name: string = "element"

	protected fields = [
		"atomic_number",
		"oficial_name",
		"latin_name",
		"atomic_radius",
		"category",
		"atomic_mass",
		"eletronegativity",
		"period",
		"family",
		"symbol",
		"fase",
		"xpos",
		"ypos",
		"layers",
		"electronic_configuration",
		"oxidation_state",
		"discovery_year",
		"discovery",
		"another_names"
	]

	public search_for(term:string) {
		term = `%${term}%`
		this
			.condition("symbol", CONDITION.LIKE, t_string(term), "OR" )
			.condition("oficial_name", CONDITION.LIKE, t_string(term), "OR" )
			.condition("another_names", CONDITION.LIKE, t_string(term), "OR" )
			.condition("discovery", CONDITION.LIKE, t_string(term) )
			.where()
		return this
	}

	protected process_data({_id, atomic_number, oficial_name, latin_name, atomic_radius, category, atomic_mass, eletronegativity, period, family, symbol, fase, xpos, ypos, layers, electronic_configuration, oxidation_state, discovery_year, discovery, another_names}: Row): ElementModel {
		return {
			id: <number> _id,
			atomic_number: <number> atomic_number,
			oficial_name: <string> oficial_name,
			latin_name: (<string> latin_name) || null,
			atomic_radius: (<number> atomic_radius) || null,
			category: this.stringToCategory(<string> category),
			atomic_mass: (<number> atomic_mass) || null,
			eletronegativity: (<number> eletronegativity) || null,
			period: <number> period,
			family: <number> family,
			symbol: <string> symbol,
			fase: this.stringToFase(<string> fase),
			pos: {
				x: <number> xpos,
				y: <number> ypos
			},
			layers: JSON.parse(<string> layers),
			discovery_year: <number> discovery_year,
			discovery: JSON.parse(<string> discovery),
			another_names: JSON.parse(<string> another_names)
		}
	}

	protected stringToCategory(category:string): Category {
		switch(category) {
			case 'hidrogênio':				return Category.HYDROGEN
			case 'gás nobre':				return Category.NOBLE_GAS
			case 'metal alcalino':			return Category.ALKALI_METAL
			case 'metal alcalino terroso':	return Category.ALKALINE_EARTH_METAL
			case 'ametal':					return Category.NONMETAL
			case 'halogênio':				return Category.HALOGEN
			case 'metal de transição':		return Category.TRANSITION_METAL
			case 'outros metais':			return Category.ANOTHER_METAL
			case 'desconhecido':			return Category.UNKNOWN
			case 'lantanídeo':				return Category.LANTHANIDE
			case 'actinídeo':				return Category.ACTINIDE
			default:						return Category.UNKNOWN
		}
	}
	
	protected stringToFase(fase:string): Fase {
		switch(fase) {
			case 'S':				return Fase.SOLID
			case 'L':				return Fase.LIQUID
			case 'G':				return Fase.GAS
			default:				return Fase.SOLID
		}
	}
}

export default ElementRepository