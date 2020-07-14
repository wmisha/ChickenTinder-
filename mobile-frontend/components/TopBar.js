import * as React from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'
import { Appbar, Portal, Modal, Card, Button } from 'react-native-paper'

import { connect } from 'react-redux'
import { setTitle, showGroupChooser } from '../action_creators'
import { useNavigation } from '@react-navigation/native'
import { props } from 'ramda'

import getGroupData from '../thunks/getGroupData'

const TopBar = ({ title, account, dispatch, selectGroup }) => {

  const navigation = useNavigation()
  const [visible, setVisible] = React.useState(false)

  const setShowModal = (shown) => () => {
      setVisible(shown);
      Keyboard.dismiss() 
    };

  const navigateTo = (path) => () => {
    Keyboard.dismiss();
    dispatch(setTitle(path))
    navigation.navigate(path)
    setVisible(false);
  }

  const pressTop = () => {
    if (selectGroup){
      dispatch(getGroupData('http://localhost:5000/users', account));
      dispatch(showGroupChooser());
    } else {
      dispatch(showGroupChooser());
    }
  }

  return (
    <View>
      <Appbar.Header style={styles.topBar}>
        <Appbar.Action color="white" icon="menu" onPress={setShowModal(true)} />
        <Appbar.Content

          color="white"
          style={styles.textPart}
          title={title}
          titleStyle={{textAlign: 'center'}}
          onPress={pressTop}
        />
      </Appbar.Header>
      <Portal>
        <Modal style={styles.modal} visible={visible} onDismiss={setShowModal(false)}>
          <Card style={styles.card}>
            <Card.Title title="Options" titleStyle={{ textAlign: 'center' }}></Card.Title>
            <Button onPress={navigateTo('Swipe ▽')}>Swipe Page</Button>
            <Button onPress={navigateTo('Results ▽')}>View Votes</Button>
            <Button onPress={navigateTo('Join')}>Join Group</Button>
            <Button onPress={navigateTo('Create')}>Create Group</Button>
            <Button onPress={navigateTo('Login')} icon="door-open">Sign Out</Button>
            <Card.Content>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    marginBottom: 0,
    backgroundColor: '#DB5461',
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    textAlign: 'center',
    width: '80%',
    left: '10%'
  },
  textPart: {
    color: '#FFFFFF'
  }
})

export default connect(x => ({ ...x }))(TopBar)
