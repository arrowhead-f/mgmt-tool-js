import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ServiceTab from './Service/ServiceTab'
import SystemTab from './System/SystemTab'

const styles = theme => ({})

class ServiceRegistryTabContainer extends Component {
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
    const {
      theme,
      serviceData,
      systemData,
      handleServiceDelete,
      handleServiceEdit
    } = this.props
    const { value } = this.state
    return (
      <div>
        <AppBar position="static" style={{ background: '#004676' }}>
          <Tabs value={value} onChange={this.handleChange} variant="fullWidth">
            <Tab label="Service" />
            <Tab label="System" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <ServiceTab
            dir={theme.direction}
            serviceData={serviceData}
            handleServiceEdit={handleServiceEdit}
            handleServiceDelete={handleServiceDelete}
          />
          <SystemTab
            dir={theme.direction}
            systemData={systemData}
            handleServiceEdit={handleServiceEdit}
            handleServiceDelete={handleServiceDelete}
          />
        </SwipeableViews>
      </div>
    )
  }
}

//

ServiceRegistryTabContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  serviceData: PropTypes.array.isRequired,
  systemData: PropTypes.array.isRequired,
  handleServiceEdit: PropTypes.func.isRequired,
  handleServiceDelete: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(
  ServiceRegistryTabContainer
)
