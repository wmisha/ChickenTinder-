const queryString = require('query-string')
const { API_KEY } = require('./secret_data')
const axios = require('axios').default
const path = "https://api.yelp.com/v3/businesses/search"
const db = require('./models')

function addRestaurants(group_id, query){
    query = queryString.stringify(query);
    const url = `${path}?${query}`;

    axios.get(url, {
        headers: {
            authorization: `Bearer ${API_KEY}`
        }
    }).then(result => result.data.businesses)
      .then(businesses => {
          businesses.forEach(business => {
              console.log(business.location.city);
              console.log(business.distance);
              db.Restaurant.create({
                  group_id,
                  name: business.name,
                  rating: business.rating,
                  price: business.price ? business.price.length : 0,
                  location: business.location.city || 'Unknown',
                  distance: business.distance || 0.0

              }).then(() => {
                  console.log(`Added ${business.name} to the db for group ${group_id}`)
              }).catch(err => console.error(err.message))
          })
      }).catch(err => console.error(err.message))
}

/*
addRestaurants(42, {
    location: "San Francisco",
    radius: 2000,
    term: "Boba",
    limit: 5
})
*/

module.exports = addRestaurants;
