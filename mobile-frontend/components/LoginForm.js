import React, { useState, useContext } from 'react'

import { KeyboardAvoidingView, Text, StyleSheet, ImageBackground, Platform, Keyboard } from 'react-native';

import { TextInput, Button, Banner, Snackbar} from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import AccountContext from '../contexts/AccountContext'

const LoginForm = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    const [account, setAccount] = useContext(AccountContext);
    const [errorMessage, setErrorMessage] = useState('Error creating account!');

    const liftAccount = props.liftAccount;

    const route = `http://localhost:5000/auth/login`

    const clearInputs = () => { [setUsername, setPassword].forEach(func => func('')) }

    const image = { uri: "https://i.pinimg.com/564x/71/41/19/7141190ca7bde7c9d17775a34de717d7.jpg" };

    const login = () => {
        if (!username || !password){
            setErrorMessage('Please fill out all fields before submitting!')
            setVisible(true)
        } else if (username.length < 3){
            setErrorMessage('Username must be at least 3 characters')
            setVisible(true)
        } else if (password.length < 3){
            setErrorMessage('Password must be at least 3 characters')
            setVisible(true)
        } else {
            fetch(route, {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ username, password })
            })
            .then(data => data.json())
            .then(data => {
                if (data.error){
                    throw data.error
                } else if (!data.accessToken){
                    throw "No access token! Error logging in"
                }
                return data;
            })
            .then(data => {
                liftAccount(data.accessToken).then(navigation.navigate('Secondary'))
            })
            .catch(err => {
                clearInputs();
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
                        label: 'Need an account?',
                        color: 'black'
                    },
                    {
                        label: 'Register!',
                        onPress: () => navigation.navigate('Register')
                    },
                ]}

            >
            </Banner>
            <KeyboardAvoidingView style={styles.view} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <Snackbar
                    style={styles.snackbar}
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                >
                    {`${errorMessage}`}
                </Snackbar>
                <Text style={{height: 150}} />
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
                    style={{ height: 40, width: 300, marginBottom: 20}}
                    onChangeText={text => setPassword(text)}
                    textContentType="newPassword"
                    value={password}
                />
                <Button mode='contained' onPress={() => {Keyboard.dismiss(), login()}}>Login!</Button>
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
        resizeMode: "cover",
        justifyContent: "center"
    },
})
export default LoginForm;