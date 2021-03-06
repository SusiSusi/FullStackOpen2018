import React from 'react'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    if (!this.props.buttonLabel) {
      return (
        <div>
          <div style={hideWhenVisible}>
            <div onClick={this.toggleVisibility}>
              {this.props.otsikko}
            </div>
          </div>
          <div style={showWhenVisible} className="togglableContent">
            <div onClick={this.toggleVisibility} className="open">
              {this.props.children}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>Cancel</button>
        </div>
      </div>
    )

  }
}

export default Togglable