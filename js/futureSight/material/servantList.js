/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Platform,
  Image,
} from 'react-native'
import {
  ListItem,
} from 'react-native-elements'

import navigationOptions from '../navigationOptions'

import servantMap from '../../assets/data/servants'
import avatars from '../../assets/img/avatars'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

const styles = StyleSheet.create({
  subtitle: {
    color: '#86939e',
    fontSize: 12,
    marginTop: 1,
    paddingLeft: 10,
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
      android: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
    }),
  },
})

class ServantItem extends PureComponent {
  render() {
    const {
      id,
      num,
    } = this.props
    const servant = servantMap[id]
    return (
      <ListItem
        title={servantMap[servant.id].name}
        leftIcon={
          <View style={{ height: 42, width: 42, marginRight: 10 }}>
            <Image
              resizeMode="stretch"
              style={{ height: '100%', aspectRatio: 0.914 }}
              source={avatars[parseInt(servant.id, 10)]}
            />
          </View>
        }
        titleContainerStyle={{ marginLeft: -4 }}
        subtitleContainerStyle={{ marginLeft: -4 }}
        onPress={() => this.props.navigation.navigate('ServantDetail', { id: servant.id })}
        underlayColor="#ddd"
        rightTitle={`${num}`}
        hideChevron
      />
    )
  }
}

class ServantList extends PureComponent {
  static navigationOptions = () => ({
    title: '从者列表',
    ...navigationOptions,
  })

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const { data, servantInfo } = this.props.navigation.state.params
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{
          flex: 1,
        }}
        >
          <FlatList
            data={data}
            extraData={servantInfo}
            keyExtractor={(item: { id: string }) => item.id}
            renderItem={({ item }) => (
              <ServantItem
                id={item.id}
                num={item.num}
                info={servantInfo[item.id]}
                navigation={this.props.navigation}
              />
            )}
          />
        </View>
      </View>
    )
  }
}

export default ServantList
