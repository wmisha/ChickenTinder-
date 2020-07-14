'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { connect } from 'react-redux'
import SwipeCards from '../modified_modules/react-native-tinder-swipe-cards';

const API_KEY = "v_MKWM24kuJxTljLkFNR_riLoj08oXIAsxAJJHdAYa0gfLbWz37xhS09LUg_qLJm6N7wRrTPYsVVNBdXDvpcEh769L6lqsoA1zyqU_B20CoPYExk2tMC3sWpbrb-XnYx"
import axios from 'axios'
import { groupListFetchDataSuccess } from '../action_creators';

import getRestaurantData from '../thunks/getRestaurantData'
const { map, props, pick } = require('ramda')

const request = `http://localhost:5000/users`

//const followLink = (link) => {
//}
class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.shadow} >
                <View style={styles.card}>
                    <Image style={styles.thumbnail} source={{ uri: this.props.image_url }} />
                    <Text style={styles.text}>{this.props.name}</Text>
                    <Text>${this.props.price || ''}</Text>
                </View>
            </View>
        )
    }
}

class NoMoreCards extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.noMoreCards}>
                <Text>No more cards</Text>
            </View>
        )
    }
}

class Swiper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: null
        }
    }

    componentDidMount() {
        this.props.dispatch(getRestaurantData('http://localhost:5000/groups/1', this.props.account));
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.groupId !== this.props.groupId || nextProps.account !== this.props.account){
            this.props.dispatch(getRestaurantData(`http://localhost:5000/groups/${nextProps.groupId}`, this.props.account));
        }
    }

    handleYup(card) {
        console.log("yup")
    }

    handleNope(card) {
        console.log("nope")
    }

    cardRemoved(index) {
        console.log(`The index is ${index}`);

        let CARD_REFRESH_LIMIT = 3

    }

    render() {

        console.disableYellowBox = true;

        if (props.groupListIsLoading) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }

        return (
            <View style={styles.main}>
                <SwipeCards
                    cards={this.props.restaurantList}
                    loop={false}
                    style={styles.shadow}
                    renderCard={(cardData) => <Card {...cardData} />}
                    renderNoMoreCards={() => <NoMoreCards />}
                    showYup={true}
                    showNope={true}
                    handleYup={this.handleYup}
                    handleNope={this.handleNope}
                    cardRemoved={this.cardRemoved.bind(this)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({

    main: {
        position: 'absolute',
        top: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 6,
        },
        shadowOpacity: 0.58,
        shadowRadius: 7.0,
        elevation: 12,
        zIndex: 999
    },
    card: {
        alignItems: 'center',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: 'beige',
    },
    thumbnail: {
        width: 300,
        height: 300,
    },
    text: {
        fontFamily: 'Courier',
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    noMoreCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default connect(x => ({...x}))(Swiper)