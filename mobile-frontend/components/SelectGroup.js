import * as React from 'react'
import { View } from 'react-native'
import { Button, Menu, IconButton, Provider } from 'react-native-paper'

import { showGroupChooser, hideGroupChooser, setGroupId, setJoinCode } from '../action_creators'
import { connect } from 'react-redux'

import getGroupData from '../thunks/getGroupData'
import getVoteData from '../thunks/getVoteData'

const leaveGroup = (groupId, account) => {
  // LITERALLY WHY
  return fetch(`http://localhost:5000/users/${groupId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${account}`
    }
  })
    .catch(err => console.log(err.message))
}

const SelectGroup = ({ groupChooser, groupList, dispatch, account, groupId }) => {
  return (
    <Provider>

      <View
        style={{
          flex: 0.1,
          height: '10%',
          alignItems: 'center',
          zIndex: 1
        }}>
        <Menu
          visible={groupChooser}
          style={{ marginTop: -20 }}
          onDismiss={() => dispatch(hideGroupChooser())}
          anchor={<Button onPress={() => {
            dispatch(getGroupData('http://localhost:5000/users', account))
            dispatch(showGroupChooser())
          }}></Button>}
        >
          {
            groupList.map((group, index) => {
              return (
                <View key={index} style={{ flexDirection: 'row' }}>
                  <Menu.Item
                    onPress={() => {
                      dispatch(setGroupId(group.id))
                      dispatch(setJoinCode(group.join_code))
                      dispatch(getVoteData(`http://localhost:5000/groups/${groupId}/votes`, account))
                    }}
                    title={group.group_name}
                  >
                  </Menu.Item>
                  <IconButton
                    icon="minus"
                    onPress={() => {
                      leaveGroup(group.id, account)
                        .then(() => dispatch(getGroupData('http://localhost:5000/users', account)))
                    }
                    }/>
                </View>
              )
            })
          }
        </Menu>
      </View>
    </Provider>
  )
}

export default connect(x => ({ ...x }))(SelectGroup)
