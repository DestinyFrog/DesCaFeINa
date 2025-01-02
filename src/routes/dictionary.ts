import Express from 'express'
import DictionaryRepository from '../repositories/dictionaryRepository.js'

const router = Express.Router()

router.get("/", async (req, res) => {
	try {
		const repo = new DictionaryRepository()

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

router.get("/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id)
		const repo = new DictionaryRepository()

		const data = await repo
			.get_one_by_id(id)
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
		const repo = new DictionaryRepository()

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

export default router