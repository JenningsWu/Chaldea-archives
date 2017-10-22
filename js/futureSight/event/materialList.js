/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
  FlatList,
  Image,
} from 'react-native'
import {
  ListItem,
} from 'react-native-elements'
import _ from 'lodash'

import navigationOptions from '../navigationOptions'

import events from '../../assets/data/event.json'
import materials from '../../assets/export/data/materials'
import materialImg from '../../assets/export/img/materials'

class MaterialItem extends PureComponent {
  render() {
    const {
      id,
      num,
      tag,
    } = this.props
    const material = materials[id]
    return (
      <ListItem
        title={material.name}
        avatar={
          <Image
            resizeMode="stretch"
            source={materialImg[id]}
            style={{ height: '100%', aspectRatio: 1 }}
          />}
        subtitle={tag === '' ? undefined : `每${tag}`}
        underlayColor="#ddd"
        rightTitle={`${num}`}
        hideChevron
      />
    )
  }
}

class MaterialList extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: events[navigation.state.params.id].name,
    ...navigationOptions,
  })

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const event = events[this.props.navigation.state.params.id]
    const list = [
      ..._.map(event.material, (num, id) => ({
        id,
        num,
        tag: '',
      })),
      ..._.flatMap(event.pool, ({ name, material }) => _.map(material, (num, id) => ({
        id,
        num,
        tag: name,
      }))),
    ]
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{
          flex: 1,
        }}
        >
          <FlatList
            data={list}
            keyExtractor={(item: { id: string }) => `${item.id}${item.tag}`}
            renderItem={({ item }) => (
              <MaterialItem
                id={item.id}
                num={item.num}
                tag={item.tag}
              />
            )}
          />
        </View>
      </View>
    )
  }
}

export default MaterialList
