/**
 * @flow
 */

import React, { PureComponent, Component } from 'react'
import {
  View,
  Text,
  ScrollView,
} from 'react-native'
import {
  Card,
  ListItem,
  Divider,
} from 'react-native-elements'
import _ from 'lodash'

import indexNavigationOptions from '../navigationOptions'

import servantMap from '../../assets/data/servants'

import {
  effectDesc,
  showedValue,
} from '../../schema/Skill'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

const ClassSkill = ({
  name,
  lv,
  effect,
}) => {
  const effectList = Array.isArray(effect) ? effect : [effect]
  return (
    <Card
      containerStyle={[
        noBorderStyle,
        {
          margin: 0,
        },
      ]}
      title={`${name} ${lv}`}
    >
      {
        effectList.map(({ id, value }) => (
          <View key={id}>
            <Text style={{ color: '#43484d', margin: 10 }}>
              {effectDesc(id, value, [100, 0], 0, 0, -1)}
              {showedValue(id, value)[0]}
            </Text>
            <Divider style={{ backgroundColor: '#e1e8ee' }} />
          </View>
        ))
      }
    </Card>
  )
}

export default class ServantDetailPage extends Component {
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
    return (
      <View style={{ flex: 1 }}>
        <Card containerStyle={{ margin: 0, height: '100%' }} title={null}>
          <ScrollView>
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
            {
              servant.classSkill.map(({ name, lv, effect }) => (
                <ClassSkill
                  key={`${name}-${lv}`}
                  name={name}
                  lv={lv}
                  effect={effect}
                />
              ))
            }
          </ScrollView>
        </Card>
      </View>
    )
  }
}
