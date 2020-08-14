/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2020. 08. 14.
 */

import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles/'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography'
import Button from '../../CustomButtons/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

const styles = theme => ({formControl: {
    margin: theme.spacing(3),
    buttonStyle: {
      width: '440px',
      marginLeft: '10px'
    }
  }})

class ChoreographerPlayDialog extends Component {
  constructor(props){
    super(props)

    this.state = {}
  }

  handleCheckBoxStateChange = event => {
    console.log(event.target)
    console.log(this.state)
    this.setState({...this.state, [event.target.name]: event.target.checked})
  }

  isButtonDisabled = () => {
    for (const [key, value] of Object.entries(this.state)) {
      if(value){
        return false
      }
    }
    return true
  }

  handleButtonClick = () => {
    let selectedPlans = []
    for (const [key, value] of Object.entries(this.state)) {
      if(value){
        selectedPlans.push({id: Number(key)})
      }
    }

    this.props.playPlan(selectedPlans)
  }

  render() {
    const { classes, plans } = this.props
    console.log('classes', classes)
    return (
      <div>
      <Card
        raised
        style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '10px',
              width: '440px'
            }}>
        <Typography
          variant="h5"
          align="center"
          style={{ paddingTop: '10px' }}
        >
          Plans
        </Typography>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            {plans.map(plan => {
              return (
                <FormControlLabel key={plan.id} control={<Checkbox checked={this.state[plan.id] ? this.state[plan.id] : false} onChange={this.handleCheckBoxStateChange} name={plan.id.toString()}/>}
                                  label={plan.name} />
              )
            })}
          </FormGroup>
          <FormHelperText>Select one or more</FormHelperText>
        </FormControl>
      </Card>
        <Button
          disabled={this.isButtonDisabled()}
          color="primary"
          onClick={this.handleButtonClick}
          style={{
            width: '440px',
            marginLeft: '10px'
          }}
        >
          <PlayArrowIcon /> Execute
        </Button>
      </div>
    )
  }
}

ChoreographerPlayDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  playPlan: PropTypes.func.isRequired,
  plans: PropTypes.array.isRequired
}

export default withStyles(styles)(ChoreographerPlayDialog)
