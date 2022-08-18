import { Link } from 'react-router-dom'

import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function AdminHome() {
  return (
    <>
      <section className='heading'>
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to='/admin/new-tickets' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> All Tickets
      </Link>
    </>
  )
}

export default AdminHome
