import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import {
  getAdminTickets,
  reset,
  sortItems,
} from '../../features/tickets/ticketSlice'
import Spinner from '../../components/Spinner'
import { BackButton } from '../../components/BackButton'
import AdminTicketItem from '../../components/AdminTicketItem'

function AdminTickets() {
  const [filter, setFilter] = useState('status')
  const [filterDirection, setFilterDirection] = useState('asc')

  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  // Get All tickets
  useEffect(() => {
    dispatch(getAdminTickets())
  }, [dispatch])

  // Sort by filter
  useEffect(() => {
    dispatch(sortItems([filter, filterDirection]))
  }, [filter, filterDirection, dispatch])

  // set filter
  const handleChange = (event) => {
    setFilter(event)
  }

  if (isLoading) {
    return <Spinner />
  }

  const changeFilterDirection = (direction) => {
    setFilterDirection(direction)
  }

  return (
    <>
      <div className='ticket-control'>
        <div className='back-btn'>
          <BackButton url='/admin' />
        </div>

        <label htmlFor='filter'>
          Sort By:
          <select
            name='filter'
            className='filter'
            value={filter}
            onChange={(e) => handleChange(e.target.value)}
            id='filter'>
            <option value='status'>Status</option>
            <option value='createdAt'>Date Created</option>
            <option value='updatedAt'>Last Modified</option>
            <option value='priority'>Priority</option>
            <option value='fullName'>Name</option>
          </select>
          <button
            onClick={() => changeFilterDirection('asc')}
            className={`${
              filterDirection === 'asc' ? 'filter-arrow-asc' : 'filter-arrow'
            }`}>
            <FaArrowUp />
          </button>
          <button
            onClick={() => changeFilterDirection('dsc')}
            className={`${
              filterDirection === 'dsc' ? 'filter-arrow-asc' : 'filter-arrow'
            }`}>
            <FaArrowDown />
          </button>
        </label>
      </div>

      <h1>All Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings ticket-headings-admin'>
          <div>Name</div>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <AdminTicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default AdminTickets
