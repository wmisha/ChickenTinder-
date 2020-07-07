const { API_BASE_URL, BEARER_TOKEN } = require('./config');
const queryString = require('query-string');
const axios = require('axios').default
const db = require('../models')

const { pick, prop, props, map } = require('ramda')
const headers = {
    authorization: `Bearer ${BEARER_TOKEN}`
}

async function get(path, queryParams) {
    const string = queryString.stringify(queryParams);
    const url = `${API_BASE_URL}/${path}?${string}`
    //console.log(url)

    const result = await axios.get(url, {
        headers: {
            authorization: `Bearer ${BEARER_TOKEN}`
        }
    })

    // Normal callback
    //const businessNames = result.data.businesses.map(item => item.name)
    const businessData = result.data.businesses.map(pick(['name', 'price', 'location']))
    console.log(businessData)
}

const group_id = 42;
function promiseGet(path, queryParams) {
    const string = queryString.stringify(queryParams);
    const url = `${API_BASE_URL}/${path}?${string}`
    //console.log(url)

    axios.get(url, {
        headers: {
            authorization: `Bearer ${BEARER_TOKEN}`
        }
    })
        .then(result => result.data.businesses)
        //.then(map(pick(['name', 'price', 'location'])))
        .then(results => {
            results.forEach(result => {
                db.Restaurant.create({
                    group_id: group_id,
                    name: result.name,
                    price: result.price ? result.price.length : 0,
                    location: result.location.city || 'Unknown',
                }).then(() => {
                    console.log(`added ${result.name} to db`)
                })
                    .catch(err => console.log(err.message))
            })
        })
        .catch(err => console.log('here' + err.message))
}

promiseGet("businesses/search", {
    limit: 20,
    location: "San Francisco",
    term: "Burger",
    radius: 2000
})


