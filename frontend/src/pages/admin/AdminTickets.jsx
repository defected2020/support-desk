import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAdminTickets, reset } from '../../features/tickets/ticketSlice'
import Spinner from '../../components/Spinner'
import { BackButton } from '../../components/BackButton'
import AdminTicketItem from '../../components/AdminTicketItem'

function AdminTickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  )
  console.log(tickets)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getAdminTickets())
    console.log(tickets)
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/admin' />
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
