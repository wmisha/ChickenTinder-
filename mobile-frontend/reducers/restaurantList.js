export function restaurantListHasErrored(state = false, action) {
    switch (action.type) {
        case 'RESTAURANT_LIST_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function restaurantListIsLoading(state = false, action) {
    switch (action.type) {
        case 'RESTAURANT_LIST_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function restaurantList(state = [], action) {
    switch (action.type) {
        case 'RESTAURANT_LIST_FETCH_DATA_SUCCESS':
            return action.items;
        default:
            return state;
    }
}