/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2020. 07. 10.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import * as PropTypes from 'prop-types'
import Button from '../../../components/CustomButtons/Button'
import Card from '@material-ui/core/Card'
import store from 'store'
import { withStyles } from '@material-ui/core/styles/'

const styles = theme => ({
  root: {
    width: '100%'
  },
  input: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '400px'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    width: '440px'
  },
  button: {
    width: '400px',
    margin: '0 20px 20px 20px'
  }
})

class SettingsDialog extends Component {
  constructor(props) {
    super(props)
    console.log('SRRRRRRRR', store.get('serviceRegistry'))
    this.state = {
      serviceRegistry: store.get('serviceRegistry')
    }

  }

  handleSRAddressChange = event => {
    this.setState({ serviceRegistry: event.target.value })
  }

  handleSave = () => {
    store.set('serviceRegistry', this.state.serviceRegistry)
    this.props.closeModal()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
      <Card
        className={classes.card}
        raised
        >
        <TextField
          id="serviceRegistry"
          required
          onChange={this.handleSRAddressChange}
          label="Service Registry Address"
          placeholder="https://arrowhead.tmit.bme.hu:8443"
          className={classes.input}
          defaultValue={this.state.serviceRegistry}
          />
        <Button
          disabled={ this.state.serviceRegistry === '' }
          color='primary'
          onClick={this.handleSave}
          className={classes.button}
        > Save </Button>
      </Card>
      </div>
    )
  }
}

SettingsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  //TODO ?
  return {}
}

function mapDispatchToProps(dispatch) {
  return { /* TODO ? */ }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SettingsDialog))
