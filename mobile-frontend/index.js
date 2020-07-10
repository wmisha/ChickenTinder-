import { registerRootComponent } from 'expo';
import React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './App';


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#192BC2',
        accent: '#f1c40f',
    },
};

export default function Main(){
    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    )
}
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Main);
