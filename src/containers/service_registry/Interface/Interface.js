/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2020. 07. 16.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '../../../components/CustomButtons/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'
import EnhancedTableHead from '../../../components/Table/EnhancedTableHead'
import { hideModal, showModal } from '../../../actions/modal'
import { getSorting } from '../../../utils/utils'
import { connect } from 'react-redux'
import { getInterfaces, deleteInterface } from '../../../actions/serviceRegistry'
import ModalContainer from '../../../components/Modals/ModalContainer/ModalContainer'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    tableLayout: 'auto',
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  tableCell: {
    maxWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  tableHead: {
    textAlign: 'center'
  },
  actionCell: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

const columnData = [
  {
    id: 'interfaceName',
    disablePadding: false,
    label: 'Interface',
    alignCenter: true
  },
  { id: 'createdAt', disablePadding: false, label: 'Created at',
    alignCenter: true },
  { id: 'updatedAt', disablePadding: false, label: 'Updated at',
    alignCenter: true },
  { id: 'actions', disablePadding: false, label: 'Actions', disableSort: true,
    alignCenter: true }
]

class Interface extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: 'asc',
      orderBy: 'interfaceName',
      page: 0,
      rowsPerPage: 10
    }
  }

  componentDidMount() {
    this.props.getInterfaces()
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  handleInterfaceEdit = interfaceData => () => {
    this.props.showModal({
      open:true,
      isEdit: true,
      data: interfaceData,
      closeModal: this.props.hideModal
    }, 'addInterfaceDialog')
  }

  handleInterfaceDelete = id => () => {
    this.props.deleteInterface(id)
  }

  handleAddInterfaceClick = () => {
    this.props.showModal({
      open:true,
      closeModal: this.props.hideModal
    }, 'addInterfaceDialog')
  }

  render(){
    const { classes, interfaces } = this.props
    const { order, orderBy, rowsPerPage, page } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
          <Button color="primary" onClick={this.handleAddInterfaceClick}>
            <AddIcon /> Add
          </Button>
        </div>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <EnhancedTableHead className={classes.tableHead} onRequestSort={this.handleRequestSort} order={order} orderBy={orderBy} columnData={columnData}
                                 rowCount={interfaces.lenfth} />
              <TableBody>
                {interfaces.sort(getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    return (
                      <TableRow hover key={n.id}>
                        <TableCell className={classes.tableCell}>{n.interfaceName}</TableCell>
                        <TableCell className={classes.tableCell}>{n.createdAt}</TableCell>
                        <TableCell className={classes.tableCell}>{n.updatedAt}</TableCell>
                        <TableCell className={classes.tableCell}>
                          <IconButton
                            color="secondary"
                            aria-label="Edit Service"
                            onClick={this.handleInterfaceEdit(n)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="secondary" aria-label="Delete Service" onClick={this.handleInterfaceDelete(n.id)}
                                      ><ClearIcon />
                          </IconButton>

                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={interfaces.length}
            backIconButtonProps={{'aria-label': 'Previous Page'}}
            nextIconButtonProps={{'aria-label': 'Next Page'}}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Paper>
        <ModalContainer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { services } = state

  return { interfaces: services.interfaces}
}

function mapDispatchToProps(dispatch) {
  return {
    getInterfaces: () => {
      dispatch(getInterfaces())
    },
    deleteInterface: interfaceId => {
      dispatch(deleteInterface(interfaceId))
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    showModal: (modalProps, modalType) => {
      dispatch(showModal({modalProps, modalType}))
    }
  }
}

Interface.propTypes = {
  classes: PropTypes.object.isRequired,
  interfaces: PropTypes.array.isRequired,
  getInterfaces: PropTypes.func.isRequired,
  deleteInterface: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Interface))
