/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
} from 'react-native'
import {
  ListItem,
  Icon,
  Badge,
} from 'react-native-elements'
import { connect } from 'react-redux'
import _ from 'lodash'

import navigationOptions from '../navigationOptions'

import servantMap from '../../assets/data/servants'
import avatars from '../../assets/img/avatars'
import { switchMaterilServantView } from '../../actions/config'
import materialServantMap from '../../utils/materialServantMap'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

const styles = StyleSheet.create({
  subtitle: {
    color: '#86939e',
    fontSize: 12,
    marginTop: 1,
    paddingLeft: 10,
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
      android: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
    }),
  },
})

const TEMPLATE = {
  id: '000',
  numForAscension: 0,
  numForSkill: 0,
}

class AvatarWithBadge extends PureComponent {
  render() {
    const {
      id,
      num
    } = this.props
    return (
      <View style={{ margin: 3 }}>
        <Image
          resizeMode="stretch"
          style={{ height: 60, aspectRatio: 0.914 }}
          source={avatars[parseInt(id, 10)]}
        />
        <Badge
          wrapperStyle={{ position: 'absolute', left: 0, bottom: 0 }}
          containerStyle={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          value={num}
        />
      </View>
    )
  }
}

class ServantItem extends PureComponent {
  render() {
    const {
      id,
      numForSkill,
      numForAscension,
      title,
    } = this.props
    // const num = numForSkill + numForAscension
    const servant = servantMap[id]
    if (title != null) {
      return (
        <ListItem
          title={title}
          rightIcon={{ name: 'keyboard-arrow-down' }}
        />
      )
    }
    return (
      <ListItem
        title={servantMap[servant.id].name}
        leftIcon={
          <View style={{ height: 42, width: 42, marginRight: 10 }}>
            <Image
              resizeMode="stretch"
              style={{ height: '100%', aspectRatio: 0.914 }}
              source={avatars[parseInt(servant.id, 10)]}
            />
          </View>
        }
        titleContainerStyle={{ marginLeft: -4 }}
        subtitleContainerStyle={{ marginLeft: -4 }}
        onPress={() => this.props.navigation.navigate('FutureServantDetail', { id: servant.id, routePrefix: 'Future' })}
        underlayColor="#ddd"
        rightIcon={(
          <View style={{ justifyContent: 'center', minWidth: 100 }}>
            {
              numForAscension > 0 ? (
                <Text style={{ color: '#bdc6cf' }}>灵基突破：{numForAscension.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
              ) : null
            }
            {
              numForSkill > 0 ? (
                <Text style={{ color: '#bdc6cf' }}>升级技能：{numForSkill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
              ) : null
            }
          </View>
        )}
      />
    )
  }
}


function filterList(data, showAscensionInfo, showSkillInfo) {
  let list = data
  if (!showAscensionInfo) {
    list = list.map(d => ({
      ...d,
      numForAscension: 0,
    }))
  }
  if (!showSkillInfo) {
    list = list.map(d => ({
      ...d,
      numForSkill: 0,
    }))
  }
  list = list.filter(({ title, numForAscension, numForSkill }) => (
    title != null || numForAscension > 0 || numForSkill > 0
  ))
  return list
}

class ServantList extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
    ...navigationOptions,
  })

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const { id, data, servantInfo } = this.props.navigation.state.params
    const {
      showChoosed,
      showAll,
      showAscensionInfo,
      showSkillInfo,
      simple,
    } = this.props
    let choosed = []
    if (showChoosed) {
      choosed.push({
        ...TEMPLATE,
        type: 'choosed',
        title: '已选从者',
      })
      choosed = choosed.concat(data.map(d => ({
        ...d,
        type: 'choosed',
      })))
      choosed = filterList(choosed, showAscensionInfo, showSkillInfo)
    }
    let all = []
    if (showAll) {
      all.push({
        ...TEMPLATE,
        type: 'all',
        title: `全部从者 (${showAscensionInfo ? '1 级 -> 满破' : ''}${showAscensionInfo && showSkillInfo ? ', ' : ''}${showSkillInfo ? '技能 111 -> 999' : ''})`,
      })
      all = all.concat((materialServantMap[id] || []).map(d => ({
        ...d,
        type: 'all',
      })))
      all = filterList(all, showAscensionInfo, showSkillInfo)
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{
          flex: 1,
        }}
        >
          {
            simple ? (
              <ScrollView>
                {
                  [[choosed, 'choosed'], [all, 'all']].map(([list, key]) => (
                    list.length > 0 ? (
                      <View key={key}>
                        <ListItem
                          title={list[0].title}
                          rightIcon={{ name: 'keyboard-arrow-down' }}
                        />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                          {
                            list.slice(1).map(servant => (
                              <AvatarWithBadge
                                key={servant.id}
                                id={servant.id}
                                num={servant.numForAscension + servant.numForSkill}
                              />
                            ))
                          }
                        </View>
                      </View>
                    ) : null
                  ))
                }
              </ScrollView>
            ) : (
              <FlatList
                data={choosed.concat(all)}
                extraData={servantInfo}
                keyExtractor={(item: { id: string, type: string }) => `${item.type}-${item.id}`}
                renderItem={({ item }) => (
                  <ServantItem
                    id={item.id}
                    numForAscension={item.numForAscension}
                    numForSkill={item.numForSkill}
                    info={servantInfo[item.id]}
                    navigation={this.props.navigation}
                    title={item.title}
                  />
                )}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const SwitchIcon = ({ enable, onClick }) => (
  <Icon
    name={enable ? 'account-box' : 'list'}
    iconStyle={{ paddingRight: 10 }}
    onPress={() => onClick(!enable)}
  />
)

const SwitchIconMenu = connect(
  ({ account, accountData }) => ({
    enable: _.get(accountData, [account, 'config', 'viewFilter', 'materialServantSimpleView'], false),
  }),
  dispatch => ({
    onClick: (value) => {
      dispatch(switchMaterilServantView(value))
    },
  }),
)(SwitchIcon)

export default connect(
  state => ({
    showChoosed: _.get(state.accountData,
      [state.account, 'config', 'viewFilter', 'futureSightMaterialServantList', 'show', 0], true),
    showAll: _.get(state.accountData,
      [state.account, 'config', 'viewFilter', 'futureSightMaterialServantList', 'show', 1], true),
    showAscensionInfo: _.get(state.accountData,
      [state.account, 'config', 'viewFilter', 'futureSightMaterialServantList', 'type', 0], true),
    showSkillInfo: _.get(state.accountData,
      [state.account, 'config', 'viewFilter', 'futureSightMaterialServantList', 'type', 1], true),
    simple: _.get(state.accountData,
      [state.account, 'config', 'viewFilter', 'materialServantSimpleView'], false),
  }),
)(ServantList)

export { SwitchIconMenu }
