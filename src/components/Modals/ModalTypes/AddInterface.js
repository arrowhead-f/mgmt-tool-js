import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import * as PropTypes from 'prop-types'
import Button from '../../../components/CustomButtons/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles/'
import { addInterface, editInterface } from '../../../actions/serviceRegistry'
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

class AddInterface extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.data ? props.data.id : undefined,
      interfaceName: props.data ? props.data.interfaceName : ''
    }
  }

  handleInterfaceNameChange = event => {
    this.setState({interfaceName: event.target.value.toUpperCase() })
  }

  handleAddInterfaceButtonClick = () => {
    if(this.props.isEdit){
      this.props.editInterface(this.state.id, this.state.interfaceName)
    } else {
      this.props.addInterface(this.state.interfaceName)
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
          Interface Details
        </Typography>
        <TextField
          value={this.state.interfaceName}
          id="interfaceName"
          required
          onChange={this.handleInterfaceNameChange}
          label="interfaceName"
          className={classes.input}
        />
        <Button
          disabled={this.state.interfaceName === ''}
          color="primary"
          onClick={this.handleAddInterfaceButtonClick}
          style={{
            width: '400px',
            marginLeft: '20px',
            marginRight: '20px',
            marginBottom: '20px'
          }}
        >
          {isEdit ? (
            <p><EditIcon /> Edit Interface</p>
          ) : (<p><AddIcon /> Add Interface</p>)}
        </Button>
      </Card>
    )
  }
}

AddInterface.propTypes = {
  classes: PropTypes.object.isRequired,
  addInterface: PropTypes.func.isRequired,
  editInterface: PropTypes.func.isRequired,
  isEdit: PropTypes.bool
}

function mapStateToProps(dispatch) {

}

function mapDispatchToProps(dispatch) {
  return {
    addInterface: interfaceName => {
      dispatch(addInterface({ interfaceName }))
    },
    editInterface: (interfaceId, interfaceName) => {
      dispatch(editInterface(interfaceId, interfaceName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddInterface))
