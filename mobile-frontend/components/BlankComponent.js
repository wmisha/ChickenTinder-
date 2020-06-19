import React from 'react';

import { View, Text} from 'react-native';

import OuterTopBar from './OuterTopBar'
export default class BlankComponent extends React.Component {
    render(){
       return ( <View>
           <OuterTopBar />
            <Text>This component is blank. Nice!</Text>
           <Text>This component is blank. Nice!</Text>
           <Text>This component is blank. Nice!</Text>
           <Text>This component is blank. Nice!</Text>
           <Text>This component is blank. Nice!</Text>
           <Text>This component is blank. Nice!</Text>
           <Text>This component is blank. Nice!</Text>
        </View>);

    }
}