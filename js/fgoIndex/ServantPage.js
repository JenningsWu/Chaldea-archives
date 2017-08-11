/**
 * @flow
 */

import React, { Component, PureComponent } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native'
import {
  Card,
  List,
  ListItem,
  Divider,
  Grid,
  Row,
  Col,
} from 'react-native-elements'

import ServantList from './ServantList'

import servants from '../assets/data/servants'
import avatars from '../assets/img/avatars'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

export default class ServantListWithSearch extends PureComponent {
  constructor() {
    super()
    // this.servants = servants.slice(1)
    // this.state = {
    //   keyword: '',
    //   up: true,
    //   list: this.servants,
    // }
  }

//
// const testStyle = {
//   flex: 1,
// }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.servant.name,
  })

  render() {
    const { servant } = this.props.navigation.state.params
    return (
      <View style={{ flex: 1 }}>
        <Card containerStyle={{ margin: 0 }}>
          <ScrollView>
            <ListItem
              title={servant.name}
              // rightTitle={servant.rarityDesc}
              hideChevron
            />
            <ListItem
              title={servant.classDesc}
              rightTitle={servant.rarityDesc}
              hideChevron
            />
            <ListItem
              title="图鉴"
            />
            <ListItem
              title="数值"
            />
            <ListItem
              title="技能"
            />
            <ListItem
              title="宝具"
            />
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 5,
              paddingBottom: 5,
            }}
            >
              <Image source={avatars[1]} resizeMode="stretch" style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5 }} />
              <Image source={avatars[2]} resizeMode="stretch" style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5 }} />
            </View>
            <Divider style={{
              height: 0.5,
              backgroundColor: '#bbb',
            }}/>

            <ListItem
              title='满级 HP / ATK'
              rightTitle={`11111 / 42412`}
              hideChevron
            />
            <ListItem
              title='100 级 HP / ATK'
              rightTitle={`11111 / 42412`}
              hideChevron
            />
            <ListItem
              title='Hits (蓝，红，绿，ex)'
              rightTitle={`4, 4, 2, 1`}
              hideChevron
            />
            <ListItem
              title={servant.classDesc}
              rightTitle={servant.rarityDesc}
              hideChevron
            />
            <ListItem
              title={servant.classDesc}
              rightTitle={servant.rarityDesc}
              hideChevron
            />
            <ListItem
              title={servant.classDesc}
              rightTitle={servant.rarityDesc}
              hideChevron
            />
            <ListItem
              title={servant.classDesc}
              rightTitle={servant.rarityDesc}
              hideChevron
            />
            <ListItem
              title={servant.classDesc}
              rightTitle={servant.rarityDesc}
              hideChevron
            />
            <ListItem
              title={servant.classDesc}
              rightTitle={servant.rarityDesc}
              hideChevron
            />
            <ListItem
              title={servant.classDesc}
              rightTitle={servant.rarityDesc}
              hideChevron
            />
            <ListItem
              title={servant.classDesc}
              rightTitle={servant.rarityDesc}
              hideChevron
            />
            <ListItem
              title={servant.classDesc}
              rightTitle={servant.rarityDesc}
              hideChevron
            />
          </ScrollView>
        </Card>
        <Text>{servant.alignmentDesc}</Text>
      </View>
    )
  }
}
