/**
 * @flow
 */

import React from 'react'
import {
  View,
  ScrollView,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import {
  Card,
  ListItem,
  Icon,
} from 'react-native-elements'

import indexNavigationOptions from './navigationOptions'

import MaterialList from './materialList'
import ServantList from './servantList'
import AddServant from './addServant'

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
          onPress={() => navigation.navigate('ServantList')}
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
  ServantList: {
    screen: ServantList,
    navigationOptions: ({ navigation }) => ({
      headerRight: <Icon
        name="add"
        iconStyle={{ paddingRight: 10 }}
        onPress={() => navigation.navigate('AddServant')}
      />,
    }),
  },
  Index: {
    screen: FgoIndex,
    // screen: materialList,
  },
  MaterialList: {
    screen: MaterialList,
  },
  AddServant: {
    screen: AddServant,
  },
})
