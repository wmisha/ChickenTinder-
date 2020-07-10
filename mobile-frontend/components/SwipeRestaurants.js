import { KeyboardAvoidingView, View, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'
import Swiper from './Swiper'
import TopBar from './TopBar'

const SwipeRestaurants = (props) => {

    return (
        <View style={styles.wrapper}>
            <TopBar />
            <Swiper />
        </View>
    )
}

const styles = StyleSheet.create({

    wrapper: {
        height: '100%',
    },

})

export default connect(x => ({ ...x }))(SwipeRestaurants)