/**
 * @flow
 */

import React from 'react'
import {
  View,
  Text,
  Linking,
  Alert,
} from 'react-native'
import {
  List,
  ListItem,
} from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

const TabBarIcon = ({ tintColor }) => (
  <Icon
    name="map"
    size={20}
    style={{ color: tintColor }}
  />
)

const Developer = [
  {
    name: '@吴钩霜雪明',
    link: 'http://weibo.com/jenningswu',
  },
]

const About = () => (
  <List>
    <ListItem
      title="开源于"
      rightTitle="GitHub"
      rightTitleStyle={{ color: '#333' }}
      onPress={() => Linking.openURL('https://github.com/JenningsWu/Chaldea-archives')}
    />
    <ListItem
      title="开发者"
      subtitle={
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            Developer.map(({ name, link }) => (
              <Text
                style={{ marginRight: 10, marginBottom: 5 }}
                key={`${name}-${link}`}
                onPress={() => link && Linking.openURL(link)}
              >
                {name}
              </Text>
            ))
          }
        </View>
      }
      subtitleContainerStyle={{ marginLeft: 10, marginTop: 10 }}
      hideChevron
    />
    <ListItem
      title="APP 图标画师"
      rightTitle="/"
      rightTitleStyle={{ color: '#333' }}
      onPress={() => Linking.openURL('https://github.com/JenningsWu/Chaldea-archives')}
    />
    <ListItem
      title="意见反馈与 Bug 提交"
      onPress={() => {
        Alert.alert(
          '意见反馈与 Bug 提交',
          '',
          [
            {
              text: '取消',
            },
            {
              text: '通过 GitHub',
              onPress: () => Linking.openURL('https://github.com/JenningsWu/Chaldea-archives/issues/new'),
            },
            {
              text: '通过邮件',
              onPress: () => Linking.openURL('mailto:example@gmail.com'),
            },
          ],
        )
      }}
    />
  </List>
)

About.navigationOptions = {
  tabBarLabel: '关于',
  tabBarIcon: TabBarIcon,
  title: '关于',
}

export default StackNavigator({
  Index: {
    screen: About,
  },
})
