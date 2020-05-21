const request = require('request')

const forecast = (latitude, longtitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=f4c6dfc4ab18a34e15d8e3c0cff0b6e6&query='+ latitude + ',' + longtitude +'&units=s'

    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('No weather found for this location', undefined)
        } else {
            callback(undefined, 'The temprature is ' + body.current.temperature + '. It actually feels like ' + body.current.feelslike + '.',
            )
        }
    })
}

module.exports = forecast