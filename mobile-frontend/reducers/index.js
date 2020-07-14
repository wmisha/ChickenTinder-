import { combineReducers } from 'redux';
import account from './account'
import title from './title'
import groupChooser from './groupChooser'

import { groupList, groupListHasErrored, groupListIsLoading } from './groupList'
import { restaurantList, restaurantListHasErrored, restaurantListIsLoading } from './restaurantList'

import groupId from './groupId'
import joinCode from './joinCode'

const rootReducer = combineReducers({
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
    joinCode
})

export default rootReducer;