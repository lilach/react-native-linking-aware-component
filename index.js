import React from 'react'
import { Linking } from 'react-native'

export default (Component, handler) => class LinkingAwareComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handler = (event) => this.setState(handler(event))
  }

  componentDidMount () {
    Linking.addEventListener('url', this.handler)
  }

  componendWillUnmount () {
    Linking.removeEventListener('url', this.handler)
  }

  render () {
    return <Component {...this.props} {...this.state} />
  }
}
