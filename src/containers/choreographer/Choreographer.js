import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ModalContainer from '../../components/Modals/ModalContainer/ModalContainer'
import { hideModal, showModal } from '../../actions/modal'
import {
  getAllChoreographerData,
  createPlan,
  deletePlan, sessionStart
} from '../../actions/choreographer'
import CustomButton from '../../components/CustomButtons/Button'
import AddIcon from '@material-ui/icons/Add'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import ChoreographerTabContainer from './ChoreographerTabContainer'

const styles = theme => ({
  root: {
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: '10px'
  }
})

class Choreographer extends Component {
  componentDidMount() {
    this.props.getAllChoreographerData()
  }

  handleAddPlanClick = () => {
    this.props.showModal(
      {
        open: true,
        closeModal: this.props.hideModal,
        createPlan: this.props.createPlan
      },
      'ChoreographerDialog'
    )
  }

  handlePlanDeleteClick = planId => {
    this.props.deletePlan(planId)
  }

  handlePlanPlayClick = planIds => {
    this.props.playPlan(planIds)
  }

  render() {
    const { choreographer, classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
          <CustomButton color="primary">
            <PlayArrowIcon />
            Play
          </CustomButton>
          <CustomButton color="primary" onClick={this.handleAddPlanClick}>
            <AddIcon />
            Add
          </CustomButton>
        </div>
        <ChoreographerTabContainer
          data={choreographer.data}
          deletePlan={this.handlePlanDeleteClick}
          playPlan={this.handlePlanPlayClick}
        />
        <ModalContainer />
      </div>
    )
  }
}

Choreographer.propTypes = {
  choreographer: PropTypes.object.isRequired,
  getAllChoreographerData: PropTypes.func.isRequired,
  createPlan: PropTypes.func.isRequired,
  deletePlan: PropTypes.func.isRequired,
  playPlan: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { choreographer } = state
  return { choreographer }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllChoreographerData: () => {
      dispatch(getAllChoreographerData())
    },
    createPlan: data => {
      dispatch(createPlan(data))
    },
    deletePlan: planId => {
      dispatch(deletePlan(planId))
    },
    playPlan: planIds => {
      dispatch(sessionStart(planIds))
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    showModal: (modalProps, modalType) => {
      dispatch(showModal({ modalProps, modalType }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Choreographer))
