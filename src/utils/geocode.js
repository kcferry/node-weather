const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia3lsZXZmIiwiYSI6ImNra3htOHBzNzAyM2kzMG1zbXplbWMxaGkifQ.xptkDoeqaGkSbGcVk3eEAA&limit=1`

    request ({url, json: true}, (error, { body }) => {
    
        if(error) {
            callback('Unable to connect to GeoCode service', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geoCode