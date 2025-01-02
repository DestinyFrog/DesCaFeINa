import Express from 'express'
import ElementRepository from '../repositories/elementRepository.js'

const router = Express.Router()

router.get("/", async (req, res) => {
	try {
		const repo = new ElementRepository()

		const data = await repo
			.get_all()
			.read_it()

		res.json(data)
	}
	catch(err) {
		res.status(500)
			.json(err)
	}
})

router.get("/:atomic_number", async (req, res) => {
	try {
		const atomic_number = parseInt(req.params.atomic_number)
		const repo = new ElementRepository()

		const data = await repo
			.get_one_by("atomic_number", atomic_number)
			.read_it()

		res.json(data)
	}
	catch(err) {
		res.status(500)
			.json(err)
	}
})

router.get("/search/:term", async (req, res) => {
	try {
		const term = req.params.term
		const repo = new ElementRepository()

		const data = await repo
			.search_for(term as string)
			.get_all()
			.read_it()

		res.json(data)
	}
	catch(err) {
		res.status(500)
			.json(err)
	}
})

router.get("/symbol/:symbol", async (req, res) => {
	try {
		const symbol = req.params.symbol
		const repo = new ElementRepository()

		const data = await repo
			.get_one_by("symbol", symbol as string)
			.read_it()

		res.json(data)
	}
	catch(err) {
		res.status(500)
			.json(err)
	}
})

export default router