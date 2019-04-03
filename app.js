// 載入資源
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

// 設定模板引擎
app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
// 設定靜態檔案
app.use(express.static('public'))
// 處理請求與回應
app.get('/', (req,res) => {
	res.render('index',{ restaurantList: restaurantList.results })
})

app.get('/restaurants/:id', (req,res) => {
	const restaurant = restaurantList.results.filter( restaurant => restaurant.id == req.params.id )
	res.render('show',{ restaurant: restaurant[0] })
})

app.get('/search', (req,res) => {
	const keyword = req.query.keyword
	const restaurantfilter = restaurantList.results.filter( restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
	res.render('index',{ restaurantList: restaurantfilter, keyword: keyword })
})

app.listen(port, () => {
	console.log(`Express is runnng on http://localhost:${port}`)
})