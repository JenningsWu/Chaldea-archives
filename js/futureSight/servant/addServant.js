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
import { createSelector } from 'reselect'
import _ from 'lodash'

import navigationOptions from '../navigationOptions'

import { servantList as servants } from '../../assets/data/servants'
import { setServantInfo } from '../../actions/servant'
import SearchbarOptionModal, { initialOption } from '../../common/searchbarOptionModal'
import { setSearchbarOption as setSearchbarOptionAction } from '../../actions/config'


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
    super(props)
    this.state = {
      keyword: '',
      up: true,
      adding: false,
      current: '001',
      showOption: false,
      // list: props.data,
      list: props.list,
    }
  }

  state: {
    keyword: string;
    up: boolean;
    list: Array<Object>;
  }
  //
  // componentDidMount() {
  //   this.props.navigation.navigate('FutureSight', { servant: servants[2] })
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) {
      return
    }
    this.onSearchChange(this.state.keyword, nextProps.list)
  }

  onSearchChange = (keyword: string, list = this.props.list) => {
    this.setState({
      keyword,
      list: keyword === '' ? list : list.filter(servant =>
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
    const {
      fouMode,
    } = this.props
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
          <FlatList
            data={this.state.up ? this.state.list : this.state.list.slice().reverse()}
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
                    fouMode={fouMode}
                  />
                }
                navigation={this.props.navigation}
              />
            )}
          />
        </View>
      </View>
    )
  }
}

const getOption = ({ account, accountData }) => _.get(accountData, [account, 'config', 'searchbarOption', 'addServant'], initialOption)

const getServantList = createSelector(
  getOption,
  () => servants.filter(s => s && s.isShipped),
  ({ account, accountData }) => accountData[account].servant,
  (option, servantList, exclude) =>
    servantList.filter(s => s.filter(option) && !(s.id in exclude)),
)

export default connect(
  state => ({
    list: getServantList(state),
    option: getOption(state),
    fouMode: _.get(state.accountData, [state.account, 'config', 'global', 'fouMode'], false),
  }),
  dispatch => ({
    setServantInfo: (id, value) => {
      dispatch(setServantInfo(id, value))
    },
    setSearchbarOption: (value) => {
      dispatch(setSearchbarOptionAction('addServant', value))
    },
  }),
)(ServantListWithSearch)
