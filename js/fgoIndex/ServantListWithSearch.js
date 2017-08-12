/**
 * @flow
 */

import React, { Component, PureComponent } from 'react'
import {
  View,
} from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'

import ServantList from './ServantList'

import servants from '../assets/data/servants'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

export default class ServantListWithSearch extends PureComponent {
  constructor() {
    super()
    this.servants = servants.slice(1)
    this.state = {
      keyword: '',
      up: true,
      list: this.servants,
    }
  }

  state: {
    keyword: string;
    up: boolean;
    list: Array<Object>;
  }

  componentDidMount() {
    this.props.navigation.navigate('Item', { servant: servants[2] })
  }


  onSearchChange = (keyword: string) => {
    this.setState({
      keyword,
      list: keyword === '' ? this.servants : this.servants.filter(servant =>
        servant.checkKeyWord(keyword)),
    })
  }

  servants: Array<Object>

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
            onChangeText={keyword => this.onSearchChange(keyword)}
            placeholder="输入关键字"
            lightTheme
            clearIcon
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
          <ServantList
            navigation={this.props.navigation}
            data={this.state.up ? this.state.list : this.state.list.slice().reverse()}
          />
        </View>
      </View>
    )
  }
}
