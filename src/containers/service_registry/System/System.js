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
import { getSystems, deleteSystem } from '../../../actions/serviceRegistry'
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
    id: 'systemName',
    disablePadding: false,
    label: 'System Name',
    alignCenter: true
  },
  { id: 'address', disablePadding: false, label: 'Address',
    alignCenter: true },
  { id: 'port', disablePadding: false, label: 'Port',
    alignCenter: true },
  { id: 'authenticationInfo', disablePadding: false, label: 'Auth info',
    alignCenter: true },
  { id: 'createdAt', disablePadding: false, label: 'Created at',
    alignCenter: true },
  { id: 'updatedAt', disablePadding: false, label: 'Updated at',
    alignCenter: true },
  { id: 'actions', disablePadding: false, label: 'Actions', disableSort: true,
    alignCenter: true }
]

class System extends Component {
  constructor(props) {
    super(props)

    this.state = {
      order: 'asc',
      orderBy: 'systemName',
      page: 0,
      rowsPerPage: 10
    }
  }

  componentDidMount() {
    this.props.getSystems()
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

  handleSystemEdit = system => () => {
    this.props.showModal({
      open: true,
      isEdit: true,
      data: system,
      closeModal: this.props.hideModal
    }, 'addSystem')
  }

  handleSystemDelete = id => () => {
    this.props.deleteSystem(id)
  }

  handleAddSystemClick = () => {
    this.props.showModal(
      {
        open: true,
        closeModal: this.props.hideModal
      },
      'addSystem'
    )
  }

  render(){
    const { classes, systems } = this.props
    const { order, orderBy, rowsPerPage, page } = this.state
    return (
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
            <Button color="primary" onClick={this.handleAddSystemClick}>
                    <AddIcon />
                    Add
          </Button>
      </div>
        <Paper className={classes.root} >
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <EnhancedTableHead
                className={classes.tableHead}
                onRequestSort={this.handleRequestSort}
                order={order}
                orderBy={orderBy}
                rowCount={systems.length}
                columnData={columnData}
              />
              <TableBody>
                {systems.sort(getSorting(order, orderBy)).slice(page * rowsPerPage, page *rowsPerPage + rowsPerPage)
                  .map( (n, index) => {
                    return (
                      <TableRow hover key={n.id}>
                        <TableCell className={classes.tableCell}>{n.systemName}</TableCell>
                        <TableCell className={classes.tableCell}>{n.address}</TableCell>
                        <TableCell className={classes.tableCell}>{n.port}</TableCell>
                        <TableCell className={classes.tableCell}>{n.authenticationInfo ? n.authenticationInfo : '-'}</TableCell>
                        <TableCell className={classes.tableCell}>{n.createdAt}</TableCell>
                        <TableCell className={classes.tableCell}>{n.updatedAt}</TableCell>
                        <TableCell className={classes.actionCell}>
                          <IconButton
                            color="secondary"
                            aria-label="Edit System"
                            onClick={this.handleSystemEdit(n)}
                          >
                            <EditIcon />
                          </IconButton>
                            <IconButton
                              color="secondary"
                              aria-label="Delete System"
                              onClick={this.handleSystemDelete(n.id)}
                              >
                              <ClearIcon />
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
            count={systems.length}
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
  const { system } = state
  return {systems: system.systems}
}

function mapDispatchToProps(dispatch) {
  return {
    getSystems: () => {
      dispatch(getSystems())
    },
    deleteSystem: systemId => {
      dispatch(deleteSystem(systemId))
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    showModal: (modalProps, modalType) => {
      dispatch(showModal({modalProps, modalType}))
    }
  }
}


System.propTypes = {
  classes: PropTypes.object.isRequired,
  systems: PropTypes.array.isRequired,
  getSystems: PropTypes.func.isRequired,
  deleteSystem: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(System))

