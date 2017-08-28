/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
  FlatList,
} from 'react-native'
import {
  SearchBar,
  Icon,
} from 'react-native-elements'
import { connect } from 'react-redux'

import navigationOptions from './navigationOptions'

import servants from '../assets/data/servants'
import { setServantInfo } from '../actions/servant'

import ServantForm from './servantForm'
import ServantItem from './servantItem'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

class ServantListWithSearch extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: '增加',
    ...navigationOptions,
    // headerRight: () => (
    //   <Icon
    //     name="settings"
    //     onPress={() => navigation.navigate('MaterialList')}
    //   />
    // ),
  })

  constructor(props) {
    super()
    this.list = Object.keys(servants).map(
      key => servants[key]).slice(1).filter(servant => !(servant.id in props.list))
    this.candidateList = this.list
    this.state = {
      keyword: '',
      up: true,
      adding: false,
      current: '001',
      // list: props.data,
      renderList: this.list,
    }
  }

  state: {
    keyword: string;
    up: boolean;
    renderList: Array<Object>;
  }
  //
  // componentDidMount() {
  //   this.props.navigation.navigate('FutureSight', { servant: servants[2] })
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) {
      return
    }
    this.candidateList = this.list.filter(servant => !(servant.id in nextProps.list))
    this.onSearchChange(this.state.keyword)
  }

  onSearchChange = (keyword: string) => {
    this.setState({
      keyword,
      renderList: keyword === '' ? this.candidateList : this.candidateList.filter(servant =>
        servant.checkKeyWord(keyword)),
    })
  }

  list: Array<Object>

//
// const testStyle = {
//   flex: 1,
// }
  render() {
    const {
      up,
    } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
        >
          <SearchBar
            containerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent', ...noBorderStyle }}
            onChangeText={key => this.onSearchChange(key)}
            textInputRef="textInput"
            placeholder="输入关键字"
            keyboardType="web-search"
            lightTheme
            clearIcon
          />
          <Icon
            name="settings"
            iconStyle={{ paddingLeft: 2, paddingRight: 5, fontSize: 24 }}
            onPress={() => this.setState({ keyword: '' })}
          />
          <Icon
            iconStyle={{ paddingLeft: 5, paddingRight: 10, fontSize: 32 }}
            name={this.state.up ? 'caret-up' : 'caret-down'}
            type="font-awesome"
            onPress={() => this.setState({ up: !up })}
          />
        </View>
        <View style={{
          flex: 1,
        }}
        >
          <FlatList
            data={this.state.renderList}
            keyExtractor={(item: { id: string }) => item.id}
            renderItem={({ item }) => (
              <ServantItem
                servant={item}
                setServantInfo={this.props.setServantInfo}
                desc={`${item.classDesc} ${item.rarityDesc}`}
                servantForm={
                  <ServantForm
                    servant={item}
                    setServantInfo={this.props.setServantInfo}
                    addButton
                    cancelButton
                  />
                }
              />
            )}
          />
        </View>
      </View>
    )
  }
}

export default connect(
  ({ account, accountData }) => ({ list: accountData[account].servant }),
  dispatch => ({
    setServantInfo: (id, value) => {
      dispatch(setServantInfo(id, value))
    },
  }),
)(ServantListWithSearch)
