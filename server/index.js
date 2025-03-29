const express = require('express')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')
const cors = require('cors')

const PORT = 3000
const app = express()

// функция получения пути
const getPath = filename => path.join(__dirname, 'public', `${filename}.html`)

app.use(express.static(path.join(__dirname, 'public')))
// логирующий morgan миддлвейр
app.use(morgan(':method :url :status'))
// миддлвейр для парсинга входящего запроса
app.use(express.json())
// cors
const allowedOrigins = ['https://homework18.onrender.com']
app.use(
	cors({
		methods: ['GET', 'POST'],
		origin: allowedOrigins
	})
)

app.get('/getUsers', (req, res) => {
	try {
		const users = fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8')
		res.json(users)
	} catch (error) {
		console.log('Ошибка при получении пользователей', error)
		res.send('Ошибка при получении пользователей', error)
	}
})
app.post('/addUser', (req, res) => {
	try {
		const user = req.body
		const users = JSON.parse(
			fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8')
		)
		users.push(user)
		fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(users))
		res.send(`Пользователь ${user} успешно добавлен`)
	} catch (error) {
		console.log('Ошибка при добавлении пользователя', error)
		res.send('Ошибка при добавлении пользователя', error)
	}
})
app.get('/search', (req, res) => {
	const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8'))
	const query = req.query.query.toLowerCase()
	const result = users.filter(user => user.name.toLowerCase().includes(query))
	res.json(result)
})

app.listen(PORT, () => {
    console.log(`Server is listening port: ${PORT}`)
})