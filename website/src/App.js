import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  PageHeader,
  Table,
  Button,
  Collapse,
  FormControl,
  Well,
} from 'react-bootstrap'
import _ from 'lodash'
import Clipboard from 'clipboard'

import servantMap from './assets/export/data/servants'

import CandidiateList from './candidateList'
import ServantItem from './servantItem'

import './App.css'

/* global localStorage */

class App extends Component {
  constructor() {
    super()
    this.state = {
      servant: JSON.parse(localStorage.getItem('servant') || '{}'),
      open: false,
    }
  }

  componentDidMount() {
    const button = this.button
    const input = this.input

    this.clipboard = new Clipboard(
      ReactDOM.findDOMNode(button), {
        target: () => input,
      },
    )
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  add = (id) => {
    const { servant } = this.state
    const next = {
      ...servant,
      [id]: {
        id,
        level: {
          curr: 1,
          next: 1,
          currAscension: false,
          nextAscension: false,
        },
        skills: [
          {
            curr: 1,
            next: 1,
          },
          {
            curr: 1,
            next: 1,
          },
          {
            curr: 1,
            next: 1,
          },
        ],
        npLevel: 1,
        priority: 1,
      },
    }
    localStorage.setItem('servant', JSON.stringify(next))
    this.setState({
      servant: next,
    })
  }

  delete = (id) => {
    const { servant } = this.state
    const next = { ...servant }
    delete next[id]
    localStorage.setItem('servant', JSON.stringify(next))
    this.setState({
      servant: next,
    })
  }

  update = (id, value) => {
    const { servant } = this.state
    const next = {
      ...servant,
      [id]: value,
    }
    localStorage.setItem('servant', JSON.stringify(next))
    this.setState({
      servant: next,
    })
  }


  render() {
    const {
      servant,
    } = this.state
    return (
      <div className="main">
        <CandidiateList
          selected={servant}
          add={this.add}
        />
        <Button
          bsStyle="primary"
          onClick={() => this.setState({ open: !this.state.open })}
        >
          导出数据
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
              <button ref={(element) => { this.button = element }}>
                复制
              </button>
              <FormControl
                componentClass="textarea"
                inputRef={(element) => { this.input = element }}
                value={JSON.stringify({ servant })}
                readOnly
              />
              {}
            </Well>
          </div>
        </Collapse>
        <PageHeader style={{ textAlign: 'center', marginTop: this.state.open ? 10 : -40 }}>已选从者</PageHeader>
        <Table responsive striped condensed hover className="servant">
          <thead>
            <tr>
              <th>从者</th>
              <th>等级</th>
              <th>技能</th>
              <th>宝具</th>
              <th>优先级</th>
            </tr>
          </thead>
          <tbody>
            {
              _.map(servant, (info => (
                <ServantItem
                  key={info.id}
                  servantInfo={info}
                  servant={servantMap[info.id]}
                  delete={this.delete}
                  update={this.update}
                />
              )))
            }
          </tbody>
        </Table>

      </div>
    )
  }
}

export default App
