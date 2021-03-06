/**
 * @flow
 */

import React, { Component } from 'react'
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

import artsImg from '../../assets/img/Arts.png'
import busterImg from '../../assets/img/Buster.png'
import QuickImg from '../../assets/img/Quick.png'

import servantMap from '../../assets/export/data/servants'

const cardImg = [artsImg, busterImg, QuickImg]

export default class ServantPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: servantMap[navigation.state.params.id].name,
  })

  shouldComponentUpdate({ navigation }) {
    return !_.isEqual(navigation.state.params, this.props.navigation.state.params)
  }

  render() {
    const { id, routePrefix } = this.props.navigation.state.params
    const servant = servantMap[id]
    const showSkill = (
      servant.skill1.length > 0 ||
      servant.skill2.length > 0 ||
      servant.skill3.length > 0
    )
    const showNp = servant.np.length > 0
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
              onPress={() => this.props.navigation.navigate(`${routePrefix}DetailPage`, { id, routePrefix })}
            />
            <ListItem
              title="技能"
              onPress={() => {
                if (showSkill) {
                  this.props.navigation.navigate(`${routePrefix}SkillPage`, { id, routePrefix })
                }
              }}
              hideChevron={!showSkill}
            />
            <ListItem
              title="宝具"
              onPress={() => {
                if (showSkill) {
                  this.props.navigation.navigate(`${routePrefix}NpPage`, { id, routePrefix })
                }
              }}
              hideChevron={!showNp}
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
              height: 1,
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
