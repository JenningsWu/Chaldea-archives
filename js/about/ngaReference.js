/**
 * @flow
 */

import React from 'react'
import {
  Linking,
  ScrollView,
} from 'react-native'
import {
  List,
  ListItem,
} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const TabBarIcon = ({ tintColor }) => (
  <Icon
    name="map"
    size={20}
    style={{ color: tintColor }}
  />
)

const Reference = () => (
  <ScrollView>
    <List>
      <ListItem
        title="[千里眼 EX] 活动素材一览表"
        onPress={() => Linking.openURL('http://bbs.ngacn.cc/read.php?tid=11081996')}
        hideChevron
      />
      <ListItem
        title="[千里眼 EX] 各活动攻略贴"
        onPress={() => Linking.openURL('http://bbs.ngacn.cc/read.php?tid=11203976')}
        hideChevron
      />
    </List>
  </ScrollView>
)

Reference.navigationOptions = {
  tabBarLabel: '关于',
  tabBarIcon: TabBarIcon,
  title: '参考攻略贴',
}

export default Reference
