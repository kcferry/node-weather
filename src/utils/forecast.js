const request = require('request')

const forecast = (long, lat, location, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=13c4028ef37218c05e7bb2a59cb1f74d&query=${long},${lat}`

    request({ url, json: true}, (error, { body }) => {

        //// COntinue

        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to sourch forecast', undefined)
        } else {
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}C outside. It feels like ${body.current.feelslike}C. The humidity is ${body.current.humidity}%. `)
        }
    })
}


////


module.exports = forecast