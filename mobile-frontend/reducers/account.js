function account(state="", action){
    switch(action.type){
        case("SET_ACCOUNT"):
            return action.account
        case("REMOVE_ACCOUNT"):
            return ""
        default:
            return state
    }
}

export default account;