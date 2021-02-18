const request = require('request');

const forecast = (lat, lon, callback) =>{
    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        qs: {
          //q: 'London,uk',
          lat,
          lon,
          //callback: 'test',
          id: '2172797',
          lang: 'null',
          units: '"metric" or "imperial"',
          mode: 'xml, html'
        },
        headers: {
          'x-rapidapi-key': 'a5a5cc72ddmsha90f10173af1a68p1c1ea4jsn5587f065d8af',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          useQueryString: false
        }
      };
      
      request(options,  (error, { body }) => {
        const data = JSON.parse(body);
        if (error) 
          callback('there is an error in the low levels');
        else if(data.cod >= 400)
            callback('unable to find the location', undefined);
      else{
        //const jsonData = response.body.substring(5,response.body.length-1);
        const callData =`it is currently ${data.main.temp} and if you look to the sky you w'ill see a ${data.weather[0].description}`;
        callback(undefined, callData);
      }
    });
}
module.exports = forecast;