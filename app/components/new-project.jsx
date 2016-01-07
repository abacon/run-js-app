const React = require('react')
const ipcRenderer = require('electron').ipcRenderer
const Ratchet = require('react-ratchet')

let { Button } = Ratchet

var NewProject = React.createClass({
  getInitialState () {
    return {value: ''}
  },

  componentDidMount () {
    ipcRenderer.on('directory', (event, dir) => this.setState({value: dir}))
  },

  propTypes: {
    addProject: React.PropTypes.func,
    pickDirectory: React.PropTypes.func
  },

  render () {
    return (
      <div>New Project?
        <input type='text' disabled value={this.state.value} />
        <button onClick={this.props.pickDirectory}>Pick a directory</button>
        <Button rStyle='positive' onClick={this.props.addProject.bind(null, this.state.value)}>add</Button>
      </div>
    )
  }
})

module.exports = NewProject
