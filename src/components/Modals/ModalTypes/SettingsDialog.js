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
import { coreSystemList } from '../../../utils/enums/coreSystemList'
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
      serviceRegistry: store.get(coreSystemList.serviceRegistry),
      authorization: store.get(coreSystemList.authorization),
      orchestrator: store.get(coreSystemList.orchestrator),
      choreographer: store.get(coreSystemList.choreographer),
      gatekeeper: store.get(coreSystemList.gatekeeper),
      gateway: store.get(coreSystemList.gateway),
      eventHandler: store.get(coreSystemList.eventHandler),
      systemRegistry: store.get(coreSystemList.systemRegistry),
      deviceRegistry: store.get(coreSystemList.deviceRegistry),
      qosMonitor: store.get(coreSystemList.qosMonitor)
    }
  }

  handleAddressChange = type => event => {
    console.log(this.state)
    this.setState({ [type]: event.target.value })
  }

  handleSave = () => {
    for(const [key, value] of Object.entries(this.state)) {
      store.set(key, value)
    }
    this.props.closeModal()
  }

  isButtonDisabled = () => {
    /*
    strict check, every field must be provided

    for (const [key, value] of Object.entries(this.state)) {
      if(!value){
        return false
      }
    }
    return true
    */
    return false
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
          onChange={this.handleAddressChange(coreSystemList.serviceRegistry)}
          label="Service Registry Address"
          placeholder="https://arrowhead.tmit.bme.hu:8443"
          className={classes.input}
          defaultValue={this.state.serviceRegistry}
          />
        <TextField
          id="authorization"
          required
          onChange={this.handleAddressChange(coreSystemList.authorization)}
          label="Authorization Address"
          placeholder="https://arrowhead.tmit.bme.hu:8445"
          className={classes.input}
          defaultValue={this.state.authorization}
        />
        <TextField
          id="orchestrator"
          required
          onChange={this.handleAddressChange(coreSystemList.orchestrator)}
          label="Orchestrator Address"
          placeholder="https://arrowhead.tmit.bme.hu:8441"
          className={classes.input}
          defaultValue={this.state.orchestrator}
        />
        <TextField
          id="choreographer"
          required
          onChange={this.handleAddressChange(coreSystemList.choreographer)}
          label="Choreographer Address"
          placeholder="https://arrowhead.tmit.bme.hu:8457"
          className={classes.input}
          defaultValue={this.state.choreographer}
        />


        <TextField
          id={coreSystemList.gatekeeper}
          required
          onChange={this.handleAddressChange(coreSystemList.gatekeeper)}
          label="Gatekeeper Address"
          placeholder="https://arrowhead.tmit.bme.hu:8449"
          className={classes.input}
          defaultValue={this.state.gatekeeper}
        />
        <TextField
          id={coreSystemList.gateway}
          required
          onChange={this.handleAddressChange(coreSystemList.gateway)}
          label="Gateway Address"
          placeholder="https://arrowhead.tmit.bme.hu:8453"
          className={classes.input}
          defaultValue={this.state.gateway}
        />
        <TextField
          id={coreSystemList.eventHandler}
          required
          onChange={this.handleAddressChange(coreSystemList.eventHandler)}
          label="Event Handler Address"
          placeholder="https://arrowhead.tmit.bme.hu:8455"
          className={classes.input}
          defaultValue={this.state.eventHandler}
        />
        <TextField
          id={coreSystemList.systemRegistry}
          required
          onChange={this.handleAddressChange(coreSystemList.systemRegistry)}
          label="System Registry Address"
          placeholder="https://arrowhead.tmit.bme.hu:8437"
          className={classes.input}
          defaultValue={this.state.systemRegistry}
        />
        <TextField
          id={coreSystemList.deviceRegistry}
          required
          onChange={this.handleAddressChange(coreSystemList.deviceRegistry)}
          label="Device Registry Address"
          placeholder="https://arrowhead.tmit.bme.hu:8439"
          className={classes.input}
          defaultValue={this.state.deviceRegistry}
        />
        <TextField
          id={coreSystemList.qosMonitor}
          required
          onChange={this.handleAddressChange(coreSystemList.qosMonitor)}
          label="QoS Monitor Address"
          placeholder="https://arrowhead.tmit.bme.hu:8451"
          className={classes.input}
          defaultValue={this.state.qosMonitor}
        />

        <Button
          disabled={this.isButtonDisabled()}
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
