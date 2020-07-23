import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import * as PropTypes from 'prop-types'
import Button from '../../../components/CustomButtons/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles/'
import { addService, editService } from '../../../actions/serviceRegistry'
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

class AddService extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.data ? props.data.id : undefined,
      serviceDefinition: props.data ? props.data.serviceDefinition : ''
    }
  }

  handleServiceDefinitionOnChange = event => {
    this.setState({ serviceDefinition: event.target.value })
  }

  handleAddServiceButtonClick = () => {
    if(this.props.isEdit) {
      this.props.editService(this.state.id, this.state.serviceDefinition)
    } else {
      this.props.addService(this.state.serviceDefinition)
    }
    this.props.closeModal()
  }

  render() {
    const { classes, isEdit } = this.props
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
          Service Details
        </Typography>
        <TextField
          value={this.state.serviceDefinition}
          id="serviceDefinition"
          required
          onChange={this.handleServiceDefinitionOnChange}
          label="ServiceDefinition"
          className={classes.input}
        />
        <Button
          disabled={this.state.serviceDefinition === ''}
          color="primary"
          onClick={this.handleAddServiceButtonClick}
          style={{
            width: '400px',
            marginLeft: '20px',
            marginRight: '20px',
            marginBottom: '20px'
          }}
        >
          {isEdit ? (
            <p><EditIcon /> Edit Service</p>
          ) : (<p><AddIcon /> Add Service</p>)}
        </Button>
      </Card>
    )
  }
}

AddService.propTypes = {
  classes: PropTypes.object.isRequired,
  addService: PropTypes.func.isRequired,
  isEdit: PropTypes.bool
}

function mapStateToProps(dispatch) {}

function mapDispatchToProps(dispatch) {
  return {
    addService: serviceDefinition => {
      dispatch(addService({serviceDefinition}))
    },
    editService: (serviceId, serviceDefinition) => {
      dispatch(editService(serviceId, serviceDefinition))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddService))
