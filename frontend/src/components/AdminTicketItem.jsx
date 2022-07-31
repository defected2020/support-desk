import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

function AdminTicketItem({ ticket }) {
  const { user } = useSelector((state) => state.auth)

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
    <div className='ticket ticket-headings-admin'>
      <div>{ticket.fullName}</div>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div className='ticket-status'>
        <div className={`status status-${ticket.status}`}>{ticket.status}</div>
        <div className={`priority ${priorityIndicator()}`}>
          {ticket.priority}
        </div>
      </div>
      <Link
        to={`/admin/ticket/${ticket._id}`}
        className='btn btn-reverse btn-sm preview-ticket'>
        View
      </Link>
      <div className='preview-ticket-hidden'>
        <h6>Description of issue</h6>
        {ticket.description}
      </div>
    </div>
  )
}

export default AdminTicketItem
