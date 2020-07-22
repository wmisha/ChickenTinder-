import { map, pick } from 'ramda'

import { groupListIsLoading, groupListFetchDataSuccess, groupListHasErrored } from '../action_creators'

const getGroupData = (request, account) => {
    return (dispatch) => {
        dispatch(groupListIsLoading(true));

        fetch(request, {
            headers: {
                'Authorization': `Bearer ${account}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(groupListIsLoading(false));
            return response;
        })
        .then(response => response.json())
        .then(map(pick(['id', 'group_name', 'join_code', 'location'])))
        .then(items => {
            dispatch(groupListFetchDataSuccess(items))
        })
        .catch(err =>{
            alert(err.message)
            dispatch(groupListHasErrored(true))
        })
    }
}

export default getGroupData