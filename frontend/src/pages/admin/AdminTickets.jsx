import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  FaArrowDown,
  FaArrowUp,
  FaFilter,
  FaRegTimesCircle,
} from 'react-icons/fa'
import {
  getAdminTickets,
  reset,
  sortItems,
} from '../../features/tickets/ticketSlice'
import Sidebar from '../../components/Sidebar'
import Spinner from '../../components/Spinner'
import Pagination from '../../components/Pagination'
import { BackButton } from '../../components/BackButton'
import AdminTicketItem from '../../components/AdminTicketItem'

function AdminTickets() {
  const [filter, setFilter] = useState('status')
  const [filterDirection, setFilterDirection] = useState('asc')
  const [sidebarStatus, setSidebarStatus] = useState('closed')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)

  //sidebar query data
  const [queryData, setQueryData] = useState({
    name: '',
    product: '',
    priority: '',
    status: '',
  })

  const { filteredTickets, isLoading, isSuccess } = useSelector(
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

  const changeFilterDirection = (direction) => {
    setFilterDirection(direction)
  }

  const toggleSidebarStatus = () => {
    if (sidebarStatus === 'closed') {
      setSidebarStatus('open')
    } else {
      setSidebarStatus('closed')
    }
  }

  const resetQueryData = () => {
    setQueryData({
      name: '',
      product: '',
      priority: '',
      status: '',
    })
  }

  if (isLoading) {
    return <Spinner />
  }

  // Get current posts
  let indexOfLastPost = currentPage * postsPerPage
  let indexOfFirstPost = indexOfLastPost - postsPerPage
  let currentPosts = filteredTickets.slice(indexOfFirstPost, indexOfLastPost)

  // Change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <Sidebar
        sidebarStatus={sidebarStatus}
        setSidebarStatus={setSidebarStatus}
        queryData={queryData}
        setQueryData={setQueryData}
        resetQueryData={resetQueryData}
      />
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

      <div className='filter-buttons'>
        <button onClick={() => toggleSidebarStatus()} className='btn'>
          <FaFilter /> Filter
        </button>
        <button
          className='btn filter-close-btn'
          onClick={() => resetQueryData()}>
          <FaRegTimesCircle />
        </button>
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
        {currentPosts.map((ticket) => (
          <AdminTicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredTickets.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  )
}

export default AdminTickets
