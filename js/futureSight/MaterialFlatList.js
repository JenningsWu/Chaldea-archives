/**
 * @flow
 */

import React from 'react'
import _ from 'lodash'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
} from 'react-native'
import {
  ListItem,
} from 'react-native-elements'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

import servants from '../assets/data/servants'
import materialList from '../assets/data/materialList'
import materialImg from '../assets/img/material'
import { setMaterialNum as setMaterialNumAction } from '../actions/material'
import { rarityAscensionLevel } from '../schema/Servant'

function MaterialFlatList({ data, extraData, setMaterialNum }) {
  const styles = StyleSheet.create({
    subtitleView: {
      flexDirection: 'row',
      // paddingLeft: 10,
      paddingTop: 5,
    },
    needsText: {
      paddingLeft: 10,
      color: 'grey',
      width: 80,
    },
    futureText: {
      paddingLeft: 10,
      color: 'grey',
      width: 80,
    },
    storageText: {
      paddingLeft: 20,
      color: '#444444',
      width: 78,
    },
  })

  return (
    <View style={{
      flex: 1,
    }}
    >
      <FlatList
        data={data}
        extraData={extraData}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { id, name } }) => {
          const needs = extraData.needsList[id]
          const future = extraData.futureList[id]
          const current = extraData.currList[id].current
          return (
            <ListItem
              title={name}
              avatar={
                <Image
                  resizeMode="stretch"
                  source={materialImg[id]}
                  style={{ height: '100%', aspectRatio: 1 }}
                />}
              subtitle={
                <View style={styles.subtitleView}>
                  <Text
                    style={[
                      styles.needsText,
                      { color: needs > future + current ? 'red' : 'green' },
                    ]}
                  >
                    所需：{needs}
                  </Text>
                  <Text style={styles.futureText}>活动：{future}</Text>
                  <Text style={styles.storageText}>库存：</Text>
                </View>
              }
              textInput
              textInputValue={`${current}`}
              textInputKeyboardType="numeric"
              textInputReturnKeyType="done"
              textInputSelectTextOnFocus
              textInputStyle={{ color: '#444444', width: '100%', flex: 1, textAlignVertical: 'bottom', paddingTop: 10 }}
              textInputOnChangeText={(num) => {
                setMaterialNum(id, parseInt(num, 10) || 0)
              }}
              hideChevron
              // onPress={() => this.props.navigation.navigate('Item', { servant: item })}
              // underlayColor="#ddd"
              // avatarStyl e={{ height: 38, width: 34, alignSelf: 'stretch' }}
            />
          )
        }}
      />
    </View>
  )
}

const materialNeedsCalculator = createSelector(
  ({ account, accountData }) => accountData[account].servant,
  (servantList) => {
    const ret = _.mapValues(materialList, () => 0)
    Object.keys(servantList).forEach((id) => {
      const {
        level,
        skills,
      } = servantList[id]
      const servant = servants[parseInt(id, 10)]
      skills.forEach((skill) => {
        for (let i = skill.curr; i < skill.next; i += 1) {
          servant.skillResource[i - 1].forEach((cost) => {
            ret[cost.id] += cost.num
          })
        }
      })
      rarityAscensionLevel[servant.rarity].forEach((checkLevel, index) => {
        if ((level.curr < checkLevel && checkLevel < level.next) ||
            (level.curr === checkLevel && !level.currAscension) ||
            (level.next === checkLevel && level.currAscension)) {
          servant.ascensionResource[index].forEach((cost) => {
            ret[cost.id] += cost.num
          })
        }
      })
    })
    return ret
  },
)

const materialFutureCalculator = createSelector(
  ({ account }) => account,
  account => _.mapValues(materialList, () => 0),
)

const materialCalculator = createStructuredSelector({
  currList: ({ account, accountData }) => accountData[account].material,
  needsList: materialNeedsCalculator,
  futureList: materialFutureCalculator,
})

export default connect(
  (state, { data }) => ({
    data,
    extraData: materialCalculator(state),
  }),
  dispatch => ({
    setMaterialNum: (id, num) => {
      dispatch(setMaterialNumAction(id, num))
    },
  }),
)(MaterialFlatList)
