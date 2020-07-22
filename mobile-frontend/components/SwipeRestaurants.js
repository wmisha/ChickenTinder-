import { View, StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Swiper from './Swiper'
import TopBar from './TopBar'
import SelectGroup from './SelectGroup'
import getGroupData from '../thunks/getGroupData'

const SwipeRestaurants = (props) => {
  useEffect(() => {
    props.dispatch(getGroupData('http://localhost:5000/users', props.account))
  }, [])

  return (

    <View style={styles.wrapper}>
      <TopBar selectGroup={true}/>
      <Text selectable>Join Code: {props.joinCode} </Text>
      <SelectGroup />
      <Swiper />
    </View>
  )
}

const styles = StyleSheet.create({

  wrapper: {
    height: '100%'
  }

})

export default connect(x => ({ ...x }))(SwipeRestaurants)
