function groupChooser(state = false, action) {
    switch (action.type) {
        case ("SHOW_GROUP_CHOOSER"):
            return true
        case ("HIDE_GROUP_CHOOSER"):
            return false
        default:
            return state
    }
}

export default groupChooser;