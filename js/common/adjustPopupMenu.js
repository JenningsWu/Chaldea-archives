/**
 * @flow
 */

import React from 'react'
import {
  View,
} from 'react-native'
import {
  Icon,
  CheckBox,
} from 'react-native-elements'
import Menu, {
  MenuOptions, MenuOption, MenuTrigger,
} from 'react-native-menu'
import { connect } from 'react-redux'
import _ from 'lodash'

import { clickConfig as clickConfigAction } from '../actions/config'

const AdjustPopupMenu = ({ list, config = {}, clickConfig }) => (
  <Menu onSelect={() => {}}>
    <MenuTrigger>
      <Icon
        name="adjust"
        iconStyle={{ paddingRight: 10 }}
        // onPress={() => navigation.navigate('AddServant')}
      />
    </MenuTrigger>
    <MenuOptions>
      {
        _.flatMap(list, (obj, name) => _.map(obj, (label, key) => (
          <MenuOption style={{ padding: 0 }} key={`${name}:${key}`}>
            <CheckBox
              containerStyle={{
                margin: 0,
                marginLeft: 0,
                marginRight: 0,
              }}
              title={label}
              checked={_.get(config, [name, key], false)}
              renderTouchable={View}
              onPress={() => clickConfig(name, key)}
            />
          </MenuOption>
        )))
      }
    </MenuOptions>
  </Menu>
)

export default connect(
  ({ account, accountData }, { parentName }) => ({
    config: accountData[account].config[parentName],
  }),
  (dispatch, { parentName }) => ({
    clickConfig: (name, key) => {
      dispatch(clickConfigAction(parentName, name, key))
    },
  }),
)(AdjustPopupMenu)
