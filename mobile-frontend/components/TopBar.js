import React, { useContext } from 'react';
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import ListNameContext from './ListNameContext';

const TopBar = () => {
    const [todoListName, setTodoListName] = useContext(ListNameContext);

    const navigation = useNavigation();
    return (
        <Appbar.Header style={styles.topBar}>
            <Appbar.Action color="white" icon="arrow-left" onPress={() => navigation.navigate('Secondary')} />
            <Appbar.Content
                color="white"
                style={styles.textPart}
                title={todoListName}
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