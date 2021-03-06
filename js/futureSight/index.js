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
import { connect } from 'react-redux'
import _ from 'lodash'

import indexNavigationOptions from './navigationOptions'

import MaterialList from './material/materialList'
import MaterialServant, { SwitchIconMenu as MSSwitchIconMenu } from './material/servantList'
import ServantList from './servant/servantList'
import AddServant from './servant/addServant'
import EventList from './event/eventList'
import EventMaterial from './event/materialList'
import AccountList from './accountList'
import ConfigList from './config'
import AdjustPopupMenu from '../common/adjustPopupMenu'
import ServantPage from '../common/servant/servantPage'
import DetailPage from '../common/servant/detailPage'
import SkillPage from '../common/servant/skillPage'
import NpPage from '../common/servant/npPage'
import { switchFutureInsightView } from '../actions/config'
import {
  switchAccountEditingMode,
  addAccount,
} from '../actions/account'
import navigateOnce from '../lib/navigateOnce'

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
          onPress={() => navigation.navigate('EventList')}
        />
        <ListItem
          title="切换账号"
          onPress={() => navigation.navigate('AccountList')}
        />
        <ListItem
          title="特殊设置"
          onPress={() => navigation.navigate('ConfigList')}
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
    enable: _.get(accountData, [account, 'config', 'viewFilter', 'futureInsightView'], false),
  }),
  dispatch => ({
    onClick: (value) => {
      dispatch(switchFutureInsightView(value))
    },
  }),
)(EyeMenu)

const AddIcon = connect(
  () => ({}),
  dispatch => ({
    onClick: () => {
      dispatch(addAccount())
    },
  }),
)(({ onClick }) => (
  <Icon
    name="add"
    iconStyle={{ paddingRight: 10 }}
    onPress={onClick}
  />
))

const EditingIcon = connect(
  ({ account, accountData }) => ({
    editing: _.get(accountData, [account, 'config', 'account', 'editing'], false),
  }),
  dispatch => ({
    onClick: (value) => {
      dispatch(switchAccountEditingMode(value))
    },
  }),
)(({ editing, onClick }) => (
  <Icon
    name={editing ? 'done' : 'build'}
    iconStyle={{ paddingRight: 10 }}
    onPress={() => onClick(!editing)}
  />
))

const Index = StackNavigator({
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
            chooseMode: {
              enable: '特殊选择',
            },
          }}
          defaultValue={{
            chooseMode: {
              enable: false,
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
            chooseMode: {
              enable: '只考虑特殊选择',
            },
          }}
          defaultValue={{
            chooseMode: {
              enable: false,
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
  EventList: {
    screen: EventList,
  },
  AccountList: {
    screen: AccountList,
    navigationOptions: () => ({
      headerRight: <View style={{ flexDirection: 'row' }}>
        <AddIcon />
        <EditingIcon />
      </View>
      ,
    }),
  },
  ConfigList: {
    screen: ConfigList,
  },
  MaterialServant: {
    screen: MaterialServant,
    navigationOptions: () => ({
      headerRight: <View style={{ flexDirection: 'row' }}>
        <AdjustPopupMenu
          parentName={'futureSightMaterialServantList'}
          list={{
            show: {
              0: '已选从者',
              1: '全部从者',
            },
            type: {
              0: '灵基突破',
              1: '升级技能',
            },
          }}
        />
        <MSSwitchIconMenu />
      </View>
      ,
    }),
  },
  EventMaterial: {
    screen: EventMaterial,
  },

  // servant info
  FutureServantDetail: {
    screen: ServantPage,
    navigationOptions: indexNavigationOptions,
  },
  FutureDetailPage: {
    screen: DetailPage,
    navigationOptions: indexNavigationOptions,
  },
  FutureSkillPage: {
    screen: SkillPage,
    navigationOptions: indexNavigationOptions,
  },
  FutureNpPage: {
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
