import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'
import EnhancedTableHead from '../../../../components/Table/EnhancedTableHead'
import { getSorting } from '../../../../utils/utils'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 600
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  actionCell: {
    display: 'flex',
    flexDirection: 'row'
  }
})

class SystemTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      order: 'asc',
      orderBy: 'serviceDefinition',
      page: 0,
      rowsPerPage: 10
    }
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

  render() {
    const {
      data,
      classes,
      columnData,
      handleServiceEdit,
      handleServiceDelete
    } = this.props
    const { order, orderBy, rowsPerPage, page } = this.state

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              onRequestSort={this.handleRequestSort}
              order={order}
              orderBy={orderBy}
              rowCount={data.length}
              columnData={columnData}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                  return (
                    <TableRow hover key={n.id}>
                      <TableCell>{n.serviceDefinition.serviceDefinition}</TableCell>
                      <TableCell>{n.interfaces.map(e => e.interfaceName).join(' ')}</TableCell>
                      <TableCell>{n.serviceUri}</TableCell>
                      <TableCell className={classes.actionCell}>
                        <IconButton
                          color="secondary"
                          aria-label="Edit Entry"
                          onClick={handleServiceEdit(n)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          aria-label="Delete Entry"
                          onClick={handleServiceDelete(n.id)}
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
          count={data.length}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Paper>
    )
  }
}

SystemTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  columnData: PropTypes.array.isRequired,
  handleServiceEdit: PropTypes.func.isRequired,
  handleServiceDelete: PropTypes.func.isRequired
}

export default withStyles(styles)(SystemTable)
