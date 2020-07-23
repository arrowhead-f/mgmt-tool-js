import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import * as PropTypes from 'prop-types'
import Button from '../../../components/CustomButtons/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles/'
import { createSystem, editSystem } from '../../../actions/serviceRegistry'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    display: 'flex',
    width: '400px'
  },
  input: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '400px'
  }
})

class AddSystem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.data ? props.data.id : undefined,
      systemName: props.data ? props.data.systemName : '',
      address: props.data ? props.data.address : '',
      port: props.data ? props.data.port : '',
      authenticationInfo: props.data ? props.data.authenticationInfo : ''
    }
  }

  handleSystemNameOnChange = event => {
    this.setState({ systemName: event.target.value })
  }

  handleAddressOnChange = event => {
    this.setState({ address: event.target.value })
  }

  handlePortOnChange = event => {
    if (
      event.target.value === '' ||
      (event.target.value > 0 && event.target.value <= 65536)
    ) {
      this.setState({ port: event.target.value })
    }
  }

  handleAuthenticationInfoOnChange = event => {
    this.setState({ authenticationInfo: event.target.value })
  }

  handleAddSystemButtonClick = () => {
    if(this.props.isEdit) {
      this.props.editSystem(
        this.state.id,
        this.state.systemName,
        this.state.address,
        this.state.port,
        this.state.authenticationInfo)
    } else {
      this.props.createSystem(
        this.state.systemName,
        this.state.address,
        this.state.port,
        this.state.authenticationInfo)
    }
    this.props.closeModal()
  }

  render() {
    const { classes, isEdit = false } = this.props
    return (
      <Card
        raised
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '10px',
          width: '440px'
        }}
      >
        <Typography
          variant="h5"
          align="center"
          style={{ paddingTop: '10px' }}
        >
          System Details
        </Typography>
        <TextField
          value={this.state.systemName}
          id="system_name"
          required
          onChange={this.handleSystemNameOnChange}
          label="System Name"
          className={classes.input}
        />
        <TextField
          value={this.state.address}
          id="system_address"
          required
          onChange={this.handleAddressOnChange}
          label="Address"
          className={classes.input}
        />
        <TextField
          value={this.state.port}
          id="port"
          required
          onChange={this.handlePortOnChange}
          label="Port"
          className={classes.input}
          type="number"
          inputProps={{
            min: '1',
            max: '65535'
          }}
        />
        <TextField
          value={this.state.authenticationInfo}
          id="authentication_info"
          onChange={this.handleAuthenticationInfoOnChange}
          label="Authentication Info"
          className={classes.input}
          inputProps={{
            'aria-label': 'Description'
          }}
        />
        <Button
          disabled={
            this.state.systemName === '' ||
            this.state.address === '' ||
            this.state.port === ''
          }
          color="primary"
          onClick={this.handleAddSystemButtonClick}
          style={{
            width: '400px',
            marginLeft: '20px',
            marginRight: '20px',
            marginBottom: '20px'
          }}
        >
          {isEdit ? (
            <p><EditIcon /> Edit System</p>
          ) : (<p><AddIcon /> Add System</p>)}
        </Button>
      </Card>
    )
  }
}

AddSystem.propTypes = {
  classes: PropTypes.object.isRequired,
  createSystem: PropTypes.func.isRequired,
  editSystem: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}

function mapStateToProps(dispatch) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    createSystem: (systemName, address, port, authenticationInfo) => {
      dispatch(createSystem({systemName, address, port, authenticationInfo}))
    },
    editSystem: (systemId, systemName, address, port, authenticationInfo) => {
      dispatch(editSystem(systemId, systemName, address, port, authenticationInfo))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddSystem))
