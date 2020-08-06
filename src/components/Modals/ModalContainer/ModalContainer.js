import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { connect } from 'react-redux'
import AddModal from '../ModalTypes/AddModal'
import ServiceSearchModal from '../ModalTypes/ServiceSearch'
import AddSREntry from '../ModalTypes/AddSREntry'
import AddAuthEntry from '../ModalTypes/AddAuthEntry'
import AddCloud from '../ModalTypes/AddCloud'
import AddRelay from '../ModalTypes/AddRelay'
import EventHandlerDialog from '../ModalTypes/EventHandler'
import InterCloudDialog from '../ModalTypes/InterCloudDialog'
import OrchStoreDialog from '../ModalTypes/OrchStoreDialog'
import AddSystem from '../ModalTypes/AddSystem'
import ChoreographerDialog from '../ModalTypes/ChoreographerDialog'
import SettingsDialog from '../ModalTypes/SettingsDialog'
import AddServiceDialog from '../ModalTypes/AddService'
import AddInterfaceDialog from '../ModalTypes/AddInterface'

const MODAL_TYPES = {
  add: AddModal,
  addSystem: AddSystem,
  serviceSearch: ServiceSearchModal,
  addSREntry: AddSREntry,
  addAuthEntry: AddAuthEntry,
  addNeighborhood: AddCloud,
  addRelay: AddRelay,
  addServiceDialog: AddServiceDialog,
  addInterfaceDialog: AddInterfaceDialog,
  eventHandlerDialog: EventHandlerDialog,
  InterCloudDialog: InterCloudDialog,
  OrchStoreDialog: OrchStoreDialog,
  ChoreographerDialog: ChoreographerDialog,
  settingsDialog: SettingsDialog
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '460px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '10px'
  }
})

class ModalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }

    this.closeModal = this.closeModal.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        modalIsOpen: nextProps.modalProps.open
      })
    }
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    if (!this.props.modalType) {
      return null
    }
    const SpecifiedModal = MODAL_TYPES[this.props.modalType]
    return (
      <Dialog
        open={this.state.modalIsOpen}
        fullScreen={this.props.fullScreen}
        scroll="paper"
        onClose={this.closeModal}
      >
        <DialogContent>
          <SpecifiedModal
            closeModal={this.closeModal}
            {...this.props.modalProps}
          />
        </DialogContent>
      </Dialog>
    )
  }
}

ModalContainer.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object,
  classes: PropTypes.object,
  fullScreen: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  ...state.modal
})

export default connect(
  mapStateToProps,
  null
)(withMobileDialog(styles)(ModalContainer))
