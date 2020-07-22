import { map, pick } from 'ramda'

import { restaurantListIsLoading, restaurantListFetchDataSuccess, restaurantListHasErrored } from '../action_creators'

const getRestaurantData = (request, account) => {
    return (dispatch) => {
        dispatch(restaurantListIsLoading(true));

        return fetch(request, {
            headers: {
                'Authorization': `Bearer ${account}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(restaurantListIsLoading(false));
            return response;
        })
        .then(response => response.json())
        .then(map(pick(['id', 'name', 'image_url', 'price'])))
        .then(items => {
            dispatch(restaurantListFetchDataSuccess(items))
        },
        err => dispatch(restarantListHasErrored(true)
        )
    )
    }
}

export default getRestaurantData