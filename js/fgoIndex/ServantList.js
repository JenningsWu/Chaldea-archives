/**
 * @flow
 */

import React, { Component, PureComponent } from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
} from 'react-native'
import { ListItem } from 'react-native-elements'


import avatars from '../assets/img/avatars'

export default class ServantList extends PureComponent {
  _keyExtractor = item => item.id

  _renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      avatar={<Image source={avatars[parseInt(item.id, 10)]} style={{ flex: 1, alignSelf: 'stretch', aspectRatio: 0.914 }} />}
      subtitle={`${item.classDesc} ${item.rarityDesc}`}
      onPress={() => this.props.navigation.navigate('Item', { servant: item })}
      // avatarStyl e={{ height: 38, width: 34, alignSelf: 'stretch' }}
    />
  )

  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    )
  }
}
