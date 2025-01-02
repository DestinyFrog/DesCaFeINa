import Express from 'express'
import dotenv from 'dotenv'

import ElementRoute from './routes/element.js'
import DictionaryRoute from './routes/dictionary.js'

dotenv.config()
const PORT = process.env.PORT || 3000
const API_PREFIX = process.env.API_PREFIX || "/api"

const app = Express()

app.use(Express.json())

app.use(API_PREFIX+"/element", ElementRoute)
app.use(API_PREFIX+"/dictionary", DictionaryRoute)

app.get("/", (req, res) => {
	res.end("Hello, World!")
})


app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}/`)
})