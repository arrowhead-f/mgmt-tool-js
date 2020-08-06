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
    this.state = {
      serviceRegistry: store.get('serviceRegistry'),
      authorization: store.get('authorization'),
      orchestrator: store.get('orchestrator'),
      choreographer: store.get('choreographer')
    }
  }

  handleSRAddressChange = event => {
    this.setState({ serviceRegistry: event.target.value })
  }

  handleAuthAddressChange = event => {
    this.setState({ authorization: event.target.value })
  }

  handleOrchAddressChange = event => {
    this.setState({ orchestrator: event.target.value })
  }

  handleCHAddressChange = event => {
    this.setState({ choreographer: event.target.value })
  }

  handleSave = () => {
    store.set('serviceRegistry', this.state.serviceRegistry)
    store.set('authorization', this.state.authorization)
    store.set('orchestrator', this.state.orchestrator)
    store.set('choreographer', this.state.choreographer)
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
        <TextField
          id="authorization"
          required
          onChange={this.handleAuthAddressChange}
          label="Authorization Address"
          placeholder="https://arrowhead.tmit.bme.hu:8445"
          className={classes.input}
          defaultValue={this.state.authorization}
        />
        <TextField
          id="orchestrator"
          required
          onChange={this.handleOrchAddressChange}
          label="Orchestrator Address"
          placeholder="https://arrowhead.tmit.bme.hu:8441"
          className={classes.input}
          defaultValue={this.state.orchestrator}
        />
        <TextField
          id="choreographer"
          required
          onChange={this.handleCHAddressChange}
          label="Choreographer Address"
          placeholder="https://arrowhead.tmit.bme.hu:8457"
          className={classes.input}
          defaultValue={this.state.choreographer}
        />
        <Button
          disabled={ this.state.serviceRegistry === '' || this.state.authorization === '' || this.state.orchestrator === '' || this.state.choreographer === '' }
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
