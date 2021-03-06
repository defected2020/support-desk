import axios from 'axios'

const API_URL = '/api/tickets/'

// Create new ticket

const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, ticketData, config)

  return response.data
}

//Get user tickets
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

//Get user ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + ticketId, config)

  return response.data
}

//Close ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + ticketId,
    { status: 'closed' },
    config
  )

  return response.data
}

//reopen ticket
const openTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + ticketId,
    { status: 'new' },
    config
  )
  return response.data
}

//Get user tickets
const getAdminTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + '/admin/tickets', config)

  return response.data
}

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
  openTicket,
  getAdminTickets,
}

export default ticketService
