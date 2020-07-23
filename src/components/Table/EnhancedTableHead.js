import React from 'react'
import PropTypes from 'prop-types'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Tooltip from '@material-ui/core/Tooltip'
import TableSortLabel from '@material-ui/core/TableSortLabel'

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy, columnData } = this.props

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                style={{textAlign: column.alignCenter ? 'center' : 'initial'}}
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={
                      column.disableSort
                        ? null
                        : this.createSortHandler(column.id)
                    }
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  columnData: PropTypes.array.isRequired
}

export default EnhancedTableHead
