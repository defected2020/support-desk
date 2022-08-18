function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  console.log(currentPage)

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }
  console.log(pageNumbers)
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            className={
              currentPage === number
                ? 'active-pagination'
                : 'nonactive-pagination'
            }>
            <a
              href='#'
              className={
                currentPage === number ? 'active-number' : 'page-link'
              }>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
