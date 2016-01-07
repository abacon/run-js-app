const React = require('react')
const render = require('react-dom').render

const Projects = require('./components/projects.jsx')

var RunJSApp = React.createClass({
  render () {
    return (
      <div>
        <Projects />
      </div>
    )
  }
})

render((<RunJSApp />), document.getElementsByClassName('main')[0])
