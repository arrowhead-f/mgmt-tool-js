import React from 'react'
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from 'react-sortable-hoc'
import arrayMove from 'array-move'
import ReorderIcon from '@material-ui/icons/Reorder'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const DragHandle = sortableHandle(() => <ReorderIcon className='SortableDrag' />)

const SortableItem = sortableElement(({ value }) => (
  <li className='SortableItem'>
    <DragHandle />
    <Typography>{value}</Typography>
  </li>
))

const SortableContainer = sortableContainer(({ children }) => {
  return <ul className='SortableList'>{children}</ul>
})

class BackupSortableList extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    this.setState({ items: this.props.list })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }))
  }

  render() {
    const { items } = this.state

    return (
      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
        {items.map((provider, index) => (
          <SortableItem key={index} index={index} value={provider.systemName} helperClass='SortableHelper' />
        ))}
      </SortableContainer>
    )
  }
}

BackupSortableList.propTypes = {
  list: PropTypes.array.isRequired
}

export default BackupSortableList
