const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');

const copmaniesRouter = require('./routes/companiesRoutes')
const newsLatterRouter = require('./routes/newsLatterRoutes')
const usersRouter = require('./routes/usersRouters')
const cardsRouter = require('./routes/cardsRoutes')
const tripTypesRouter = require('./routes/tripTypesRoutes')
const flightsRouter = require('./routes/flightsRouter')
const hotelsRouter = require('./routes/hotelsRouter')
const flightOrderRouter = require('./routes/flightOrderRoutes')
const hotelOrderRouter = require('./routes/hotelsOrderRoutes')


const app = express()

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(cors())

// routes

app.use('/api/companies', copmaniesRouter)
app.use('/api/newslatter', newsLatterRouter)
app.use('/api/users', usersRouter)
app.use('/api/cards', cardsRouter)
app.use('/api/triptypes', tripTypesRouter)
app.use('/api/flights', flightsRouter)
app.use('/api/hotels', hotelsRouter)
app.use('/api/flights/order', flightOrderRouter)
app.use('/api/hotels/order', hotelOrderRouter)


app.listen(3000, () => {
    console.log('app successfully run on port 3000!');
})
