import React, { PureComponent } from 'react'
import {
  Grid,
  Row,
  Col,
  Image,
  FormControl,
  Checkbox,
  Button,
} from 'react-bootstrap'
import _ from 'lodash'

import { rarityAscensionLevel, rarityPalingenesisLevel } from './schema/Servant'

import avatars from './assets/img/avatars'
import skillImg from './assets/img/skill'

const CURR = 'next'
const NEXT = 'level_next'
const CURR_ASCENSION = 'curr_ascension'
const NEXT_ASCENSION = 'next_ascension'

function getSkillImg(servant, idx) {
  const skill = servant[`skill${idx + 1}`]
  const id = skill.length > 0 ? skill[0].img : 0
  return skillImg[id] || null
}

function getSkillName(seravnt, idx) {
  const skill = seravnt[`skill${idx + 1}`]
  return skill.length > 0 ? skill[skill.length - 1].name : ''
}

function constrainInt(value, min, max) {
  const ret = parseInt(value, 10) || 0
  return Math.min(Math.max(ret, min), max)
}

class ServantItem extends PureComponent {
  setSingleNum = (name, value) => {
    const num = (parseInt(value, 10) || 0) % 10
    this.update(name, constrainInt(num, 1, 5))
  }

  limitLevel = () => {
    const { level } = this.props.servantInfo
    const next = Math.max(level.next, level.curr)
    if (next !== level.next) {
      this.update('level', {
        ...level,
        next,
      })
    }
  }

  handleLevelChange = (type, value) => {
    const level = {
      ...this.props.servantInfo.level,
    }
    const { rarity } = this.props.servant

    switch (type) {
      case CURR:
        level.curr = constrainInt(value, 1, 100)
        break
      case NEXT:
        level.next = constrainInt(value, 1, 100)
        break
      case CURR_ASCENSION:
        level.currAscension = !level.currAscension
        break
      case NEXT_ASCENSION:
        level.nextAscension = !level.nextAscension
        break
      default:
    }

    if (level.next === level.curr) {
      level.nextAscension = level.nextAscension || level.currAscension
    }

    if (
      !rarityAscensionLevel[rarity].includes(level.curr) &&
      !rarityPalingenesisLevel[rarity].includes(level.curr)
    ) {
      level.currAscension = false
    }
    if (
      !rarityAscensionLevel[rarity].includes(level.next) &&
      !rarityPalingenesisLevel[rarity].includes(level.next)
    ) {
      level.nextAscension = false
    }

    if (!_.isEqual(level, this.props.servantInfo.level)) {
      this.update('level', level)
    }
  }

  handleSkillChange = (index, v1, v2) => {
    const { skills } = this.props.servantInfo
    const prevSkill = skills[index]
    let curr = v1 == null ? prevSkill.curr : v1
    let next = v2 == null ? prevSkill.next : v2
    if (curr == null) {
      curr = prevSkill.curr
    }
    if (next == null) {
      next = prevSkill.next
    }

    curr = parseInt(curr, 10) || 0
    if (curr !== 10) {
      curr %= 10
    }

    next = parseInt(next, 10) || 0
    if (next !== 10) {
      next %= 10
    }

    const skill = {
      ...prevSkill,
      curr: constrainInt(curr, 1, 10),
      next: constrainInt(next, 1, 10),
    }

    skill.next = Math.max(skill.next, skill.curr)

    if (!_.isEqual(skill, prevSkill)) {
      this.update('skills', [
        ...skills.slice(0, index),
        skill,
        ...skills.slice(index + 1),
      ])
    }
  }

  update = (name, value) => {
    this.props.update(this.props.servant.id, {
      ...this.props.servantInfo,
      [name]: value,
    })
  }

  render() {
    const {
      servantInfo,
      servant,
    } = this.props
    const {
      level,
      skills,
      npLevel,
      priority,
    } = servantInfo
    const { id } = this.props.servantInfo
    return (
      <tr key={id}>
        <td>
          <Image
            src={avatars[parseInt(id, 10)]}
            rounded
            width={40}
          />
          <span className="servant-name">
            {servant.name}
          </span>
        </td>
        <td>
          <Grid style={{ width: 240, padding: 0 }}>
            <Row>
              <Col xs={5}>
                <FormControl
                  type="number"
                  className="single lv"
                  value={`${level.curr}`}
                  onChange={e => this.handleLevelChange(CURR, e.target.value)}
                  onBlur={this.limitLevel}
                />
              </Col>
              <Col xs={1} style={{ width: 10, padding: 0 }}>
                <span style={{ marginLeft: 4 }}>{'->'}</span>
              </Col>
              <Col xs={5}>
                <FormControl
                  type="number"
                  className="single lv"
                  value={`${level.next}`}
                  onChange={e => this.handleLevelChange(NEXT, e.target.value)}
                  onBlur={this.limitLevel}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={5}>
                <Checkbox
                  checked={level.currAscension}
                  onChange={() => this.handleLevelChange(CURR_ASCENSION)}
                >
                  {level.curr < (rarityPalingenesisLevel[servant.rarity][0] || 101) ? '已灵基突破' : '已喂圣杯'}
                </Checkbox>
              </Col>
              <Col xs={1} style={{ width: 10, padding: 0 }}>
                {}
              </Col>
              <Col xs={5}>
                <Checkbox
                  checked={level.nextAscension}
                  onChange={() => this.handleLevelChange(NEXT_ASCENSION)}
                >
                  {level.next < (rarityPalingenesisLevel[servant.rarity][0] || 101) ? '已灵基突破' : '已喂圣杯'}
                </Checkbox>
              </Col>
            </Row>
          </Grid>
        </td>
        <td>
          {
            ['一技能', '二技能', '三技能'].map((name, i) => (
              <Col xs={12} key={name}>
                <Row>
                  <Image
                    src={getSkillImg(servant, i)}
                    rounded
                    width={24}
                  />
                  <span className="skill-name">
                    {getSkillName(servant, i)}
                  </span>
                  <FormControl
                    type="number"
                    className="single"
                    value={`${skills[i].curr}`}
                    onChange={e => this.handleSkillChange(i, e.target.value, null)}
                  />
                  <span style={{ marginLeft: 4 }}>{'->'}</span>
                  <FormControl
                    type="number"
                    className="single"
                    value={`${skills[i].next}`}
                    onChange={e => this.handleSkillChange(i, null, e.target.value)}
                  />
                </Row>
              </Col>
            ))
          }
        </td>
        <td>
          <FormControl
            type="number"
            className="single"
            value={`${npLevel}`}
            onChange={e => this.setSingleNum('npLevel', e.target.value)}
          />
        </td>
        <td>
          <FormControl
            type="number"
            className="single"
            value={`${priority}`}
            onChange={e => this.setSingleNum('priority', e.target.value)}
          />
        </td>
        <td><Button
          bsStyle="danger"
          onClick={() => this.props.delete(servant.id)}
        >X</Button></td>
      </tr>
    )
  }
}

export default ServantItem
