import { combineReducers } from 'redux';
import account from './account'
import title from './title'
import groupChooser from './groupChooser'

import { groupList, groupListHasErrored, groupListIsLoading } from './groupList'
import { restaurantList, restaurantListHasErrored, restaurantListIsLoading } from './restaurantList'
import { voteList, voteListHasErrored, voteListIsLoading } from './voteList'

import currentRestaurant from './currentRestaurant'
import groupId from './groupId'
import joinCode from './joinCode'

const appReducer = combineReducers({
    account,
    title,
    groupChooser,
    groupList,
    groupListHasErrored,
    groupListIsLoading,
    restaurantList,
    restaurantListHasErrored,
    restaurantListIsLoading,
    groupId,
    joinCode,
    currentRestaurant,
    voteList,
    voteListHasErrored,
    voteListIsLoading
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;