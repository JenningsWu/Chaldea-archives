const CLICK_CONFIG = 'click_config'

function clickConfig(parentName, name, key) {
  return {
    type: CLICK_CONFIG,
    parentName,
    name,
    key,
  }
}

export { CLICK_CONFIG, clickConfig }
