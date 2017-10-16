/**
 * @flow
 */

import React from 'react'
import {
  View,
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import ServantList from './servantListWithSearch'
import ServantPage from '../common/servant/servantPage'
import DetailPage from '../common/servant/detailPage'
import SkillPage from '../common/servant/skillPage'
import NpPage from '../common/servant/npPage'
import indexNavigationOptions from './navigationOptions'
import navigateOnce from '../lib/navigateOnce'

const FgoIndex = ({ navigation }) => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
  }}
  >
    <ServantList navigation={navigation} />
  </View>
)

FgoIndex.navigationOptions = {
  ...indexNavigationOptions,
  title: '图鉴',
}

const Index = StackNavigator({
  Index: {
    screen: FgoIndex,
    navigationOptions: indexNavigationOptions,
  },
  IndexServantDetail: {
    screen: ServantPage,
    navigationOptions: indexNavigationOptions,
  },
  IndexDetailPage: {
    screen: DetailPage,
    navigationOptions: indexNavigationOptions,
  },
  IndexSkillPage: {
    screen: SkillPage,
    navigationOptions: indexNavigationOptions,
  },
  IndexNpPage: {
    screen: NpPage,
    navigationOptions: indexNavigationOptions,
  },
}, {
  navigationOptions: {
    gesturesEnabled: true,
  },
})

Index.router.getStateForAction = navigateOnce(Index.router.getStateForAction)

export default Index
