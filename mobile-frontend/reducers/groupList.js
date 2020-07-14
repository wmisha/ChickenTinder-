export function groupListHasErrored(state = false, action) {
    switch (action.type) {
        case 'GROUP_LIST_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function groupListIsLoading(state = false, action) {
    switch (action.type) {
        case 'GROUP_LIST_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function groupList(state = [], action) {
    switch (action.type) {
        case 'GROUP_LIST_FETCH_DATA_SUCCESS':
            return action.items;
        default:
            return state;
    }
}