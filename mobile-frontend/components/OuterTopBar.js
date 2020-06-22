import * as React from 'react';
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';


const OuterTopBar = () => {
    return (
        <Appbar.Header style={styles.topBar}>
            <Appbar.Content
                color="white"
                style={styles.textPart}
                title="Todo List App"
                subtitle="Select a list, or make a new one!"
            />
        </Appbar.Header>
    )
}

export default OuterTopBar;
const styles = StyleSheet.create({
    topBar: {
        marginBottom: 0,
        backgroundColor: '#457B9D',
    },

    textPart: {
        color: '#FFFFFF'
    }
})