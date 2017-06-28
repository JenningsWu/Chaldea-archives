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

const source = require('../assets/img/Tamamoicon.png')

export default class ServantList extends PureComponent {
  _keyExtractor = (item) => item.id

  _onPressItem = (id: string) => {
    // this.props.navigation.navigate()
  }

  _renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      avatar={<Image source={source} style={{ flex: 1, alignSelf: 'stretch', aspectRatio: 0.914 }} />}
      // avatarStyle={{ height: 38, width: 34, alignSelf: 'stretch' }}
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
