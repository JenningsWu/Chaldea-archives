/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
} from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import _ from 'lodash'

import ServantList from './ServantList'

import servants from '../assets/data/servants'
import SearchbarOptionModal, { initialOption } from '../common/searchbarOptionModal'
import { setSearchbarOption as setSearchbarOptionAction } from '../actions/config'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

class ServantListWithSearch extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      up: true,
      showOption: false,
      list: props.list,
    }
  }

  state: {
    keyword: string;
    up: boolean;
    showOption: boolean;
    list: Array<Object>;
  }

  componentDidMount() {
    this.props.navigation.navigate('MaterialList')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) {
      return
    }
    this.onSearchChange(this.state.keyword, nextProps.list)
  }

  onSearchChange = (keyword: string, list = this.props.list) => {
    this.setState({
      keyword,
      list: keyword === '' ? list : this.props.list.filter(servant =>
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
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SearchbarOptionModal
          visible={this.state.showOption}
          close={(value) => {
            this.props.setSearchbarOption(value)
            this.setState({ showOption: false })
          }}
          state={this.props.option}
        />
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
            keyboardType="web-search"
            lightTheme
            clearIcon
          />
          <Icon
            name="settings"
            iconStyle={{ paddingLeft: 2, paddingRight: 5, fontSize: 24 }}
            onPress={() => this.setState({ showOption: true })}
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
          <ServantList
            navigation={this.props.navigation}
            data={this.state.up ? this.state.list : this.state.list.slice().reverse()}
          />
        </View>
      </View>
    )
  }
}

const getOption = ({ account, accountData }) => _.get(accountData, [account, 'config', 'searchbarOption', 'index'], initialOption)

const getServantList = createSelector(
  getOption,
  () => servants,
  (option, servantList) => servantList.slice(1).filter(s => s.filter(option)),
)

export default connect(
  state => ({
    list: getServantList(state),
    option: getOption(state),
  }),
  dispatch => ({
    setSearchbarOption: (value) => {
      dispatch(setSearchbarOptionAction('index', value))
    },
  }),
)(ServantListWithSearch)
