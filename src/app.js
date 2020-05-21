const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))


// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Nelus'
//     },
//     {
//         name: 'Patrick'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nelus Imhof'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nelus Imhof'
    })
})

app.get('/help', (reg, res) => {
    res.render('help', {
        title: 'Help Me',
        name: 'Nelus Imhof'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.adress) {
        return res.send( {
            error: 'You must provide an adress'
        })
    }


    geocode(req.query.adress, (error, {latitude, longtitude, location} = {}) => {

        if(error) {
            return res.send({ error })
        }
    
        forecast(latitude, longtitude, (error, forecastData) => {
    
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })
    
          })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send( {
            error: 'You must provide a serach term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
    
})

app.get('/help/*', (re, res) => {
    res.render('404', {
        title: '404 Help',
        errorMessage: 'Help Article not Found'
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})