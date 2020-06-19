import { registerRootComponent } from 'expo';
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper';
import App from './App';

export default function Main(){
    return (
        <PaperProvider>
            <App />
        </PaperProvider>
    )
}
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Main);
