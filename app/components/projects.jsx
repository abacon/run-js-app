const React = require('react')
const Ratchet = require('react-ratchet')
const ipcRenderer = require('electron').ipcRenderer

var { Title, NavBar, TableView, TableViewCell } = Ratchet

const NewProject = require('./new-project.jsx')
const Project = require('./project.jsx')

var Projects = React.createClass({
  getInitialState () {
    return {projects: []}
  },

  componentDidMount () {
    var self = this
    ipcRenderer.on('run-js', function (event, type, args) {
      console.log('got a run-js event', event, type, args)
      if (type === 'started' || type === 'stopped') {
        self.setState((prevState) => {
          let projects = prevState.projects
          projects[args] = projects[args] || {dir: args, status: 'pending'}

          projects[args].status = type
          return {projects: projects}
        })
      } else if (type === 'list') {
        self.setState({projects: args})
      } else {
      }
    })

    ipcRenderer.send('list-run-js-instances')
  },

  startRunJS (dir) {
    ipcRenderer.send('start-run-js', dir)
  },

  stopRunJS (dir) {
    ipcRenderer.send('stop-run-js', dir)
  },

  pickDirectory () {
    ipcRenderer.send('pick-directory')
  },

  rows () {
    let rows = []
    let index = 0
    for (let i in this.state.projects) {
      let project = this.state.projects[i]
      index++
      rows.push(
        <TableViewCell key={index}>
          <Project
            dir={project.dir}
            status={project.status}
            start={this.startRunJS.bind(this, project.dir)}
            stop={this.stopRunJS.bind(this, project.dir)}
            />
        </TableViewCell>
      )
    }
    if (rows.length > 0) {
      return (
        <TableView>
          {rows}
        </TableView>
      )
    }
  },

  render () {
    return (
      <div>
        <NavBar>
          <Title>Run-js!</Title>
        </NavBar>
        <div className='content'>
          {this.rows()}
          <NewProject pickDirectory={this.pickDirectory} addProject={this.startRunJS}/>
        </div>
      </div>
    )
  }
})

module.exports = Projects
