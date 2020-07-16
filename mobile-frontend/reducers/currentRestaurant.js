function currentRestaurant(state = 0, action) {
    switch (action.type) {
        case ("SET_CURRENT_RESTAURANT"):
            return action.restaurant_id
        default:
            return state
    }
}

export default currentRestaurant;