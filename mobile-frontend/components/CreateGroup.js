import { KeyboardAvoidingView, View, StyleSheet, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'

import { TextInput, Button, Snackbar } from 'react-native-paper'
import { connect } from 'react-redux'
import OuterTopBar from './TopBar'

import getGroupData from '../thunks/getGroupData'

const CreateGroup = (props) => {
  const [visible, setVisible] = useState(true)
  const [message, setMessage] = useState('Demo Message')
  const [groupName, setGroupName] = useState('')
  const [location, setLocation] = useState('')

  const makeGroup = () => {
    fetch('http://localhost:5000/groups', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${props.account}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        group_name: groupName,
        location
      })
    }).then(response => {
      if (!response.ok) {
        throw new Exception('Failed to create group.')
      }
    }).then(() => {
      props.dispatch(getGroupData('http://localhost:5000/users', props.account))
      setMessage('Group created!')
    })
      .catch(err => setMessage(err.message))
      .finally(() => {
        Keyboard.dismiss()
        setGroupName('')
        setLocation('')
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
          value={groupName}
          onChangeText={setGroupName}
          label="Group Name"
          selectionColor="pink"/>

        <TextInput
          mode="outlined"
          style={styles.inner}
          onChangeText={setLocation}
          value={location}
          label="Location" />

        <Button
          color="#310A31"
          style={styles.button}
          onPress={() => { Keyboard.dismiss(); makeGroup(); setVisible(true) }}>Submit</Button>

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

export default connect(x => ({ ...x }))(CreateGroup)
