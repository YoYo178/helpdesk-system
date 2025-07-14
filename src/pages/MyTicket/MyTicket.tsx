import { useEffect, useState } from 'react'
import styles from './MyTicket.module.css'
import { useAppSelector } from '../../app/hooks';
import type { Role } from '../../features/auth/authTypes';
import tickets from '../../features/ticket/tickets.json'
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { MdGroupAdd, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { RiFileEditLine } from 'react-icons/ri';
import { IoMdDownload } from 'react-icons/io';
import { VscDebugRestart } from 'react-icons/vsc';

const roleFields: Record<Role, Record<string, string>> = {
  techsupport: {
    'id': 'Ticket No.',
    'subject': 'Subject',
    'category': 'Category',
    'priority': 'Priority',
    'date': 'Date',
    'status': 'Status',
    'personInCharge': 'Person in charge',
    'action': 'Action',
  },
  operations: {
    'id': 'Ticket No.',
    'subject': 'Subject',
    'category': 'Category',
    'priority': 'Priority',
    'date': 'Date',
    'status': 'Status',
    'personInCharge': 'Person in charge',
    'action': 'Action',
  },
  user: {
    'id': 'Ticket No.',
    'subject': 'Subject',
    'status': 'Status',
    'supportBy': 'Support by',
    'date': 'Date',
    'rating': 'Rate',
  },
  admin: {}
}

const statusDisplayText: Record<string, string> = {
  'in-progress': 'In Progress',
  'on-hold': 'On Hold',
  'closed': 'Closed'
}

const categoryDisplayText: Record<string, string> = {
  'access-issue': 'Access Issue',
  'ticketing': 'Ticketing',
  'feedback': 'Feedback'
}

export const MyTicket = () => {
  const user = useAppSelector(state => state.auth.user)!

  const navigate = useNavigate();

  const [filterText, setFilterText] = useState('');

  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [paginatedTickets, setPaginatedTickets] = useState(filteredTickets.slice(0, limit));

  const [searchParams] = useSearchParams();
  const ticketId = parseInt(searchParams.get('ticketId') || '0');
  const action = searchParams.get('action');
  const selectedTicket = paginatedTickets.find(ticket => parseInt(ticket.id) === ticketId)

  useEffect(() => {
    const query = filterText.toLowerCase();
    const results = tickets.filter(obj => {
      if (user.role === 'user') {
        return obj.subject.toLowerCase().includes(query)
          || obj.status.toLowerCase().includes(query)
          || obj.supportBy.toLowerCase().includes(query)
          || obj.date.toLowerCase().includes(query)
      }

      return obj.subject.toLowerCase().includes(query)
        || obj.status.toLowerCase().includes(query)
        || obj.supportBy.toLowerCase().includes(query)
        || obj.personInCharge.toLowerCase().includes(query)
        || obj.category.toLowerCase().includes(query)
        || obj.priority.toLowerCase().includes(query)
        || obj.date.toLowerCase().includes(query)
    });

    setFilteredTickets(results);
    setPageNumber(1);
  }, [filterText, user.role])

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
    <>
      {ticketId !== 0 ? (
        <div className={styles['ticket-modal-backdrop']} onClick={() => navigate('/my-ticket')}>
          <div className={styles['ticket-modal']} onClick={(e) => e.stopPropagation()}>
            {action === 'view' ? (<>
              <h2>Ticket Details</h2>
              <div className={styles['ticket-modal-details']}>
                <p>Ticket No: {selectedTicket?.id}</p>
                <p>Date: {selectedTicket?.date}</p>
                <p>Name: {selectedTicket?.subject}</p>
                <p>Dept: {selectedTicket?.supportBy}</p>
                <br></br>
                <p>Title: {selectedTicket?.subject}</p>
                <p>Description: </p>
                <p>Category: {categoryDisplayText[selectedTicket?.category || '']}</p>
                <p>Type: </p>
                <p>Priority: {selectedTicket?.priority}</p>
                <p>Status: {statusDisplayText[selectedTicket?.status || '']}</p>
                <p>Attachment: </p>

                <div className={styles['ticket-modal-buttons']}>
                  {['techsupport', 'operations'].includes(user.role) ? (
                    <button className={styles['ticket-modal-update-button']}>Update</button>
                  ) : (
                    null
                  )}
                  <button className={styles['ticket-modal-close-button']} onClick={() => navigate('/my-ticket')}>Close</button>
                </div>
              </div>
            </>
            ) : (
              null
            )}
            {action === 'close' || action === 'assign' ? (
              <>
                <h2>
                  {action === 'close' ? 'My Ticket - Close Ticket' : 'My Ticket - Team Creation'}
                </h2>
                <div className={styles['ticket-close-container']}>
                  <div className={styles['ticket-close-details']}>
                    <div className={styles['ticket-close-fields']}>
                      <input type="text" placeholder='Ticket No.' />
                      <input type="text" placeholder='Team name' />
                      <input type="text" placeholder='Team member' />
                    </div>
                    <textarea className={styles['ticket-close-remark']} placeholder='Remark'></textarea>

                  </div>
                  <div className={styles['ticket-close-buttons']}>
                    <button className={styles['ticket-restart-button']}><VscDebugRestart /></button>
                    <button className={styles['ticket-close-button']}>

                      {action === 'close' ? 'Close Ticket' : 'Create Team'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              null
            )}

            {action === 'assign' ? (
              <h2>My Ticket - Team Creation</h2>
            ) : (
              null
            )}

          </div>
        </div >
      ) : (
        null
      )}
      <div className={styles['my-ticket-container']}>
        <h1 className={styles['my-ticket-header']}>List of Ticket</h1>
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
            <thead className={styles['tickets-table-header']}>
              {Object.values(roleFields[user.role]).map((displayName) => {
                return (
                  <th className={styles['tickets-table-header-data']}>{displayName}</th>
                )
              })}
            </thead>
            <tbody className={styles['tickets-table-body']}>
              {paginatedTickets.map((ticket: Record<string, string | number>) => (
                <tr className={styles['tickets-table-row']}>
                  {Object.keys(roleFields[user.role]).map(value => {
                    if (value === 'status')
                      return (
                        <td className={styles['tickets-table-row-data']}>
                          <div className={styles[`ticket-label-${ticket[value]}`]}>{statusDisplayText[ticket[value]]}</div>
                        </td>
                      )

                    if (value === 'id')
                      return (
                        <td className={styles['tickets-table-row-data']}>
                          <Link to={`/my-ticket?ticketId=${ticket[value]}&action=view`}>{ticket[value]}</Link>
                        </td>
                      )

                    if (value === 'category')
                      return (<td className={styles['tickets-table-row-data']}>{categoryDisplayText[ticket[value]]}</td>)

                    if (value === 'rating')
                      return (
                        <td className={styles['tickets-table-row-data']} style={{ fontSize: '1.4rem' }}>
                          {Array.from({ length: 5 }).map((_, i) => {
                            const rating = Math.round(+ticket[value] * 2) / 2;

                            if (i + 1 <= rating) {
                              return <IoStar key={i} style={{ color: '#FFC632' }} />
                            } else if (i + 0.5 === rating) {
                              return <IoStarHalf key={i} style={{ color: '#FFC632' }} />
                            } else {
                              return <IoStarOutline key={i} style={{ color: '#0000003D' }} />
                            }
                          })}
                        </td>
                      )

                    if (value === 'action')
                      return (
                        <td className={styles['tickets-table-row-data']}>
                          <div className={styles['ticket-action-button-row']}>
                            <button className={styles['ticket-action-button']} onClick={() => navigate(`/my-ticket?ticketId=${ticket['id']}&action=close`)}>
                              <RiFileEditLine />
                            </button>
                            <button className={styles['ticket-action-button']} onClick={() => navigate(`/my-ticket?ticketId=${ticket['id']}&action=assign`)}>
                              <MdGroupAdd />
                            </button>
                            <button className={styles['ticket-action-button']}>
                              <IoMdDownload />
                            </button>
                          </div>
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
            <div className={styles['tickets-count']}>
              Showing {(pageNumber - 1) * limit + 1} to {Math.min(pageNumber * limit, filteredTickets.length)} of {filteredTickets.length} entries
            </div>
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
    </>
  )
}
