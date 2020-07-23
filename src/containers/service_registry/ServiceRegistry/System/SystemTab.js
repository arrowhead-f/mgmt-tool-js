import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import SystemTable from './SystemTable'

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
  {
    id: 'serviceDefinition',
    disablePadding: false,
    label: 'Service Definition'
  },
  { id: 'interfaces', disablePadding: false, label: 'Interface' },
  { id: 'serviceUri', disablePadding: false, label: 'Service URI' },
  { id: 'actions', disablePadding: false, label: 'Actions', disableSort: true }
]

class SystemTab extends Component {
  render() {
    const {
      systemData,
      classes,
      handleServiceDelete,
      handleServiceEdit
    } = this.props
    return (
      <div className={classes.root}>
        {systemData.map(systemEntry => {
          return (
            <ExpansionPanel key={systemEntry.systemId}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {systemEntry.systemName}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.child}>
                <Typography>
                  <b>Address:</b> {systemEntry.address}
                </Typography>
                <Typography>
                  <b>Port:</b> {systemEntry.port}
                </Typography>
                <Typography>
                  <b>Authentication Info:</b>{' '}
                  {systemEntry.authenticationInfo || '-'}
                </Typography>
                <SystemTable
                  data={systemEntry.services}
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

SystemTab.propTypes = {
  systemData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handleServiceEdit: PropTypes.func.isRequired,
  handleServiceDelete: PropTypes.func.isRequired
}

export default withStyles(styles)(SystemTab)
