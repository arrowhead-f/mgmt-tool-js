import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import ServiceTable from './ServiceTable'

const styles = theme => ({
  root: {
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium
  },
  child: {
    display: 'flex',
    flexDirection: 'column'
  }
})

const columnData = [
  { id: 'systemName', disablePadding: false, label: 'System Name' },
  { id: 'address', disablePadding: false, label: 'Address' },
  { id: 'port', disablePadding: false, label: 'Port' },
  { id: 'interface', disablePadding: false, label: 'Interface' },
  { id: 'secure', disablePadding: false, label: 'Security Info' },
  { id: 'serviceUri', disablePadding: false, label: 'Service URI' },
  { id: 'version', disablePadding: false, label: 'Service Version' },
  { id: 'actions', disablePadding: false, label: 'Actions', disableSort: true }
]

class ServiceTab extends Component {
  render() {
    const {
      serviceData,
      classes,
      handleServiceDelete,
      handleServiceEdit
    } = this.props

    return (
      <div className={classes.root}>
        {serviceData.map(serviceEntry => {
          return (
            <ExpansionPanel key={serviceEntry.serviceDefinitionId}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {serviceEntry.serviceDefinition}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.child}>
                <ServiceTable
                  data={serviceEntry.providerServices}
                  columnData={columnData}
                  handleServiceEdit={handleServiceEdit}
                  handleServiceDelete={handleServiceDelete}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
      </div>
    )
  }
}

ServiceTab.propTypes = {
  serviceData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handleServiceEdit: PropTypes.func.isRequired,
  handleServiceDelete: PropTypes.func.isRequired
}

export default withStyles(styles)(ServiceTab)
