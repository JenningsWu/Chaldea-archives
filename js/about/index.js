/**
 * @flow
 */

import React from 'react'
import {
  View,
  Text,
  Linking,
  Alert,
  ScrollView,
} from 'react-native'
import {
  List,
  ListItem,
} from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import NgaReference from './ngaReference'

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

const About = ({ navigation }) => (
  <ScrollView>
    <List>
      <ListItem
        title="开源于"
        rightTitle="GitHub"
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
                onPress: () => Linking.openURL('mailto:chaldea.archives@gmail.com'),
              },
            ],
          )
        }}
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
        rightTitle="空想"
        rightTitleStyle={{ color: '#333' }}
        onPress={() => Linking.openURL('https://www.pixiv.net/member.php?id=6937042')}
        hideChevron
      />
      <ListItem
        title="数据来源："
        subtitle={<View>
          <ListItem
            title="FGO WIKI"
            onPress={() => Linking.openURL('http://fgowiki.com/')}
            hideChevron
          />
          <ListItem
            title="茹西教王的理想乡"
            onPress={() => Linking.openURL('http://kazemai.github.io/fgo-vz/')}
            hideChevron
          />
          <ListItem
            title="NGA 玩家社区 - FGO 版"
            onPress={() => navigation.navigate('NgaRef')}
          />
          <ListItem
            title="Fate/Grand Order @wiki（日）"
            onPress={() => Linking.openURL('https://www9.atwiki.jp/f_go/')}
            hideChevron
          />
          <ListItem
            title="Fate/Grand Order Wikia（英）"
            onPress={() => Linking.openURL('http://fategrandorder.wikia.com/wiki/Fate/Grand_Order_Wikia/')}
            hideChevron
            containerStyle={{ borderBottomWidth: 0 }}
          />
        </View>}
        subtitleContainerStyle={{ margin: 10 }}
        hideChevron
      />
    </List>
  </ScrollView>
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
  NgaRef: {
    screen: NgaReference,
  },
})
