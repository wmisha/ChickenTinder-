import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { DataTable } from 'react-native-paper'
import { connect } from 'react-redux'

import SelectGroup from './SelectGroup'
import TopBar from './TopBar'

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
            <SelectGroup style={{zIndex: 100}} />
            <DataTable style={{position: 'absolute', marginTop: 150, zIndex: -1}}>
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
