const request = require('request');


const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURI(address)+".json?access_token=pk.eyJ1Ijoic2hiZW4iLCJhIjoiY2tremN0eXkxMG85NjJzbW8xZWt4Nnc3NiJ9.ft8ZkKPiyAJTfokRJUhJhw&limit=1"
    request({url}, (error, response)=>{
        if(error){
           callback('unable to connect', undefined)
        }
        else if (JSON.parse(response.body).features.length === 0) {
            callback('unable to find location');
        }
        else{
            callback(undefined, {
                latitude: JSON.parse(response.body).features[0].center[1],
                longitude: JSON.parse(response.body).features[0].center[0],
                location: JSON.parse(response.body).features[0].place_name
            })

        }
    })
};
module.exports = geocode