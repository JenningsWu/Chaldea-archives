const SET_MATERIAL_NUM = 'set_material_num'

function setMaterialNum(id, num) {
  return {
    type: SET_MATERIAL_NUM,
    id,
    num,
  }
}

export { SET_MATERIAL_NUM, setMaterialNum }
