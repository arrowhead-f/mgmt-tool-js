import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { getServices } from '../../../actions/serviceRegistry'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Button from '../../CustomButtons/Button'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import AutoCompleteMulti from '../../AutoCompleteMulti/AutoCompleteMulti'
import AutoCompleteSingle from '../../AutoCompleteSingle/AutoCompleteSingle'

const styles = theme => ({
  input: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '400px'
  },
  inputSmall: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '380px'
  },
  inputSmall2: {
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '360px'
  },
  prop: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  propKey: {
    width: '40%',
    marginLeft: '20px',
    marginRight: theme.spacing.unit * 2,
    marginBottom: '10px'
  },
  propValue: {
    width: '40%',
    marginRight: '20px',
    marginBottom: '10px'
  },
  fabStyle: {
    marginLeft: '20px',
    marginBottom: '20px'
  },
  wrapper: {
    position: 'relative',
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 8
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    width: '440px'
  },
  cardDiv: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    width: '420px',
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.5)",
    borderRadius: '3px',
    background: '#ddd'
  },
  cardDiv2: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    width: '400px',
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.5)",
    borderRadius: '3px',
    background: '#fff'
  },
  cardSmall: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    width: '420px'
  },
  buttonStyle: {
    width: '440px',
    marginLeft: '10px'
  }
})

class ChoreographerDialog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      firstActionName: '',
      actions: [
        {
          name: '',
          steps: [
            {
              name: '',
              serviceName: '',
              metadata: '',
              parameters: '',
              quantity: ''
            }
          ]
        }
      ]
    }
  }

  componentDidMount() {
    this.props.getServices()
  }

  handlePlanNameChange = event => {
    this.setState({ name: event.target.value })
  }



  handleActionNameChange = index => event => {
    const tmpArr = [...this.state.actions]
    tmpArr[index].name = event.target.value
    this.setState({actions: [...tmpArr]})
  }

  handleNextActionNameChange = index => value => {
    const tmpArray = [...this.state.actions]
    tmpArray[index].nextActionName = value.name
    this.setState({actions: tmpArray})
  }

  handleActionFab = () => {
    const emptyAction = {
      name: '',
        steps: [
        {
          name: '',
          serviceName: '',
          metadata: '',
          parameters: '',
          quantity: ''
        }
      ]
    }
    this.setState({
      actions: [...this.state.actions, emptyAction]
    })
  }

  handleStepFab = actionIndex => () => {
    const emptyStep = {
      name: '',
      serviceName: '',
      metadata: '',
      parameters: '',
      quantity: ''
    }
    const tmpArray = [...this.state.actions]
    tmpArray[actionIndex].steps = [...tmpArray[actionIndex].steps, emptyStep]
    this.setState({
      actions: [...tmpArray]
    })
  }

  handleButtonClick = () => {
    this.props.createPlan(this.state)
  }

  handleNextStepsChange = (actionIndex, stepIndex) => value => {
    const stringArray = value.map(item => item.name)
    const tmpArray = [...this.state.actions]
    tmpArray[actionIndex].steps[stepIndex].nextStepNames = [...stringArray]
    this.setState({ actions: tmpArray })
  }

  handleFirstStepsChange = index => value => {
    const stringArray = value.map(item => item.name)
    const tmpArray = [...this.state.actions]
    tmpArray[index].firstStepNames = [...stringArray]
    this.setState({ actions: tmpArray })
  }

  handleFirstActionNameChange = value => {
    this.setState({firstActionName: value.name})
  }

  handleServicesChange = index => value => {
    const stringArray = value.map(service => service.serviceDefinition)
    const tmpArray = [...this.state.actions]
    tmpArray[index].services = [...stringArray]
    this.setState({ steps: tmpArray })
  }

  handleStepServiceNameChange = (actionIndex, stepIndex) => event => {
    const tmpArray = [...this.state.actions]
    tmpArray[actionIndex].steps[stepIndex].serviceName = event.target.value
    this.setState({ actions: tmpArray})
  }

  handleQuantityChange = (actionIndex, stepIndex) => event => {
    const tmpArray = [...this.state.actions]
    tmpArray[actionIndex].steps[stepIndex].quantity = event.target.value
    this.setState({ actions: tmpArray})
  }

  handleParameterChange = (actionIndex, stepIndex) => event => {
    const tmpArray = [...this.state.actions]
    tmpArray[actionIndex].steps[stepIndex].parameters = event.target.value
    this.setState({ actions: tmpArray})
  }

  handleMetadataChange = (actionIndex, stepIndex) => event => {
    const tmpArray = [...this.state.actions]
    tmpArray[actionIndex].steps[stepIndex].metadata = event.target.value
    this.setState({ actions: tmpArray})
  }

  handleStepNameChange = (actionIndex, stepIndex) => event => {
    const tmpArray = [...this.state.actions]
    tmpArray[actionIndex].steps[stepIndex].name = event.target.value
    this.setState({ actions: tmpArray})
  }

  isAddbuttonDisabled = () => {
    for (const action of this.state.actions) {
      for(const step of action.steps){
        if (step.serviceName.length === 0) {
          return true
        }
      }
    }
    return false
  }

  render() {
    const { classes, services } = this.props
    return (
      <div>
        <Card raised className={classes.card}>
          <Typography
            variant="h5"
            align="center"
            style={{ paddingTop: '10px' }}
          >
            Plan Details
          </Typography>
          <TextField
            value={this.state.name}
            className={classes.input}
            required
            label="Name"
            onChange={this.handlePlanNameChange}
          />
          <AutoCompleteSingle
            required
            handleOnChange={this.handleFirstActionNameChange}
            label="First Action"
            placeholder="Fist Action"
            keyValue="name"
            suggestions={this.state.actions}
            classes={{
              inputRoot: { flexWrap: 'wrap' },
              textField: {
                width: '400px',
                marginTop: '20px',
                marginLeft: '20px'
              }
            }}
          />
        </Card>
        <Card raised className={classes.card}>
          <Typography
            variant="h5"
            align="center"
            style={{ paddingTop: '10px' }}
          >
            Actions
          </Typography>
          <div>
            {
              this.state.actions.map(({name, actionName, steps}, actionIndex) => {
                return (
                  <div className={classes.cardDiv} key={actionIndex}>
                    <TextField
                      label="Name"
                      value={name}
                      className={classes.inputSmall}
                      onChange={this.handleActionNameChange(actionIndex)}
                    />
                    <AutoCompleteSingle
                      classes={{
                        inputRoot: { flexWrap: 'wrap' },
                        textField: {
                          width: '400px',
                          marginTop: '20px',
                          marginLeft: '20px'
                        }
                      }}
                      handleOnChange={this.handleNextActionNameChange(actionIndex)}
                      label="Next Action"
                      keyValue="name"
                      suggestions={this.state.actions}
                    />
                    <AutoCompleteMulti
                      handleOnChange={this.handleFirstStepsChange(actionIndex)}
                      label="First Steps"
                      keyValue="name"
                      suggestions={this.state.actions[actionIndex].steps}
                    />
                    <Typography
                      variant="h6"
                      align="center"
                      style={{ paddingTop: '10px' }}
                    >
                      Steps
                    </Typography>
                    <div>
                      {
                        this.state.actions[actionIndex].steps.map(({name, quantity, metadata, serviceName, parameters, nextStepNames}, stepIndex) => {
                          return (
                            <div className={classes.cardDiv2} key={stepIndex}>
                              <TextField
                                onChange={this.handleStepNameChange(actionIndex, stepIndex)}
                                label="Name"
                                value={name}
                                className={classes.inputSmall2}
                                />
                              <AutoCompleteMulti
                                handleOnChange={this.handleNextStepsChange(actionIndex, stepIndex)}
                                label="Next Steps"
                                keyValue="name"
                                suggestions={this.state.actions[actionIndex].steps}
                              />
                              <TextField
                                onChange={this.handleStepServiceNameChange(actionIndex, stepIndex)}
                                label="Service"
                                value={serviceName}
                                className={classes.inputSmall2}
                              />
                              <TextField
                                onChange={this.handleQuantityChange(actionIndex, stepIndex)}
                                label="Quantity"
                                value={quantity}
                                type="number"
                                inputProps={{
                                  min: '1'
                                }}
                                className={classes.inputSmall2}
                              />
                              <TextField
                                onChange={this.handleMetadataChange(actionIndex, stepIndex)}
                                label="Metadata"
                                value={metadata}
                                className={classes.inputSmall2}
                              />
                              <TextField
                                onChange={this.handleParameterChange(actionIndex, stepIndex)}
                                label="Parameters"
                                value={parameters}
                                className={classes.inputSmall2}
                              />
                            </div>
                          )
                        })
                      }
                      <Fab
                        className={classes.fabStyle}
                        size="small"
                        color="secondary"
                        aria-label="Add"
                        onClick={this.handleStepFab(actionIndex)}
                      >
                        <AddIcon />
                      </Fab>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <Fab
            className={classes.fabStyle}
            size="small"
            color="secondary"
            aria-label="Add"
            onClick={this.handleActionFab}
          >
            <AddIcon />
          </Fab>
        </Card>
        <Button
          disabled={this.isAddbuttonDisabled()}
          color="primary"
          onClick={this.handleButtonClick}
          className={classes.buttonStyle}
        >
          Add
        </Button>
      </div>
    )
  }
}

ChoreographerDialog.propTypes = {
  services: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  createPlan: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { services } = state

  return { services: services.services }
}

export default connect(
  mapStateToProps,
  { getServices }
)(withStyles(styles)(ChoreographerDialog))
