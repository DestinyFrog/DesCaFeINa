import Express from 'express'
import ElementRepository from '../repositories/elementRepository.js'

const router = Express.Router()

router.get("/", async (req, res) => {

	try {
		const data = await ElementRepository
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