export function voteListHasErrored(state = false, action) {
    switch (action.type) {
        case 'VOTE_LIST_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function voteListIsLoading(state = false, action) {
    switch (action.type) {
        case 'VOTE_LIST_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function voteList(state = [], action) {
    switch (action.type) {
        case 'VOTE_LIST_FETCH_DATA_SUCCESS':
            return action.items;
        default:
            return state;
    }
}