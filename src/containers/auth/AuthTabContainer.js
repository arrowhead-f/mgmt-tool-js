import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ConsumerTab from './Consumer/ConsumerTab'
import ProviderTab from './ProviderTab'
import ServiceTab from './ServiceTab'

const styles = theme => ({})

class AuthTabContainer extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { theme, consumerData } = this.props
    const { value } = this.state
    return (
      <div>
        <AppBar position='static' style={{ background: '#004676' }}>
          <Tabs value={value} onChange={this.handleChange} variant='fullWidth'>
            <Tab label='Consumer' />
            <Tab label='Provider' />
            <Tab label='Service' />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <ConsumerTab dir={theme.direction} consumerData={consumerData} />
          <ProviderTab dir={theme.direction} />
          <ServiceTab dir={theme.direction} />
        </SwipeableViews>
      </div>
    )
  }
}

AuthTabContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  consumerData: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(AuthTabContainer)
