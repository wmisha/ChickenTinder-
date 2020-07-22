import { voteListIsLoading, voteListFetchDataSuccess, voteListHasErrored } from '../action_creators'


const getVoteData = (request, account) => {
    return (dispatch) => {
        dispatch(voteListIsLoading(true));

        fetch(request, {
            headers: {
                'Authorization': `Bearer ${account}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(voteListIsLoading(false));
            return response;
        })
        .then(response => response.json())
        .then(items => {
            dispatch(voteListFetchDataSuccess(items))
        })
        .catch(err => {
            //alert(err.message)
            dispatch(voteListHasErrored(true))
        })
    }
}

export default getVoteData;
