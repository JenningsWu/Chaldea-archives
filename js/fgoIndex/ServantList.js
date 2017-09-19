/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  FlatList,
  Image,
  View,
} from 'react-native'
import { ListItem } from 'react-native-elements'


import avatars from '../assets/img/avatars'

class ServantItem extends PureComponent {
  render() {
    const { item } = this.props
    return (
      <ListItem
        title={item.name}
        leftIcon={
          <View style={{ height: 42, width: 42, marginRight: 10 }}>
            <Image
              resizeMode="stretch"
              style={{ height: '100%', aspectRatio: 0.914 }}
              source={avatars[parseInt(item.id, 10)]}
            />
          </View>
        }
        subtitle={`${item.classDesc} ${item.rarityDesc}`}
        titleContainerStyle={{ marginLeft: -4 }}
        subtitleContainerStyle={{ marginLeft: -4 }}
        onPress={() => this.props.navigation.navigate('ServantDetail', { id: item.id })}
        underlayColor="#ddd"
        // avatarStyl e={{ height: 38, width: 34, alignSelf: 'stretch' }}
      />
    )
  }
}

export default class ServantList extends PureComponent {
  keyExtractor = (item: { id: string }) => item.id

  renderItem = ({ item }) => (
    <ServantItem item={item} navigation={this.props.navigation} />
  )

  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    )
  }
}
