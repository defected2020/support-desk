import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

function AdminTicketItem({ ticket }) {
  const { user } = useSelector((state) => state.auth)
  console.log(ticket)
  return (
    <div className='ticket ticket-headings-admin'>
      <div>{user.name}</div>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link
        to={`/admin/ticket/${ticket._id}`}
        className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default AdminTicketItem
