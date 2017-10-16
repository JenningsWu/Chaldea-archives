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

export default class ServantItem extends PureComponent {
  constructor() {
    super()
    this.state = {
      extend: false,
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
    this.setState({ extend: false })
  }

  render() {
    const {
      servant,
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
          if (!extend) {
            this.setState({ extend: true })
          }
        }}
        onLongPress={() => {
          // this.props.navigation.dispatch(setParamsAction)
          this.props.navigation.navigate('FutureServantDetail', { id: servant.id, routePrefix: 'Future' })
        }}
        underlayColor="#ddd"
        rightIcon={{ name: extend ? 'chevron-left' : 'chevron-right' }}
        // avatarStyl e={{ height: 38, width: 34, alignSelf: 'stretch' }}
      />
    )
  }
}
