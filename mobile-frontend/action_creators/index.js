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

export function showGroupChooser(){
    return {
        type: "SHOW_GROUP_CHOOSER"
    }
}

export function hideGroupChooser() {
    return {
        type: "HIDE_GROUP_CHOOSER"
    }
}

export function groupListHasErrored(bool) {
    return {
        type: 'GROUP_LIST_HAS_ERRORED',
        hasErrored: bool
    };
}

export function groupListIsLoading(bool) {
    return {
        type: 'GROUP_LIST_IS_LOADING',
        isLoading: bool
    };
}

export function groupListFetchDataSuccess(items) {
    return {
        type: 'GROUP_LIST_FETCH_DATA_SUCCESS',
        items
    };
}

export function restaurantListHasErrored(bool) {
    return {
        type: 'RESTAURANT_LIST_HAS_ERRORED',
        hasErrored: bool
    };
}

export function restaurantListIsLoading(bool) {
    return {
        type: 'RESTAURANT_LIST_IS_LOADING',
        isLoading: bool
    };
}

export function restaurantListFetchDataSuccess(items) {
    return {
        type: 'RESTAURANT_LIST_FETCH_DATA_SUCCESS',
        items
    };
}

export function voteListHasErrored(bool) {
    return {
        type: 'VOTE_LIST_HAS_ERRORED',
        hasErrored: bool
    };
}

export function voteListIsLoading(bool) {
    return {
        type: 'VOTE_LIST_IS_LOADING',
        isLoading: bool
    };
}

export function voteListFetchDataSuccess(items) {
    return {
        type: 'VOTE_LIST_FETCH_DATA_SUCCESS',
        items
    };
}


export function setGroupId(group_id) {
    return {
        type: 'SET_GROUP_ID',
        group_id
    }
}

export function setJoinCode(join_code) {
    return {
        type: 'SET_JOIN_CODE',
        join_code
    }
}

export function setCurrentRestaurant(restaurant_id){
    return {
        type: 'SET_CURRENT_RESTAURANT',
        restaurant_id
    }
}