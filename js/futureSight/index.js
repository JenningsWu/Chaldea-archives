/**
 * @flow
 */

import React from 'react'
import {
  View,
  Text,
  Button,
  ScrollView,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import {
  Card,
  ListItem,
} from 'react-native-elements'

import indexNavigationOptions from './navigationOptions'

import materialList from './MaterialList'

const FgoIndex = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <Card containerStyle={{ margin: 0, height: '100%' }}>
      <ScrollView>
        <ListItem
          title="素材规划"
          onPress={() => navigation.navigate('MaterialList')}
        />
        <ListItem
          title="从者一览"
        />
        <ListItem
          title="活动情况"
        />
        <ListItem
          title="切换账号"
        />
      </ScrollView>
    </Card>
  </View>
)

FgoIndex.navigationOptions = {
  ...indexNavigationOptions,
  title: '未来视',
}

export default StackNavigator({
  Index: {
    // screen: FgoIndex,
    screen: materialList,
  },
  MaterialList: {
    screen: materialList,
  },
  AddServant: {
    screen: FgoIndex,
  },
})
