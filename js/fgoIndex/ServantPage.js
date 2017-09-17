/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
  ScrollView,
  Image,
} from 'react-native'
import {
  Card,
  ListItem,
  Divider,
} from 'react-native-elements'
import _ from 'lodash'

import indexNavigationOptions from './navigationOptions'

import artsImg from '../assets/img/Arts.png'
import busterImg from '../assets/img/Buster.png'
import QuickImg from '../assets/img/Quick.png'

import avatars from '../assets/img/avatars'
import servants from '../assets/data/servants'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

const cardImg = [artsImg, busterImg, QuickImg]

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
    title: servants[parseInt(navigation.state.params.id, 10)].name,
    ...indexNavigationOptions,
  })

  render() {
    const { id } = this.props.navigation.state.params
    console.log(id, servants)
    const servant = servants[parseInt(id, 10)]
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
              title={servant.classDesc}
              rightTitle={servant.rarityDesc}
              hideChevron
            />
            <ListItem
              title="数值"
              subtitle={`${servant.endATK} / ${servant.endHP}`}
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
              {
                servant.cards.map((num, idx) => _.range(num).map(key => (
                  <Image
                    key={key}
                    source={cardImg[idx]}
                    resizeMode="stretch"
                    style={{ width: '15%', aspectRatio: 1, marginLeft: 5, marginRight: '2%' }}
                  />
                )))
              }
            </View>
            <Divider style={{
              height: 0.5,
              backgroundColor: '#bbb',
            }}
            />
            <ListItem
              title="画师"
              rightTitle={servant.illustrator}
              hideChevron
            />
            <ListItem
              title="声优"
              rightTitle={servant.cv}
              hideChevron
            />
            <ListItem
              title="性别"
              rightTitle={servant.genderDesc}
              hideChevron
            />
            <ListItem
              title="属性"
              rightTitle={servant.attributeDesc}
              hideChevron
            />
            <ListItem
              title="阵营"
              rightTitle={servant.alignmentDesc}
              hideChevron
            />
            <ListItem
              title="图鉴"
              rightTitle={'被芙芙吃掉了!'}
              // hideChevron
            />
          </ScrollView>
        </Card>
      </View>
    )
  }
}
