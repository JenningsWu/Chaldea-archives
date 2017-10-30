/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
  FlatList,
  Image,
} from 'react-native'
import {
  ListItem,
} from 'react-native-elements'
import { connect } from 'react-redux'
import _ from 'lodash'

import {
  setConditionalValue as setConditionalValueAction,
  setMaterialNum as setMaterialNumAction,
} from '../../actions/event'

import {
  getEventNormalMaterialMaximumNum,
} from '../../schema/Event'

import navigationOptions from '../navigationOptions'

import events from '../../assets/data/event.json'
import materials from '../../assets/export/data/materials'
import materialImg from '../../assets/export/img/materials'

const SWITCH_ITEM = 'switch_item'
const NORMAL_ITEM = 'normal_item'
const POOL_ITEM = 'pool_item'

class MaterialItem extends PureComponent {
  render() {
    const {
      eventId,
      active,
      type,
      id,
      title,
      maxNum,
      value,
      tag,
      onSwitch,
      setMaterialNum,
    } = this.props
    const material = materials[id]
    switch (type) {
      case SWITCH_ITEM:
        return (
          <ListItem
            title={title}
            underlayColor="#ddd"
            hideChevron
            switchButton
            switchDisabled={!active}
            switched={value}
            onSwitch={onSwitch}
          />
        )
      case NORMAL_ITEM: {
        const num = Math.min(maxNum, value)
        return (
          <ListItem
            title={material.name}
            avatar={
              <Image
                resizeMode="stretch"
                source={materialImg[id]}
                style={{ height: '100%', aspectRatio: 1 }}
              />}
            subtitle={num === maxNum ? null : `最大值：${maxNum}`}
            underlayColor="#ddd"
            rightTitle={`${num}`}
            textInput={active}
            textInputValue={`${num}`}
            keyboardType="numeric"
            textInputReturnKeyType="done"
            textInputSelectTextOnFocus
            textInputStyle={{ color: '#7E7E7E', width: '100%', flex: 1, textAlignVertical: 'bottom', paddingTop: 10 }}
            textInputOnChangeText={(text) => {
              setMaterialNum(eventId, id, Math.min(
                maxNum, parseInt(text, 10) || 0,
              ))
            }}
            hideChevron
          />
        )
      }
      case POOL_ITEM:
        return (
          <ListItem
            title={material.name}
            avatar={
              <Image
                resizeMode="stretch"
                source={materialImg[id]}
                style={{ height: '100%', aspectRatio: 1 }}
              />}
            subtitle={tag === '' ? undefined : `每${tag}`}
            underlayColor="#ddd"
            rightTitle={`${value}`}
            hideChevron
          />
        )
      default:
        return null
    }
  }
}

class MaterialFlatList extends PureComponent {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const {
      id,
      eventInfo,
      setConditionalValue,
      setMaterialNum,
    } = this.props
    const event = events[id]
    const {
      conditional = 1,
      material = {},
      active = false,
    } = eventInfo
    const top = 'conditional' in event ? [{
      type: SWITCH_ITEM,
      key: 'switch_0',
      title: '第一次通关',
      value: conditional === 0,
      onSwitch: () => setConditionalValue(id, conditional === 0 ? 1 : 0),
    }] : []
    const normal = _.map(
      getEventNormalMaterialMaximumNum(id, eventInfo),
      (maxNum, materialId) => ({
        type: NORMAL_ITEM,
        id: materialId,
        key: `normal_${materialId}`,
        maxNum,
        value: materialId in material ? material[materialId] : maxNum,
      }),
    )
    const pool = _.flatMap(
      event.pool,
      ({ name, material: poolMaterial }) => _.map(
        poolMaterial, (num, materialId) => ({
          type: POOL_ITEM,
          id: materialId,
          key: `pool_${materialId}_${name}`,
          value: num,
          tag: name,
        }),
      ),
    )
    const list = [
      ...top,
      ...normal,
      ...pool,
    ]
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{
          flex: 1,
        }}
        >
          <FlatList
            data={list}
            extraData={active}
            keyExtractor={(item: { key: string }) => item.key}
            renderItem={({ item }) => (
              <MaterialItem
                eventId={id}
                active={active}
                type={item.type}
                id={item.id}
                title={item.title}
                maxNum={item.maxNum}
                value={item.value}
                tag={item.tag}
                onSwitch={item.onSwitch}
                setMaterialNum={setMaterialNum}
              />
            )}
          />
        </View>
      </View>
    )
  }
}

const ConnectedMaterialList = connect(
  ({ account, accountData }) => ({ eventsInfo: accountData[account].event }),
  dispatch => ({
    setConditionalValue: (id, value) =>
      dispatch(setConditionalValueAction(id, value)),
    setMaterialNum: (eventId, materialId, value) =>
      dispatch(setMaterialNumAction(eventId, materialId, value)),
  }),
  ({ eventsInfo }, dispatchProps, { id }) => ({
    ...dispatchProps,
    id,
    eventInfo: eventsInfo[id] || {},
  }),
)(MaterialFlatList)

class MaterialList extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: events[navigation.state.params.id].name,
    ...navigationOptions,
  })

  render() {
    const id = this.props.navigation.state.params.id
    return (
      <ConnectedMaterialList id={id} />
    )
  }
}

export default MaterialList
