import React, {Component} from 'react'
import * as PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {
    getFilteredServices,
    deleteServiceById,
    editSREntry,
    addSREntry,
    getServiceRegistryEntriesView,
  echo
} from '../../../actions/serviceRegistry'
import Button from '../../../components/CustomButtons/Button'
import ModalContainer from '../../../components/Modals/ModalContainer/ModalContainer'
import {hideModal, showModal} from '../../../actions/modal'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import _ from 'lodash'
import {red} from '@material-ui/core/colors'
import ServiceRegistryTabContainer from './ServiceRegistryTabContainer'

const styles = theme => ({
    root: {
        width: '100%',
        paddingBottom: '10px',
        paddingLeft: '5px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightMedium
    },
    child: {
        display: 'flex',
        flexDirection: 'column'
    },
    removeButton: {
        color: 'white',
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700]
        }
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4
    },
    grid: {
        marginBottom: '10px'
    },
    buttonMargin: {
        marginLeft: '10px',
        marginRight: '10px'
    },
    title: {
        paddingRight: '14px',
        display: 'flex',
        alignItems: 'center'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})

class ServiceRegistry extends Component {
    componentDidMount() {
        this.props.echo()
        this.props.getServiceRegistryEntries()
    }

    state = {
        switchState: false,
        open: false
    }

    handleAddClick = () => {
        this.props.showModal(
            {
                open: true,
                addSREntry: this.props.addSREntry,
                closeModal: this.props.hideModal
            },
            'addSREntry'
        )
    }

    handleServiceSearchClick = () => {
        this.props.showModal(
            {
                open: true,
                queryData: this.props.services.queryData,
                closeModal: this.props.hideModal
            },
            'serviceSearch'
        )
    }

    handleServiceSearchClearClick = () => {
        this.props.getServices()
    }

    handleServiceDelete = serviceId => () => {
        this.props.deleteServiceById(serviceId)
    }

    handleServiceEdit = serviceData => () => {
        this.props.showModal(
            {
                open: true,
                isEdit: true,
                data: serviceData,
                editSREntry: this.props.editSREntry,
                closeModal: this.props.hideModal
            },
            'addSREntry'
        )
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        const {classes, services} = this.props
        return (
            <div className={classes.root}>
                <div className={classes.buttonContainer}>
                    {/* {!_.isEmpty(services.queryData) && (
                        <Button
                            color="primary"
                            className={classes.removeButton}
                            onClick={this.handleServiceSearchClearClick}
                        >
                            <ClearIcon/>
                            Clear Filter
                        </Button>
                    )}
                    <Button
                        color="primary"
                        onClick={this.handleServiceSearchClick}
                        className={classes.buttonMargin}
                    >
                        <SearchIcon/>
                        Search
                    </Button>*/}
                    <Button color="primary" onClick={this.handleAddClick}>
                        <AddIcon/>
                        Add
                    </Button>
                </div>
                <ServiceRegistryTabContainer
                    systemData={services.groupBySystems}
                    serviceData={services.groupByServices}
                    handleServiceDelete={this.handleServiceDelete}
                    handleServiceEdit={this.handleServiceEdit}
                />
                <ModalContainer/>
            </div>
        )
    }
}

ServiceRegistry.propTypes = {
    classes: PropTypes.object.isRequired,
    getServiceRegistryEntries: PropTypes.func.isRequired,
    services: PropTypes.object.isRequired,
    hideModal: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    editSREntry: PropTypes.func.isRequired,
    deleteServiceById: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {services} = state
    return {services}
}

function mapDispatchToProps(dispatch) {
    return {
        echo: () => {
            dispatch(echo())
        },
        getServiceRegistryEntries: () => {
            dispatch(getServiceRegistryEntriesView())
        },
        getFilteredServices: queryData => {
            dispatch(getFilteredServices(queryData))
        },
                hideModal: () => {
                    dispatch(hideModal())
                },
                showModal: (modalProps, modalType) => {
                    dispatch(showModal({modalProps, modalType}))
                },
        deleteServiceById: serviceId => {
            dispatch(deleteServiceById(serviceId))
        },
        editSREntry: entry => {
            dispatch(editSREntry(entry))
        },
        addSREntry: entry => {
            dispatch(addSREntry(entry))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ServiceRegistry))
