import React from 'react'

import { KeyboardAvoidingView, Text, StyleSheet, ImageBackground } from 'react-native';

import { TextInput, Button, Banner, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const RegistrationForm = (props) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [visible, setVisible] = React.useState(true);

    const navigation = useNavigation();

    const clearInputs = () => { [setUsername, setPassword, setConfirmPassword].forEach(func => func(''))}

    const image = { uri: "https://i.pinimg.com/564x/71/41/19/7141190ca7bde7c9d17775a34de717d7.jpg" };

    return (
        <ImageBackground source={image} style={styles.image}>

            <Banner
                visible={visible}
                contentStyle={{backgroundColor: 'pink', textAlign: 'bottom'}}
                actions={[
                    {
                        label: 'Already have an account?',
                        color: 'black'
                    },
                    {
                        label: 'Log In!',
                        onPress: () => navigation.navigate('Login'),
                    },
                ]}
            
            >
            </Banner>
            <KeyboardAvoidingView style={styles.view} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <Text style={{ height: 100 }} />

                <TextInput
                    label="username"
                    mode='outlined'
                    style={{ height: 40, width: 300, textAlign: 'center' }}
                    placeholder="Username"
                    onChangeText={text => setUsername(text)}
                    value={username}
                />

                <TextInput
                    label="password"
                    mode='outlined'

                    secureTextEntry={true}
                    autoCorrect={false}
                    placeholder="Password"
                    style={{ height: 40, width: 300 }}
                    onChangeText={text => setPassword(text)}
                    textContentType="newPassword"
                    value={password}
                />

                <TextInput
                    label="confirm password"
                    mode='outlined'
                    secureTextEntry={true}
                    autoCorrect={false}

                    placeholder="Confirm Password"
                    style={{ height: 40, width: 300, marginBottom: 15 }}
                    onChangeText={text => setConfirmPassword(text)}
                    textContentType="newPassword"

                    value={confirmPassword}
                />
                <Button mode='contained' onPress={clearInputs}>Register!</Button>

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
export default RegistrationForm;
