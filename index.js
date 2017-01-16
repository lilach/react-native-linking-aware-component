import React from 'react'
import { Linking } from 'react-native'

export default (Component, handler) => class LinkingAwareComponent extends React.Component {
  constructor (props) {
    super(props)

    this.handler = (event) => {
      const additionalProps = handler(event)

      if (additionalProps) {
        this.setState(additionalProps)
      }
    }
  }

  componentDidMount () {
    Linking.addEventListener('url', this.handler)
  }

  componentWillUnmount () {
    Linking.removeEventListener('url', this.handler)
  }

  render () {
    return <Component {...this.props} {...this.state} />
  }
}
