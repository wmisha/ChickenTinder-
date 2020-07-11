import { KeyboardAvoidingView, View, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'

import OuterTopBar from './TopBar'

const JoinGroup = (props) => {
  const [joinCode, setJoinCode] = useState('')

  return (
    <View style={styles.wrapper}>
      <OuterTopBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}>

        <TextInput
          mode="outlined"
          style={styles.inner}
          label="Join Code"
          selectionColor="pink"
          value={joinCode}
          onChange={setJoinCode}
        />

        <Button
          color="#310A31"
          style={styles.button}
          onPress={() => { }}>
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