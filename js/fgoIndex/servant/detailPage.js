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
} from 'react-native-elements'
import _ from 'lodash'

import indexNavigationOptions from '../navigationOptions'

import servantMap from '../../assets/data/servants'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
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
          </ScrollView>
        </Card>
      </View>
    )
  }
}
