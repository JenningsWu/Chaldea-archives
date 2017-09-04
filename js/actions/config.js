const CLICK_CONFIG = 'click_config'
const SWITCH_FUTURE_INSIGHT_VIEW = 'switch_future_insight_view'

function clickConfig(parentName, name, key, value) {
  return {
    type: CLICK_CONFIG,
    parentName,
    name,
    key,
    value,
  }
}

function switchFutureInsightView(value) {
  return {
    type: SWITCH_FUTURE_INSIGHT_VIEW,
    value,
  }
}

export { CLICK_CONFIG, clickConfig, SWITCH_FUTURE_INSIGHT_VIEW, switchFutureInsightView }
