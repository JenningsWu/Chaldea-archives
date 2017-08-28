/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
} from 'react-native'
import {
  SearchBar,
  Icon,
} from 'react-native-elements'

import materialList from '../assets/data/materialList'
import indexNavigationOptions from './navigationOptions'

import MaterialFlatList from './materialFlatList'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

export default class ServantListWithSearch extends PureComponent {

  static navigationOptions = ({ navigation }) => ({
    title: '素材规划',
    ...indexNavigationOptions,
  })

  constructor() {
    super()
    this.materialList = Object.keys(materialList).map(k => ({
      key: k,
      name: materialList[k].name,
    }))
    this.state = {
      keyword: '',
      list: this.materialList,
    }
  }

  state: {
    keyword: string;
    // up: boolean;
    list: Array<Object>;
  }


  // componentDidMount() {
  //   this.props.navigation.navigate('FutureSight', { servant: servants[2] })
  // }

  onSearchChange = (keyword: string) => {
    this.setState({
      keyword,
      list: keyword === '' ? this.materialList : this.materialList.filter(({ name }) =>
        name.indexOf(keyword) >= 0),
    })
  }

  materialList: Array<Object>

//
// const testStyle = {
//   flex: 1,
// }
  render() {
    const {
      // up,
      list,
    } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          // alignItems: 'center',
        }}
        >
          <SearchBar
            containerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent', ...noBorderStyle }}
            onChangeText={keyword => this.onSearchChange(keyword)}
            textInputRef="textInput"
            placeholder="输入关键字"
            lightTheme
            clearIcon
            keyboardType="web-search"
          />
          <Icon
            name="settings"
            iconStyle={{ paddingLeft: 3, paddingRight: 10, fontSize: 24 }}
            onPress={() => this.setState({ keyword: '' })}
          />
        </View>
        <MaterialFlatList
          data={list}
        />
      </View>
    )
  }
}
