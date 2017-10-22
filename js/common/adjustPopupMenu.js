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
import { hook } from '../lib/navigateOnce'

const AdjustPopupMenu = ({ list, config = {}, clickConfig, icon, defaultValue }) => (
  <Menu onSelect={() => {}}>
    <MenuTrigger>
      <Icon
        name={icon || 'adjust'}
        iconStyle={{ paddingRight: 10 }}
        // onPress={() => navigation.navigate('AddServant')}
      />
    </MenuTrigger>
    <MenuOptions>
      {
        _.flatMap(list, (obj, name) => _.map(obj, (label, key) => {
          const value = _.get(
            config, [name, key],
            _.get(defaultValue, [name, key], true))
          return (
            <MenuOption style={{ padding: 0 }} key={`${name}:${key}`}>
              <CheckBox
                containerStyle={{
                  margin: 0,
                  marginLeft: 0,
                  marginRight: 0,
                }}
                title={label}
                checked={value}
                renderTouchable={View}
                onPress={() => {
                  if (!hook.allowSwitch()) {
                    hook.alert()
                  } else {
                    clickConfig(name, key, !value)
                  }
                }}
              />
            </MenuOption>
          )
        }))
      }
    </MenuOptions>
  </Menu>
)

export default connect(
  ({ account, accountData }, { parentName }) => ({
    config: accountData[account].config.viewFilter[parentName],
  }),
  (dispatch, { parentName }) => ({
    clickConfig: (name, key, value) => {
      dispatch(clickConfigAction(parentName, name, key, value))
    },
  }),
)(AdjustPopupMenu)
