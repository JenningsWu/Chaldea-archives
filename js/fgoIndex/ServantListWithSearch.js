/**
 * @flow
 */

import React, { Component, PureComponent } from 'react'
import {
  Text,
  View,
  FlatList,
} from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'

import ServantList from './ServantList'


const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

export default class ServantListWithSearch extends Component {
  constructor() {
    super()
    this.state = {
      keyword: '',
      up: true,
    }
  }

  state: {
    keyword: string;
    up: boolean;
  }
//
// const testStyle = {
//   flex: 1,
// }
  render() {
    const { up } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          // alignItems: 'center',
        }}
        >
          <SearchBar
            containerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent', ...noBorderStyle }}
            onChangeText={keyword => this.setState({ keyword })}
            placeholder="输入关键字"
            lightTheme
          />
          <Icon
            name="settings"
            onPress={() => this.setState({ keyword: '' })}
          />
          <Icon
            iconStyle={{ paddingLeft: 5, paddingRight: 5, fontSize: 32 }}
            name={this.state.up ? 'caret-up' : 'caret-down'}
            type="font-awesome"
            onPress={() => this.setState({ up: !up })}
          />
        </View>
        <View style={{
          flex: 1,
        }}
        >
          <Text>{ this.state.keyword }</Text>
          <ServantList
            navigation={this.props.navigation}
            data={[{ id: 5, name: "玉藻喵" }, { id: 6 }]}
          />
        </View>
      </View>
    )
  }
}
