import React, { useState } from 'react'

import { KeyboardAvoidingView, Text, StyleSheet, ImageBackground, Keyboard, Platform } from 'react-native'

import { TextInput, Button, Banner, Snackbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const RegistrationForm = (props) => {
  const route = 'http://localhost:5000/auth/register'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Error creating account!')

  const navigation = useNavigation()

  const clearInputs = () => { [setUsername, setPassword, setConfirmPassword].forEach(func => func('')) }

  const image = { uri: 'https://i.pinimg.com/564x/71/41/19/7141190ca7bde7c9d17775a34de717d7.jpg' }

  const signup = () => {
    if (!username || !password || !confirmPassword) {
      setErrorMessage('Please fill out all fields before submitting!')
      setVisible(true)
    } else if (password !== confirmPassword) {
      setErrorMessage('Password must equal confirmation password!')
      setVisible(true)
    } else if (username.length < 3) {
      setErrorMessage('Username must be at least 3 characters')
      setVisible(true)
    } else if (password.length < 3) {
      setErrorMessage('Password must be at least 3 characters')
      setVisible(true)
    } else {
      fetch(route, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, confirmPassword })
      })
        .then(data => data.json())
        .then(data => {
          if (data.error) {
            throw data.error
          }
          return data
        })
        .then(() => {
          clearInputs()
          navigation.navigate('Login')
        })
        .catch(err => {
          clearInputs()
          setErrorMessage(err)
          setVisible(true)
        })
    }
  }

  return (
    <ImageBackground source={image} style={styles.image}>

      <Banner
        visible={true}
        contentStyle={{ backgroundColor: 'pink', textAlign: 'bottom' }}
        actions={[
          {
            label: 'Already have an account?',
            color: 'black'
          },
          {
            label: 'Log In!',
            onPress: () => navigation.navigate('Login')
          }
        ]}

      >
      </Banner>
      <KeyboardAvoidingView style={styles.view} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          {`${errorMessage}`}
        </Snackbar>
        <Text style={{ height: 100 }} />

        <TextInput
          label="username"
          mode='outlined'
          autoCapitalize='none'
          style={{ height: 40, width: 300, textAlign: 'center' }}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
        />

        <TextInput
          label="password"
          mode='outlined'
          autoCapitalize='none'

          secureTextEntry={true}
          autoCorrect={false}
          placeholder="Password"
          style={{ height: 40, width: 300 }}
          onChangeText={text => setPassword(text)}
          textContentType="newPassword"
          value={password}

          blurOnSubmit={false}
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        <TextInput
          label="confirm password"
          mode='outlined'
          autoCapitalize='none'

          secureTextEntry={true}
          autoCorrect={false}

          placeholder="Confirm Password"
          style={{ height: 40, width: 300, marginBottom: 15 }}
          onChangeText={text => setConfirmPassword(text)}
          textContentType="newPassword"
          value={ confirmPassword }

          blurOnSubmit={false}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <Button mode='contained' onPress={() => { Keyboard.dismiss(); signup() }}>Register!</Button>

      </KeyboardAvoidingView>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  }
})
export default RegistrationForm
