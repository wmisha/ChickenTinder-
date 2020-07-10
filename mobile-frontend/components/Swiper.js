'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import SwipeCards from '../modified_modules/react-native-tinder-swipe-cards';

const API_KEY = "v_MKWM24kuJxTljLkFNR_riLoj08oXIAsxAJJHdAYa0gfLbWz37xhS09LUg_qLJm6N7wRrTPYsVVNBdXDvpcEh769L6lqsoA1zyqU_B20CoPYExk2tMC3sWpbrb-XnYx"
import axios from 'axios'
const { map, props, pick } = require('ramda')

const request = `http://localhost:4000/`

const businessData = async (request) => {
    try {
        console.log(`Fetching ${request}`)
        const response = await axios.get(`${request}`);
        console.log("Done fetching")
        console.log(response.data);
        return response.data
    } catch (err) {
        console.log(err)
    }
}
const followLink = (link) => {
}

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.shadow} >
                <View style={styles.card}>
                    <Image style={styles.thumbnail} source={{ uri: this.props.image }} />
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

/* const cards = [
  { name: 'Sushi Store', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif' },
  { name: 'Catfish Boat', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif' },
  { name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif' },
  { name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif' },
  { name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif' },
  { name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif' },
  { name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif' },
  { name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif' },
  { name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif' },
]

const cards2 = [
  { name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif' },
  { name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif' },
  { name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif' },
  { name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif' },
] */

export default class Swiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: null,
            outOfCards: false
        }
    }

    componentDidMount() {
        businessData(request)
            .then(cards => this.setState({
                cards
            }))
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

        /*     if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
              console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);
        
              if (!this.state.outOfCards) {
                console.log(`Adding ${cards2.length} more cards`)
        
                this.setState({
                  cards: this.state.cards.concat(cards2),
                  outOfCards: true
                })
              }
        
            } */

    }

    render() {
        console.disableYellowBox = true;

        if (this.state.cards === null) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
        return (
            <SwipeCards
                cards={this.state.cards}
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
        )
    }
}

const styles = StyleSheet.create({
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
        //borderColor: 'pink',
        backgroundColor: 'beige',
        //borderWidth: 0.3,
    },
    thumbnail: {
        width: 300,
        height: 300,
    },
    text: {
        fontFamily: 'Courier',
        //color: 'beige',
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