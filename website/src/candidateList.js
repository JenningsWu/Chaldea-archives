import React, { PureComponent } from 'react'
import {
  Image,
  Checkbox,
  Nav,
  NavItem,
} from 'react-bootstrap'

import { servantList } from './assets/data/servants'
import avatars from './assets/img/avatars'

class CandidiateList extends PureComponent {
  constructor() {
    super()
    this.state = {
      type: '1',
      selectedClass: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
      },
    }
  }

  handleSelect = (idx) => {
    if (idx) {
      this.setState({ type: idx })
    }
  }

  handleSelectClass = (idx) => {
    this.setState({
      selectedClass: {
        ...this.state.selectedClass,
        [idx]: !this.state.selectedClass[idx],
      },
    })
  }

  render() {
    const { type, selectedClass } = this.state
    const { selected } = this.props
    const list = servantList.filter((s) => {
      if (!s) return false
      if (s.rarity in selectedClass && !selectedClass[s.rarity]) return false
      if (!s.isShipped) return false
      if (s.id in selected) return false
      if (type === '8') {
        return s.class < 1 || s.class > 7
      }
      return `${s.class}` === type
    })
    return (
      <div>
        <div>
          <div
            style={{ display: 'inline-block' }}
          >
            <Nav
              bsStyle="tabs"
              activeKey={type}
              onSelect={this.handleSelect}
            >
              <NavItem eventKey="1" >剑</NavItem>
              <NavItem eventKey="2" >弓</NavItem>
              <NavItem eventKey="3" >枪</NavItem>
              <NavItem eventKey="4" >骑</NavItem>
              <NavItem eventKey="5" >术</NavItem>
              <NavItem eventKey="6" >杀</NavItem>
              <NavItem eventKey="7" >狂</NavItem>
              <NavItem eventKey="8" >其他</NavItem>
            </Nav>
          </div>
          <div
            style={{ display: 'inline-block', marginLeft: 15 }}
          >
            {
              ['五星', '四星', '三星', '二星', '一星'].map((label, idx) => (
                <Checkbox
                  key={label}
                  inline
                  checked={selectedClass[5 - idx]}
                  style={{ top: -17 }}
                  onChange={() => this.handleSelectClass(5 - idx)}
                >
                  {label}
                </Checkbox>
              ))
            }
          </div>
        </div>
        <div>
          {
            list.map(s => (
              <Image
                key={s.id}
                src={avatars[parseInt(s.id, 10)]}
                onClick={() => this.props.add(s.id)}
                width={60}
                style={{ margin: 10, cursor: 'pointer' }}
              />
            ))
          }
          <Image />
        </div>
      </div>
    )
  }
}

export default CandidiateList
