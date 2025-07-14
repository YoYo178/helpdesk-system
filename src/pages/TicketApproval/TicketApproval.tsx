import { useEffect, useState } from 'react'
import styles from './TicketApproval.module.css'
import tickets from '../../features/ticket/tickets.json'
import { FaCheck, FaSearch } from 'react-icons/fa';
import { MdCancel, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import users from '../../features/auth/users.json'

const roleFields: Record<string, string> = {
  'id': 'Ticket No.',
  'subject': 'Subject',
  'category': 'Category',
  'priority': 'Priority',
  'date': 'Date',
  'action': 'Action',
  'assign-to': 'Assign To',
}

const categoryDisplayText: Record<string, string> = {
  'access-issue': 'Access Issue',
  'ticketing': 'Ticketing',
  'feedback': 'Feedback'
}

export const TicketApproval = () => {

  const [filterText, setFilterText] = useState('');

  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [paginatedTickets, setPaginatedTickets] = useState(filteredTickets.slice(0, limit));

  useEffect(() => {
    const query = filterText.toLowerCase();
    const results = tickets.filter(obj => {
      return obj.subject.toLowerCase().includes(query)
        || obj.category.toLowerCase().includes(query)
        || obj.priority.toLowerCase().includes(query)
        || obj.date.toLowerCase().includes(query)
    });

    setFilteredTickets(results);
    setPageNumber(1);
  }, [filterText])

  useEffect(() => {
    const start = (pageNumber - 1) * limit;
    const end = start + limit;
    setPaginatedTickets(filteredTickets.slice(start, end));
  }, [filteredTickets, pageNumber, limit]);

  const handlePageDecrement = () => {
    if (pageNumber <= 1)
      return;

    setPageNumber((value) => value - 1);
  }

  const handlePageIncrement = () => {
    if (pageNumber >= Math.ceil(filteredTickets.length / limit))
      return;

    setPageNumber((value) => value + 1);
  }

  const handleJumpToStart = () => {
    setPageNumber(1);
  }

  const handleJumpToEnd = () => {
    setPageNumber(Math.ceil(filteredTickets.length / limit));
  }

  return (
    <div className={styles['ticket-approval-container']}>
      <h1 style={{ textAlign: 'center' }}>Ticket Approval</h1>
      <div className={styles['ticket-list-container']}>
        <div className={styles['ticket-search-box']}>
          <input type="text" placeholder="Find ticket" onChange={(e) => setFilterText(e.target.value)} value={filterText} />
          <span className={styles['ticket-search-icon']}><FaSearch /></span>
        </div>

        <div className={styles['ticket-amount-dropdown']}>
          &nbsp;Show:&nbsp;
          <select value={limit} onChange={(e) => { setLimit(parseInt(e.target.value)); setPageNumber(1) }}>
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          &nbsp;Entries&nbsp;
        </div>

        <table className={styles['tickets-table']}>
          <thead>
            {Object.values(roleFields).map(displayName => (
              <th className={styles['tickets-table-header']}>{displayName}</th>
            ))}
          </thead>
          <tbody>
            {paginatedTickets.map((ticket: Record<string, string | number>) => (
              <tr className={styles['tickets-table-row']}>
                {Object.keys(roleFields).map(value => {
                  if (value === 'category')
                    return (<td className={styles['tickets-table-row-data']}>{categoryDisplayText[ticket[value]]}</td>)

                  if (value === 'action')
                    return (
                      <td className={styles['tickets-table-row-data']}>
                        <div className={styles['ticket-action-button-row']}>
                          <button className={styles['ticket-action-button']}>
                            <FaCheck />
                          </button>
                          <button className={styles['ticket-action-button']}>
                            <MdCancel />
                          </button>
                        </div>
                      </td>
                    )

                  if (value === 'assign-to')
                    return (
                      <td className={styles['tickets-table-row-data']}>
                        <select>
                          <option value='none'>None</option>
                          {users.map(user => (
                            user.role === 'techsupport' ? (
                              <option value={user.username.toLowerCase()}>{user.name}</option>
                            ) : (null)
                          ))}
                        </select>
                      </td>
                    )

                  return (
                    <td className={styles['tickets-table-row-data']}>{ticket[value]}</td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles['tickets-entry-info']}>
          <p>
            Showing {(pageNumber - 1) * limit + 1} to {Math.min(pageNumber * limit, filteredTickets.length)} of {filteredTickets.length} entries
          </p>
          <div className={styles['tickets-pagination']}>
            <button onClick={handleJumpToStart}><MdKeyboardDoubleArrowLeft /></button>
            <button onClick={handlePageDecrement}><MdKeyboardArrowLeft /></button>
            <p>{pageNumber}</p>
            <button onClick={handlePageIncrement}><MdKeyboardArrowRight /></button>
            <button onClick={handleJumpToEnd}><MdKeyboardDoubleArrowRight /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
