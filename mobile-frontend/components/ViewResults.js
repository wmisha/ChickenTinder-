import { View, StyleSheet, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DataTable } from 'react-native-paper'
import { connect } from 'react-redux'

import SelectGroup from './SelectGroup'
import TopBar from './TopBar'
import getVoteData from '../thunks/getVoteData'
import getGroupData from '../thunks/getGroupData'

const ViewResults = (props) => {
  useEffect(() => {
    props.dispatch(getGroupData('http://localhost:5000/users', props.account))
    props.dispatch(getVoteData(`http://localhost:5000/groups/${props.groupId}/votes`, props.account))
  }, [])

  const [page, setPage] = useState(1)

  const staticResults = Object.values(props.voteList).sort((a, b) => {
    return a.yes > b.yes ? -1 : 1
  })

  const items = Object
    .keys(staticResults)
    .map((restaurant, idx) => {
      const votes = staticResults[restaurant]
      return (
        <DataTable.Row key={idx}>
          <DataTable.Cell>{votes.name}</DataTable.Cell>
          <DataTable.Cell numeric>{votes.yes}</DataTable.Cell>
          <DataTable.Cell numeric>{votes.no}</DataTable.Cell>
        </DataTable.Row>
      )
    })

  const itemsPerPage = 10

  const highestPage = Math.ceil(items.length / itemsPerPage)

  const changePage = (evt) => {
    if (evt <= 0 || evt > highestPage) {
      return
    }
    setPage(evt)
  }

  return (

    <View style={styles.wrapper}>
      <TopBar selectGroup={true} />
      <Text selectable>Join Code: {props.joinCode} </Text>
      <SelectGroup />
      <DataTable style={{ position: 'absolute', marginTop: 150, zIndex: -1 }}>
        <DataTable.Header style={{ zIndex: -1 }}>
          <DataTable.Title>Restaurant</DataTable.Title>
          <DataTable.Title numeric>Yes</DataTable.Title>
          <DataTable.Title numeric>No</DataTable.Title>
        </DataTable.Header>
        {items.slice(itemsPerPage * (page - 1), itemsPerPage * page)}
        <DataTable.Pagination
          page={page}
          style={{ zIndex: -1 }}
          onPageChange={changePage}
          numberOfPages={Math.floor(items.length / itemsPerPage)}
          label={`Page ${page} of ${Math.ceil(items.length / itemsPerPage)}`}>
        </DataTable.Pagination>
      </DataTable>
    </View>
  )
}

const styles = StyleSheet.create({

  wrapper: {
    height: '100%'
  }

})

export default connect(x => ({ ...x }))(ViewResults)

/* export default connect(x => ({ ...x }))(SwipeRestaurants)
const ViewResults = (props) => {

    const [page, setPage] = useState(1);

    const staticResults = {
        "Pasta Parish": { "yes": 40, "no": 12 },
        "Pizza Place": { "yes": 20, "no": 32 },
        "Poki Palace": { "yes": 30, "no": 22 },
        "Parsley Pad": { "yes": 10, "no": 42 },
        "-Pasta Parish": { "yes": 40, "no": 12 },
        "-Pizza Place": { "yes": 20, "no": 32 },
        "-Poki Palace": { "yes": 30, "no": 22 },
        "-Parsley Pad": { "yes": 10, "no": 42 },
        "--Pasta Parish": { "yes": 40, "no": 12 },
        "--Pizza Place": { "yes": 20, "no": 32 },
        "--Poki Palace": { "yes": 30, "no": 22 },
        "--Parsley Pad": { "yes": 10, "no": 42 },
        "---Pasta Parish": { "yes": 40, "no": 12 },
        "---Pizza Place": { "yes": 20, "no": 32 },
        "---Poki Palace": { "yes": 30, "no": 22 },
        "---Parsley Pad": { "yes": 10, "no": 42 }
    }

    const items = Object
        .keys(staticResults)
        .map((restaurant, idx) => {
            const votes = staticResults[restaurant];
            return (
                <DataTable.Row key={idx}>
                    <DataTable.Cell>{restaurant}</DataTable.Cell>
                    <DataTable.Cell numeric>{votes.yes}</DataTable.Cell>
                    <DataTable.Cell numeric>{votes.no}</DataTable.Cell>
                </DataTable.Row>
            )
    })

    const itemsPerPage = 10

    const highestPage = Math.ceil(items.length / itemsPerPage);

    const changePage = (evt) => {
        if (evt <= 0 || evt > highestPage){
            return ;
        }
        setPage(evt);
    }

    return (
        <View>
            <TopBar selectGroup={true}/>
            <Text selectable>Join Code: {props.joinCode} </Text>
            <SelectGroup />
            <DataTable style={{position: 'absolute', marginTop: 599, zIndex: -1}}>
                <DataTable.Header style={{zIndex: -1}}>
                    <DataTable.Title>Restaurant</DataTable.Title>
                    <DataTable.Title numeric>Yes</DataTable.Title>
                    <DataTable.Title numeric>No</DataTable.Title>
                </DataTable.Header>
                { items.slice(itemsPerPage * (page - 1), itemsPerPage * page) }
                <DataTable.Pagination
                    page={page}
                    style={{ zIndex: -1 }}
                    onPageChange={changePage}
                    numberOfPages={Math.floor(items.length / itemsPerPage)}
                    label={`Page ${page} of ${Math.ceil(items.length / itemsPerPage)}`}>
                </DataTable.Pagination>
            </DataTable>
        </View>
    )
}

const styles = StyleSheet.create({
    table: {
        height: '80%',
        flex: 1,
        justifyContent: 'center'
    }
})

export default connect(x => ({ ...x }))(ViewResults)
 */
