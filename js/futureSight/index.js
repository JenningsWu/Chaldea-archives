/**
 * @flow
 */

import React from 'react'
import {
  View,
  ScrollView,
  Text,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import {
  Card,
  ListItem,
  Icon,
  CheckBox,
} from 'react-native-elements'
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu'
import { connect } from 'react-redux'
import _ from 'lodash'

import indexNavigationOptions from './navigationOptions'

import MaterialList from './materialList'
import ServantList from './servantList'
import AddServant from './addServant'
import AdjustPopupMenu from '../common/adjustPopupMenu'
import { switchFutureInsightView } from '../actions/config'

const FgoIndex = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <Card containerStyle={{ margin: 0, height: '100%' }} title={null}>
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

const EyeMenu = ({ enable, onClick }) => (
  <Icon
    name="remove-red-eye"
    iconStyle={{ paddingRight: 10, color: enable ? 'black' : 'gray' }}
    onPress={() => onClick(!enable)}
  />
)

const FutureSightMenu = connect(
  ({ account, accountData }) => ({
    enable: _.get(accountData, [account, 'config', 'futureInsightView'], false),
  }),
  dispatch => ({
    onClick: (value) => {
      dispatch(switchFutureInsightView(value))
    },
  }),
)(EyeMenu)


export default StackNavigator({
  Index: {
    screen: FgoIndex,
    // screen: materialList,
  },
  ServantList: {
    screen: ServantList,
    navigationOptions: ({ navigation }) => ({
      headerRight: <View style={{ flexDirection: 'row' }}>
        <AdjustPopupMenu
          parentName={'futureSightServantList'}
          list={{
            priority: {
              1: '第一优先级',
              2: '第二优先级',
              3: '第三优先级',
              4: '第四优先级',
              5: '第五优先级',
            },
          }}
        />
        <Icon
          name="add"
          iconStyle={{ paddingRight: 10 }}
          onPress={() => navigation.navigate('AddServant')}
        />
      </View>
      ,
    }),
  },
  MaterialList: {
    screen: MaterialList,
    navigationOptions: () => ({
      headerRight: <View style={{ flexDirection: 'row' }}>
        <AdjustPopupMenu
          parentName={'futureSightMaterialList'}
          list={{
            priority: {
              1: '第一优先级',
              2: '第二优先级',
              3: '第三优先级',
              4: '第四优先级',
              5: '第五优先级',
            },
          }}
        />
        <AdjustPopupMenu
          icon="restaurant"
          parentName={'futureSightMaterialList'}
          list={{
            type: {
              0: '技能石',
              1: '铜素材',
              2: '银素材',
              3: '金素材',
              4: '棋子',
              5: '其他',
            },
          }}
        />
        <FutureSightMenu />
      </View>
      ,
    }),
  },
  AddServant: {
    screen: AddServant,
  },
})
