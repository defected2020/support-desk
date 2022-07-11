import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  getTicket,
  reset,
  closeTicket,
  openTicket,
} from '../features/tickets/ticketSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { BackButton } from '../components/BackButton'
import Spinner from '../components/Spinner'

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  )

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //gets the ticket id from the url
  const { ticketId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>
  }
  console.log(ticket.status)
  const TicketStatusToggle = () => {
    if (ticket.status === 'new') {
      dispatch(closeTicket(ticketId))
      toast.success('Ticket Closed')
      navigate('/tickets')
    } else {
      dispatch(openTicket(ticketId))
      toast.success('Ticket Reopened')
      console.log(ticket.status)
    }
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-Us')}
        </h3>
        <h3>Product: {ticket.product} </h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue: </h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status === 'new' ? (
        <button
          onClick={TicketStatusToggle}
          className='btn btn-block btn-danger'>
          Close Ticket
        </button>
      ) : (
        <button
          onClick={TicketStatusToggle}
          className='btn btn-block btn-success'>
          Reopen Closed Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
