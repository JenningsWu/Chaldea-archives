import React, { Component } from 'react'
import {
  PageHeader,
  Table,
  Button,
  Collapse,
  Well,
} from 'react-bootstrap'
import _ from 'lodash'

import servantMap from './assets/data/servants'

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
        <PageHeader style={{ textAlign: 'center' }}>已选从者</PageHeader>
        <Button onClick={()=> this.setState({ open: !this.state.open })}>
          导出数据
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
              {JSON.stringify({ servant })}
            </Well>
          </div>
        </Collapse>
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

        <CandidiateList
          selected={servant}
          add={this.add}
        />

      </div>
    )
  }
}

export default App
