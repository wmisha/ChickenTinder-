import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import ListNameContext from '../contexts/ListNameContext';

const TopBar = (props) => {
    const [todoListName, setTodoListName] = useContext(ListNameContext);

    const [todoCount, setTodoCount] = useState(props.todos ? props.todos.length : 0);
    const navigation = useNavigation();

    useEffect(() => {
        setTodoCount(props.todos.length);
    }, [props.todos])

    return (
        <Appbar.Header style={styles.topBar}>
            <Appbar.Action color="white" icon="arrow-left" onPress={() => navigation.navigate('Secondary')} />
            <Appbar.Content
                color="white"
                style={styles.textPart}
                title={todoListName}
                subtitle={`${todoCount} items`}
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