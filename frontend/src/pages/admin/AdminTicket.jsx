import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getTicket,
  openTicket,
  closeTicket,
} from '../../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import {
  getNotes,
  createNote,
  reset as notesReset,
} from '../../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import Spinner from '../../components/Spinner'
import NoteItem from '../../components/NoteItem'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  )

  //rename isLoading as it is already declared above
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
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
    // dispatch(getNotes(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])

  // Toggle Ticket Status
  const TicketStatusToggle = () => {
    if (ticket.status === 'new') {
      dispatch(closeTicket(ticketId))
      toast.success('Ticket Closed')
      navigate('/admin/new-tickets')
    } else {
      dispatch(openTicket(ticketId))
      toast.success('Ticket Reopened')
    }
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
    closeModal()
  }

  // Open/close modal

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)
  if (isLoading || notesIsLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  // Change css class for priority

  const priorityIndicator = () => {
    const highPriority = 'priority-high'
    const mediumPriority = 'priority-medium'
    const lowPriority = 'priority-low'
    if (ticket.priority === 'High Priority') {
      return highPriority
    } else if (ticket.priority === 'Medium Priority') {
      return mediumPriority
    } else {
      return lowPriority
    }
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/admin/new-tickets' />
        <h2>
          Customer Name: {ticket.fullName}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`priority ${priorityIndicator()}`}>
            {ticket.priority}
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

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus />
          Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.length > 0 && <h3>Notes</h3>}
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
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
