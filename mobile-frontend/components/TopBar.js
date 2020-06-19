import * as React from 'react';
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper';

export default class TopBar extends React.Component {

    constructor(props){
        super(props);
    }
    render() {
        return (
        <Appbar.Header style={styles.topBar}>
            <Appbar.Action color="white" icon="menu" onPress={() => {}} />
            <Appbar.Content
                color="white"
                style={styles.textPart}
                title="To Do List"
                subtitle="Mobile Vesion"
            />
        </Appbar.Header>
        )
    }
}

const styles = StyleSheet.create({
    topBar: {
        marginBottom: 0,
        backgroundColor: '#457B9D',
    },

    textPart: {
        color: '#FFFFFF'
    }
})