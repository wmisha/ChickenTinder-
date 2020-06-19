import * as React from 'react';
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';


const TopBar = (props) => {
    const navigation = useNavigation();
    return (
        <Appbar.Header style={styles.topBar}>
            <Appbar.Action color="white" icon="layers-triple-outline" onPress={() => navigation.navigate('Secondary')} />
            <Appbar.Content
                color="white"
                style={styles.textPart}
                title="Todo List"
                subtitle="Mobile Version"
            />
        </Appbar.Header>
    )
}

export default TopBar;
const styles = StyleSheet.create({
    topBar: {
        marginBottom: 0,
        backgroundColor: '#457B9D',
    },

    textPart: {
        color: '#FFFFFF'
    }
})