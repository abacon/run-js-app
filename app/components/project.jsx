const React = require('react')
const Ratchet = require('react-ratchet')

var { Button } = Ratchet

var Project = React.createClass({
  propTypes: {
    start: React.PropTypes.func,
    stop: React.PropTypes.func,
    dir: React.PropTypes.string,
    name: React.PropTypes.string,
    status: React.PropTypes.oneOf(['pending', 'started', 'stopped'])
  },

  status () {
    if (this.props.status === 'started') {
      return '👌'
    } else if (this.props.status === 'stopped') {
      return '⏹'
    } else if (this.props.status === 'pending') {
      return '❓'
    }
  },

  start (e) {
    this.props.start(this.dir)
  },
  stop (e) {
    this.props.stop(this.dir)
  },

  render () {
    return (
      <span><b>{this.props.dir}</b> {this.status()}
        <Button rStyle='positive' onClick={this.start} disabled={this.props.status !== 'stopped'}>start</Button>
        <Button rStyle='negative' onClick={this.stop} disabled={this.props.status === 'stopped'}>stop</Button>
      </span>
    )
  }

})

module.exports = Project
