import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { filterTickets } from '../features/tickets/ticketSlice'
import { FaRegWindowClose } from 'react-icons/fa'

function Sidebar({
  setSidebarStatus,
  sidebarStatus,
  queryData,
  setQueryData,
  resetQueryData,
}) {
  const { name, product, priority, status } = queryData

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(filterTickets(queryData))
  }, [queryData, dispatch])

  const changeFilter = (e) => {
    setQueryData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const toggleSidebarStatus = () => {
    if (sidebarStatus === 'open') {
      setSidebarStatus('closed')
    } else {
      setSidebarStatus('open')
    }
  }

  return (
    <div
      className={`${
        sidebarStatus === 'open'
          ? 'sidebar-container'
          : 'sidebar-container-hidden'
      }`}>
      <button
        onClick={() => toggleSidebarStatus()}
        className='sidebar-close-button'>
        <FaRegWindowClose />
      </button>

      <h2 className='sidebar-header'>Filter Options</h2>
      <div className='form-group'>
        <label className='form-label' htmlFor='name'>
          Filter By Customer Name
        </label>
        <input
          type='text'
          className='form-control'
          id='name'
          name='name'
          value={name}
          onChange={changeFilter}
          placeholder='Enter your query'
        />
      </div>
      <div className='form-group'>
        <label className='form-label' htmlFor='product'>
          Filter by Product
        </label>
        <select
          name='product'
          value={product}
          onChange={changeFilter}
          id='product'>
          <option value=''>All Products</option>
          <option value='iPhone'>iPhone</option>
          <option value='Macbook Pro'>Macbook Pro</option>
          <option value='iMac'>iMac</option>
          <option value='iPad'>iPad</option>
        </select>
      </div>
      <div className='form-group'>
        <label className='form-label' htmlFor='pr'>
          Filter by Priority
        </label>
        <select
          name='priority'
          value={priority}
          onChange={changeFilter}
          id='priority'>
          <option value=''>Any Priority</option>
          <option value='Low Priority'>Low Priority</option>
          <option value='Medium Priority'>Medium Priority</option>
          <option value='High Priority'>High Priority</option>
        </select>
      </div>
      <div className='form-group'>
        <label className='form-label' htmlFor='product'>
          Filter by Status
        </label>
        <select
          name='status'
          value={status}
          onChange={changeFilter}
          id='status'>
          <option value=''>Any Status</option>
          <option value='new'>New</option>
          <option value='closed'>Closed</option>
        </select>
        <button onClick={resetQueryData} className='btn reset-filters'>
          Reset Filters
        </button>
      </div>
    </div>
  )
}

export default Sidebar
