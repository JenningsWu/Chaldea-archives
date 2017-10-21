/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  ScrollView,
} from 'react-native'
import {
  List,
  ListItem,
} from 'react-native-elements'
import { connect } from 'react-redux'
import _ from 'lodash'
import navigationOptions from '../navigationOptions'
import { setGlobalConfig as setGlobalConfigAction } from '../../actions/config'

class ConfigList extends PureComponent {
  static navigationOptions = {
    ...navigationOptions,
    title: '应用设置',
  }

  render() {
    const {
      fouMode,
      setFouMode,
    } = this.props
    return (
      <ScrollView style={{ backgroundColor: 'white' }} >
        <List style={{ marginTop: 0 }}>
          <ListItem
            title="芙！"
            hideChevron
            switchButton
            switched={fouMode}
            onSwitch={() => setFouMode(!fouMode)}
          />
        </List>
      </ScrollView>
    )
  }
}

export default connect(
  state => ({
    fouMode: _.get(state.accountData, [state.account, 'config', 'global', 'fouMode'], false),
  }),
  dispatch => ({
    setFouMode: (value) => {
      dispatch(setGlobalConfigAction('fouMode', value))
    },
  }),
)(ConfigList)
