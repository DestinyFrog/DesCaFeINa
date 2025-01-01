
export enum Category {
	HYDROGEN,
	NOBLE_GAS,
	ALKALI_METAL,
	ALKALINE_EARTH_METAL,
	NONMETAL,
	HALOGEN,
	TRANSITION_METAL,
	ANOTHER_METAL,
	UNKNOWN,
	LANTHANIDE,
	ACTINIDE
}

export enum Fase {
	SOLID,
	LIQUID,
	GAS
}

interface ElementModel {
	id: number,
	atomic_number: number,
	oficial_name: string,
	latin_name: string | null,
	atomic_radius: number | null,
	category: Category,
	atomic_mass: number | null,
	eletronegativity: number | null,
	period: number,
	family: number,
	symbol: string,
	fase: Fase,
	pos: {
		x: number,
		y: number
	},
	layers: number[],
	discovery_year: number,
	discovery: string[],
	another_names: string[]
}

export default ElementModel