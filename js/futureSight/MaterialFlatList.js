/**
 * @flow
 */

import React, { PureComponent } from 'react'
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

class MaterialItem extends PureComponent {
  render() {
    const { id, name, needs, future, current, setMaterialNum } = this.props
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
  }
}

function MaterialFlatList({ data, extraData, setMaterialNum }) {
  return (
    <View style={{
      flex: 1,
    }}
    >
      <FlatList
        data={data}
        extraData={extraData}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { id, name } }) => (
          <MaterialItem
            id={id}
            name={name}
            needs={extraData.needsList[id]}
            future={extraData.futureList[id]}
            current={extraData.currList[id]}
            setMaterialNum={setMaterialNum}
          />
        )}
      />
    </View>
  )
}

const materialNeedsCalculator = createSelector(
  ({ account, accountData }) => accountData[account].servant,
  ({ account, accountData }) => _.get(accountData, [account, 'config', 'futureSightMaterialList', 'priority'], {}),
  (servantList, config) => {
    const ret = _.mapValues(materialList, () => 0)
    Object.keys(servantList).forEach((id) => {
      const {
        level,
        skills,
        priority,
      } = servantList[id]
      if (!_.get(config, [priority], true)) {
        return
      }
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

const extractCurrentList = createSelector(
  ({ account, accountData }) => accountData[account].material,
  list => _.mapValues(list, ({ current }) => current),
)

const materialCalculator = createStructuredSelector({
  currList: extractCurrentList,
  needsList: materialNeedsCalculator,
  futureList: materialFutureCalculator,
})

const getMaterialList = createSelector(
  ({ data }) => data,
  ({ state: { account, accountData } }) => _.get(accountData, [account, 'config', 'futureSightMaterialList', 'type'], {}),
  (data, config) => (
    data.filter(({ type }) => _.get(config, [type], true))
  ),
)

const getFutureInsightViewConfig = ({ account, accountData }) => _.get(accountData, [account, 'config', 'futureInsightView'], false)

const getNeedsMaterial = createSelector(
  ({ data }) => data,
  ({ extraData }) => extraData,
  (data, { needsList, currList, futureList }) => data.filter(({ id }) => (
    needsList[id] > currList[id] + futureList[id]
  )),
)

export default connect(
  (state, { data }) => ({
    data: getMaterialList({ state, data }),
    extraData: materialCalculator(state),
    futureInsightView: getFutureInsightViewConfig(state),
  }),
  dispatch => ({
    setMaterialNum: (id, num) => {
      dispatch(setMaterialNumAction(id, num))
    },
  }),
  ({ data, extraData, futureInsightView }, dispatch, ownProps) => ({
    ...ownProps,
    ...dispatch,
    data: futureInsightView ? getNeedsMaterial({ data, extraData }) : data,
    extraData,
  }),
)(MaterialFlatList)
