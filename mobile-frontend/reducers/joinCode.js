function joinCode(state = 0, action) {
    switch (action.type) {
        case ("SET_JOIN_CODE"):
            return action.join_code
        default:
            return state
    }
}

export default joinCode;