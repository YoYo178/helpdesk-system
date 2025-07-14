import { useEffect, useState } from 'react'
import styles from './Database.module.css'
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import users from '../../features/auth/usersdb.json'
import { RiPencilFill } from 'react-icons/ri';

const fields = {
  'checkbox': '',
  'id': 'Staff ID',
  'name': 'Name',
  'department': 'Department',
  'speciality': 'Speciality',
  'setting': 'Setting'
}

export const Database = () => {
  const [filterText, setFilterText] = useState('');

  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [paginatedUsers, setPaginatedUsers] = useState(filteredUsers.slice(0, limit));

  useEffect(() => {
    const query = filterText.toLowerCase();
    const results = users.filter(obj => {
      return obj.name.toLowerCase().includes(query)
        || obj.department.toLowerCase().includes(query)
        || obj.speciality.toLowerCase().includes(query)
    });

    setFilteredUsers(results);
    setPageNumber(1);
  }, [filterText])

  useEffect(() => {
    const start = (pageNumber - 1) * limit;
    const end = start + limit;
    setPaginatedUsers(filteredUsers.slice(start, end));
  }, [filteredUsers, pageNumber, limit]);

  const handlePageDecrement = () => {
    if (pageNumber <= 1)
      return;

    setPageNumber((value) => value - 1);
  }

  const handlePageIncrement = () => {
    if (pageNumber >= Math.ceil(filteredUsers.length / limit))
      return;

    setPageNumber((value) => value + 1);
  }

  const handleJumpToStart = () => {
    setPageNumber(1);
  }

  const handleJumpToEnd = () => {
    setPageNumber(Math.ceil(filteredUsers.length / limit));
  }

  return (
    <>
      <title>Database | Helpdesk system</title>
      <div className={styles['database-container']}>
        <h1 className={styles['database-header']}>Database</h1>
        <div className={styles['database-list-container']}>

          <div className={styles['database-user-level']}>
            <div>User</div>
            <div>Operation Team</div>
            <div>Technical Support</div>
          </div>

          <div className={styles['database-search-box']}>
            <input type="text" placeholder="Find user" onChange={(e) => setFilterText(e.target.value)} value={filterText} />
            <span className={styles['database-search-icon']}><FaSearch /></span>
          </div>

          <div className={styles['database-amount-dropdown']}>
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

          <table className={styles['database-table']}>
            <thead>
              {Object.values(fields).map((displayName) => {
                return (
                  <th className={styles['database-table-header']}>{displayName}</th>
                )
              })}
            </thead>
            <tbody>
              {paginatedUsers.map((database: Record<string, string>) => (
                <tr className={styles['database-table-row']}>
                  {Object.keys(fields).map(value => {
                    if (value === 'checkbox')
                      return (
                        <td className={styles['database-table-row-data']}>
                          <input type="checkbox" />
                        </td>
                      )
                    if (value === 'setting')
                      return (
                        <td className={styles['database-table-row-data']}>

                          <div className={styles['database-action-button-row']}>
                            <button className={styles['database-action-button']}>
                              <RiPencilFill />
                            </button>
                            <button className={styles['database-action-button']}>
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      )
                    return (
                      <td className={styles['database-table-row-data']}>{database[value]}</td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles['database-entry-info']}>
            <p>
              Showing {(pageNumber - 1) * limit + 1} to {Math.min(pageNumber * limit, filteredUsers.length)} of {filteredUsers.length} entries
            </p>
            <div className={styles['database-pagination']}>
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
