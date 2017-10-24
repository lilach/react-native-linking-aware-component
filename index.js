import React from 'react'
import { Linking } from 'react-native'

export default (Component, handler) => class LinkingAwareComponent extends React.Component {
  constructor (props) {
    super(props)

    const handleAppLaunch = props.linkingAware ? props.linkingAware.handleAppLaunch : undefined

    this.handler = (event) => {
      const additionalProps = handler(event)

      if (additionalProps) {
        this.setState(additionalProps)
      }
    }

    if (handleAppLaunch) {
      Linking.getInitialURL().then((url) => {
        if (url) {
          this.handler({ url })
        }
      })
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
