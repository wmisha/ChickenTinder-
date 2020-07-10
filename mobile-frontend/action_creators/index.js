export function setAccount(account){
    return {
        type: "SET_ACCOUNT",
        account
    }
}

export function removeAccount(){
    return {
        type: "REMOVE_ACCOUNT",
    }
}

export function setTitle(title){
    return {
        type: "SET_TITLE",
        title
    }
}
