/**
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
} from 'react-native'
import {
  SearchBar,
} from 'react-native-elements'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import _ from 'lodash'

import MaterialFlatList from './materialFlatList'
import indexNavigationOptions from '../navigationOptions'

import servantMap from '../../assets/export/data/servants'
import materialMap from '../../assets/export/data/materials'
import { setMaterialNum as setMaterialNumAction } from '../../actions/material'
import { materialFutureCalculator, materialCurrentCalculator } from '../../utils/selectors'

const noBorderStyle = {
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
}

const getRenderedList = createSelector(
  ({ keyword }) => keyword,
  ({ data }) => data,
  (keyword, data) => (
    keyword === '' ? data : data.filter(({ name }) =>
      name.indexOf(keyword) >= 0)),
)

class ServantListWithSearch extends PureComponent {

  static navigationOptions = () => ({
    title: '素材规划',
    ...indexNavigationOptions,
  })

  constructor() {
    super()
    this.state = {
      keyword: '',
    }
  }

  state: {
    keyword: string;
    // up: boolean;
    list: Array<Object>;
  }

  onSearchChange = (keyword: string) => {
    this.setState({
      keyword,
      list: keyword === '' ? this.materialList : this.materialList.filter(({ name }) =>
        name.indexOf(keyword) >= 0),
    })
  }

  materialList: Array<Object>

  render() {
    const {
      data,
      extraData,
      setMaterialNum,
      materialToServant,
      navigation,
    } = this.props
    const {
      keyword,
    } = this.state
    const list = getRenderedList({ keyword, data })
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          // alignItems: 'center',
        }}
        >
          <SearchBar
            containerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent', ...noBorderStyle }}
            onChangeText={key => this.setState({ keyword: key })}
            textInputRef="textInput"
            placeholder="输入关键字"
            lightTheme
            clearIcon
            keyboardType="web-search"
          />
        </View>
        <MaterialFlatList
          data={list}
          extraData={extraData}
          setMaterialNum={setMaterialNum}
          materialToServant={materialToServant}
          navigation={navigation}
        />
      </View>
    )
  }
}

const servantMatarialCalculator = createSelector(
  ({ account, accountData }) => accountData[account].servant,
  servantList => (
    _.map(servantList, (info, id) => {
      const { level, skills } = info
      const servant = servantMap[id]
      return {
        id,
        info,
        ascensionNeeds: Array.from(servant.calculateMaterailNums(level, null)).map(
          ([materialId, num]) => (
            {
              id: materialId,
              num,
            }
          ),
        ).filter(({ num }) => num > 0),
        skillNeeds: Array.from(servant.calculateMaterailNums(null, skills)).map(
          ([materialId, num]) => (
            {
              id: materialId,
              num,
            }
          ),
        ).filter(({ num }) => num > 0),
      }
    })
  ),
)

const materialNeedsCalculator = createSelector(
  servantMatarialCalculator,
  ({ account, accountData }) => _.get(accountData, [account, 'config', 'viewFilter', 'futureSightMaterialList', 'priority'], {}),
  ({ account, accountData }) => _.get(accountData, [account, 'config', 'viewFilter', 'futureSightMaterialList', 'chooseMode', 'enable'], false),
  (servantList, config, chooseMode) => {
    const ret = _.mapValues(materialMap, () => 0)
    servantList.forEach(({ info, ascensionNeeds, skillNeeds }) => {
      const {
        priority,
        selected = false,
      } = info
      if (!_.get(config, [priority], true)) {
        return
      }
      if (chooseMode && !selected) {
        return
      }
      ascensionNeeds.forEach(({ id, num }) => {
        ret[id] += num
      })
      skillNeeds.forEach(({ id, num }) => {
        ret[id] += num
      })
    })
    return ret
  },
)

const materialToServantCalculator = createSelector(
  servantMatarialCalculator,
  ({ account, accountData }) => _.get(accountData, [account, 'config', 'viewFilter', 'futureSightMaterialList', 'priority'], {}),
  (servantList, config) => {
    const ret = _.mapValues(materialMap, () => [])
    servantList.forEach(({ id, info, ascensionNeeds, skillNeeds }) => {
      const {
        priority,
      } = info
      if (!_.get(config, [priority], true)) {
        return
      }
      const materialToServant = {}
      ascensionNeeds.forEach((material) => {
        materialToServant[material.id] = materialToServant[material.id] || {}
        materialToServant[material.id].numForAscension = material.num
      })
      skillNeeds.forEach((material) => {
        materialToServant[material.id] = materialToServant[material.id] || {}
        materialToServant[material.id].numForSkill = material.num
      })
      _.forEach(materialToServant, ({ numForSkill = 0, numForAscension = 0 }, materialId) => {
        ret[materialId].push({ id, numForSkill, numForAscension })
      })
    })
    return ret
  },
)

const materialCalculator = createStructuredSelector({
  currList: materialCurrentCalculator,
  needsList: materialNeedsCalculator,
  futureList: materialFutureCalculator,
  materialToServant: materialToServantCalculator,
  servantInfo: ({ account, accountData }) => accountData[account].servant,
})

const getMaterialList = createSelector(
  () => materialMap,
  ({ account, accountData }) => _.get(accountData, [account, 'config', 'viewFilter', 'futureSightMaterialList', 'type'], {}),
  (data, config) => {
    const ret = _.map(data, (val, id) => ({
      ...val,
      id,
    })).filter(({ id, type }) => id[0] !== '3' && _.get(config, [type], true))
    const top = ret.filter(m => m.top)
    top.push(...ret.filter(m => !m.top))
    return top
  },
)

const getFutureInsightViewConfig = ({ account, accountData }) => _.get(accountData, [account, 'config', 'viewFilter', 'futureInsightView'], false)

const getNeedsMaterial = createSelector(
  ({ data }) => data,
  ({ extraData }) => extraData,
  (data, { needsList, currList, futureList }) => data.filter(({ id }) => (
    needsList[id] > currList[id] + futureList[id]
  )),
)

export default connect(
  state => ({
    data: getMaterialList(state),
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
)(ServantListWithSearch)
