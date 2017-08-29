/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  FlatList,
  Image,
} from 'react-native'
import { ListItem } from 'react-native-elements'


import avatars from '../assets/img/avatars'

export default class ServantList extends PureComponent {
  keyExtractor = (item: { id: string }) => item.id

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      avatar={
        <Image
          resizeMode="stretch"
          style={{ height: '100%', aspectRatio: 0.914 }}
          source={avatars[parseInt(item.id, 10)]}
        />}
      subtitle={`${item.classDesc} ${item.rarityDesc}`}
      titleContainerStyle={{ marginLeft: -4 }}
      subtitleContainerStyle={{ marginLeft: -4 }}
      onPress={() => this.props.navigation.navigate('Item', { servant: item })}
      underlayColor="#ddd"
      // avatarStyl e={{ height: 38, width: 34, alignSelf: 'stretch' }}
    />
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
