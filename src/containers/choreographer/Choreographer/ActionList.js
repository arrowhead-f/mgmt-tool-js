/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2020. 08. 13.
 */

import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import StepsList from './StepsList'

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
  },
  row: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  marginRight20: {
    marginRight: '18px'
  }
})

class ActionList extends Component {
  render() {
    const { classes, actions } = this.props
    return (
      <div className={classes.root}>
        {actions.map((action, index) => {
          return (
            <ExpansionPanel key={index}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Action: {action.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.child}>
                <Typography>
                  <b>Next Action:</b>{` ${action.nextActionName ? action.nextActionName: '-'}`}
                </Typography>
                <Typography>
                  <b>Fist steps:</b>{` ${action.firstStepNames && action.firstStepNames.length ? action.firstStepNames.join(', ') : '-'}`}
                </Typography>
                <StepsList steps={action.steps} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
      </div>
    )
  }
}

ActionList.propTypes = {
  actions: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ActionList)
