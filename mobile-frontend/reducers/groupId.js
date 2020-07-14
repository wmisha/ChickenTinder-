function groupId(state = 0, action) {
    switch (action.type) {
        case ("SET_GROUP_ID"):
            return action.group_id
        default:
            return state
    }
}

export default groupId;