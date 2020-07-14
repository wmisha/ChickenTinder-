import { KeyboardAvoidingView, View, StyleSheet, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'
import { TextInput, Button, Snackbar} from 'react-native-paper'
import { connect } from 'react-redux'

import OuterTopBar from './TopBar'

import getGroupData from '../thunks/getGroupData'

const JoinGroup = (props) => {

  const [message, setMessage] = useState('Demo')
  const [visible, setVisible] = useState(true);
  const [joinCode, setJoinCode] = useState('')

  const makeGroup = () => {
    // ???? Joining a group is at POST /users/joinCode ???
    // ???  But delete /users/integer is meant for 
    fetch(`http://localhost:5000/users/${parseInt(joinCode) || 0}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${props.account}`,
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error)
        }
        return data
    }).then(() => {
        props.dispatch(getGroupData(`http://localhost:5000/users`, props.account))
        setMessage('Joined Group!')
    })
      .catch(err => setMessage(err.message))
      .finally(() => {
        Keyboard.dismiss();
        setJoinCode('')
      })
  }

  return (
    <View style={styles.wrapper}>
      <OuterTopBar />
      <Snackbar
        style={styles.snackbar}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        {`${message}`}
      </Snackbar>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}>

        <TextInput
          mode="outlined"
          style={styles.inner}
          label="Join Code"
          selectionColor="pink"
          value={joinCode}
          onChangeText={setJoinCode}
        />

        <Button
          color="#310A31"
          style={styles.button}
          onPress={() => { Keyboard.dismiss(); makeGroup(); setVisible(true)}}>
                        Submit
        </Button>

      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({

  wrapper: {
    height: '100%',
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    width: '50%',
    left: '25%'
  },
  inner: {
    width: '80%',
    left: '10%'
  }

})

export default connect(x => ({ ...x }))(JoinGroup)
