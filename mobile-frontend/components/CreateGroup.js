import { KeyboardAvoidingView, View, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'
import OuterTopBar from './TopBar'

const CreateGroup = (props) => {
  return (
    <View style={styles.wrapper}>
      <OuterTopBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}>

        <TextInput
          mode="outlined"
          style={styles.inner}
          label="Group Name"
          selectionColor="pink"/>

        <TextInput
          mode="outlined"
          style={styles.inner}
          label="Location" />

        <Button
          color="#310A31"
          style={styles.button}
          onPress={() => {}}>Submit</Button>

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
