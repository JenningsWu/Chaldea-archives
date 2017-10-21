/**
 * @flow
 */

import React, { PureComponent, cloneElement } from 'react'
import {
  Image,
} from 'react-native'
import {
  ListItem,
} from 'react-native-elements'

import avatars from '../../assets/img/avatars'
import { hook } from '../../lib/navigateOnce'

export default class ServantItem extends PureComponent {
  constructor(props) {
    super()
    this.state = {
      extend: false,
    }
    this.servant = props.servant
  }

  componentWillUnmount() {
    if (this.props.lockIfExpand && this.state.extend) {
      hook.unregister(this.servant.id)
    }
  }

  getSubtitle() {
    if (this.state.extend && this.props.servantForm) {
      return cloneElement(this.props.servantForm, {
        collapse: this.collapse,
      })
    }
    if (this.props.desc) {
      return this.props.desc
    }
    return `${this.props.servant.classDesc} ${this.props.servant.rarityDesc}`
  }

  collapse = () => {
    if (this.props.lockIfExpand) {
      hook.unregister(this.servant.id)
    }
    this.setState({ extend: false })
  }

  render() {
    const {
      servant,
      lockIfExpand,
      chooseMode,
      selected = true,
      selectServant,
    } = this.props

    const {
      extend,
    } = this.state

    const bigAvatar = this.props.bigAvatar && !extend
    return (
      <ListItem
        title={servant.name}
        avatar={
          <Image
            resizeMode="stretch"
            style={{ height: bigAvatar ? '125%' : '100%', aspectRatio: 0.914 }}
            source={avatars[parseInt(servant.id, 10)]}
          />}
        subtitle={this.getSubtitle()}
        titleContainerStyle={{ marginLeft: bigAvatar ? 4 : 0 }}
        subtitleContainerStyle={{ marginLeft: bigAvatar ? 4 : 0 }}
        onPress={() => {
          if (!extend && !chooseMode) {
            if (this.props.lockIfExpand) {
              hook.register(servant.id, servant.name)
            }
            this.setState({ extend: true })
          }
        }}
        onLongPress={() => {
          if (!lockIfExpand || !extend) {
            this.props.navigation.navigate('FutureServantDetail', { id: servant.id, routePrefix: 'Future' })
          }
        }}
        underlayColor="#ddd"
        rightIcon={extend ? {
          name: 'chevron-left',
          color: 'transparent',
        } : {
          name: 'chevron-right',
        }}
        hideChevron={chooseMode}
        switchButton={chooseMode}
        switched={selected}
        onSwitch={() => {
          if (selectServant) {
            selectServant(servant.id, !selected)
          }
        }}
        // avatarStyl e={{ height: 38, width: 34, alignSelf: 'stretch' }}
      />
    )
  }
}
