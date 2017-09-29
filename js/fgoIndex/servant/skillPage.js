/**
 * @flow
 */

import React, { PureComponent, Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native'
import {
  Card,
  ListItem,
  Divider,
} from 'react-native-elements'
import _ from 'lodash'

import indexNavigationOptions from '../navigationOptions'

import artsImg from '../../assets/img/Arts.png'
import busterImg from '../../assets/img/Buster.png'
import QuickImg from '../../assets/img/Quick.png'

import avatars from '../../assets/img/avatars'
import servantMap from '../../assets/data/servants'

import {
  skillCondition,
  effectDesc,
  skillDuration,
  showedValue,
  probDesc,
} from '../../schema/Skill'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

const cardImg = [artsImg, busterImg, QuickImg]

class Skills extends PureComponent {
  constructor() {
    super()
    this.state = {
      curr: 0,
    }
  }
  render() {
    const skill = this.props.skill[this.props.skill.length - 1]
    const {
      name,
      lv,
      initialCD,
      condition,
      effect,
    } = skill
    return (
      <Card containerStyle={{ margin: 0 }} title={`${name}${lv ? ` ${lv}` : ''}`}>
        <ListItem
          title="初始 CD"
          rightTitle={`${initialCD}`}
          hideChevron
        />
        {
          condition < 1 ? null : (
            <ListItem
              title="开放条件"
              rightTitle={skillCondition[condition]}
              hideChevron
            />
          )
        }
        {
          effect.map(({ id, value, duration, durationTime, effectiveTime, probability = [100, 0] }) => {
            const valueStr = showedValue(id, value)
            // (value.length <= 11 || value[1] === 0 || value[1] === value[0]) ? (
              // <ListItem
              //   key={id}
              //   title=
              //   // rightTitle={`${value[0]}`}
              //   hideChevron
              // />
            return (
              <View key={id} style={{ paddingTop: 3, paddingBottom: 3, borderBottomWidth: 1, borderBottomColor: '#bbb' }}>
                <Text style={{ color: '#43484d', margin: 10 }}>
                  {effectDesc(id, value, probability, duration, durationTime, effectiveTime)}
                  {value[0] !== 0 && (value[1] === 0 || value[1] === value[0]) ? `${valueStr[0]}` : ''}
                </Text>
                {
                  value[0] !== value[1] && value[1] !== 0 ? (
                    <View style={{ marginHorizontal: 10, marginBottom: 5, borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#ccc' }}>
                      <View style={{ flexDirection: 'row' }}>
                        {
                          valueStr.slice(0, 5).map((v, idx) => [v, `${v}-${idx}`]).map(([v, key]) => (
                            <View key={key} style={{ flex: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#ccc' }}>
                              <Text style={{ flex: 1, textAlign: 'center', color: '#444' }}>{v}</Text>
                            </View>
                          ))
                        }
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        {
                          valueStr.slice(5, 10).map((v, idx) => [v, `${v}-${idx}`]).map(([v, key]) => (
                            <View key={key} style={{ flex: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#ccc' }}>
                              <Text style={{ flex: 1, textAlign: 'center', color: '#444' }}>{v}</Text>
                            </View>
                          ))
                        }
                      </View>
                    </View>
                  ) : null
                }
                {
                  probability[0] !== probability[1] && probability[1] !== 0 ? (
                    <View>
                      <Text style={{ color: '#43484d', margin: 10 }}>
                        {probDesc(id)}
                      </Text>
                      <View style={{ marginHorizontal: 10, marginBottom: 5, borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#ccc' }}>
                        <View style={{ flexDirection: 'row' }}>
                          {
                            probability.slice(0, 5).map((v, idx) => [`${v}%`, `${v}-${idx}`]).map(([v, key]) => (
                              <View key={key} style={{ flex: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#ccc' }}>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#444' }}>{v}</Text>
                              </View>
                            ))
                          }
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          {
                            probability.slice(5, 10).map((v, idx) => [`${v}%`, `${v}-${idx}`]).map(([v, key]) => (
                              <View key={key} style={{ flex: 1, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#ccc' }}>
                                <Text style={{ flex: 1, textAlign: 'center', color: '#444' }}>{v}</Text>
                              </View>
                            ))
                          }
                        </View>
                      </View>
                    </View>
                  ) : null
                }
              </View>
            )
          })
        }
      </Card>
    )
  }
}

export default class ServantSkillPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: servantMap[navigation.state.params.id].name,
    ...indexNavigationOptions,
  })

  shouldComponentUpdate({ navigation }) {
    return navigation.state.params.id !== this.props.navigation.state.params.id
  }

  render() {
    const { id } = this.props.navigation.state.params
    const servant = servantMap[id]
    const {
      skill1,
      skill2,
      skill3,
    } = servant
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Skills skill={skill1} />
          <Skills skill={skill2} />
          <Skills skill={skill3} />
        </ScrollView>
        {/* <Card containerStyle={{ margin: 0, height: '100%' }} title={null}>
            <ListItem
              title={servant.name}
              // rightTitle={servant.rarityDesc}
              hideChevron
            />
            <ListItem
              title="初始 ATK / HP"
              rightTitle={`${servant.startATK} / ${servant.startHP}`}
              hideChevron
            />
            <ListItem
              title="满破 ATK / HP"
              rightTitle={`${servant.endATK} / ${servant.endHP}`}
              hideChevron
            />
            <ListItem
              title="100 级 ATK / HP"
              rightTitle={`${servant.grailATK} / ${servant.grailHP}`}
              hideChevron
            />
            <ListItem
              title="Hits 数"
              subtitle={
                <View style={{ marginTop: 8 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text>蓝</Text>
                    <Text>红</Text>
                    <Text>绿</Text>
                    <Text>EX</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 3 }}>
                    {
                      servant.hits.map((num, idx) => ({ num, idx })).map(({ num, idx }) => (
                        <Text key={`${num}-${idx}`} style={{ color: '#bdc6cf' }}>{num}</Text>
                      ))
                    }
                  </View>
                </View>
              }
              hideChevron
            />
            <ListItem
              title="NP 获取率"
              subtitle={
                <View style={{ marginTop: 8 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text>蓝</Text>
                    <Text>红</Text>
                    <Text>绿</Text>
                    <Text>EX</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 3 }}>
                    {
                      servant.charge.map((num, idx) => ({ num, idx })).map(({ num, idx }) => (
                        <Text key={`${num}-${idx}`} style={{ color: '#bdc6cf' }}>{`${num * 100}%`}</Text>
                      ))
                    }
                  </View>
                </View>
              }
              hideChevron
            />
            <ListItem
              title="宝具 NP 率"
              rightTitle={`${servant.npChargeATK * 100}%`}
              hideChevron
            />
            <ListItem
              title="受击 NP 率"
              rightTitle={`${servant.npChargeDEF * 100}%`}
              hideChevron
            />
            <ListItem
              title="出星率"
              rightTitle={`${servant.starGeneration * 100}%`}
              hideChevron
            />
            <ListItem
              title="暴击权重"
              rightTitle={`${servant.starAbsorption}`}
              hideChevron
            />
            <ListItem
              title="被即死率"
              rightTitle={`${servant.deathResist * 100}%`}
              hideChevron
            />
        </Card> */}
      </View>
    )
  }
}
