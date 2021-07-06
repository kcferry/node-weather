const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kyle Ferry'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kyle Ferry'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Refresh the page and search for a valid city',
        name: 'Kyle Ferry'
    })
})

/////////

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, location, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                location,
                forcast: forecastData,
                Address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/help/*', (reg, res) => {
    res.render('404', {
        title: 'Error 404 Help',
        message: 'Help Artical Not Found...',
        name: 'Kyle Ferry'
    })
})

app.get('*', (reg, res) => {
    res.render('404', {
        title: 'Error 404',
        message: 'Page Not Found',
        name: 'Kyle Ferry'
    })
})



// Web server setup
app.listen(port, () => {
    console.log(`Server is up on Port ${port} `)
})