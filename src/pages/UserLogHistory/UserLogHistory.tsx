import { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import styles from './UserLogHistory.module.css'
import audits from '../../features/audit/audits.json'

const fields: Record<string, string> = {
  'no': 'No.',
  'sign-in-time': 'Date/Sign-in Time',
  'staff-id': 'Staff ID',
  'department': 'Department',
  'activity': 'Activity',
  'sign-out-time': 'Date/Sign-out Time',
}

export const UserLogHistory = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(5);
  const [paginatedAudits, setPaginatedAudits] = useState(audits.slice(0, limit));

  useEffect(() => {
    const start = (pageNumber - 1) * limit;
    const end = start + limit;
    setPaginatedAudits(audits.slice(start, end));
  }, [pageNumber, limit]);

  const handlePageDecrement = () => {
    if (pageNumber <= 1)
      return;

    setPageNumber((value) => value - 1);
  }

  const handlePageIncrement = () => {
    if (pageNumber >= Math.ceil(audits.length / limit))
      return;

    setPageNumber((value) => value + 1);
  }

  const handleJumpToStart = () => {
    setPageNumber(1);
  }

  const handleJumpToEnd = () => {
    setPageNumber(Math.ceil(audits.length / limit));
  }

  return (
    <div className={styles['ulh-container']}>
      <h1 style={{ textAlign: 'center' }}>User Log History</h1>
      <div className={styles['ulh-list-container']}>
        <div className={styles['ulh-amount-dropdown']}>
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

        <table className={styles['ulh-table']}>
          <thead>
            {Object.values(fields).map(displayName => (
              <th className={styles['ulh-table-header']}>{displayName}</th>
            ))}
          </thead>
          <tbody>
            {paginatedAudits.map((audit: Record<string, string>, index: number) => (
              <tr className={styles['ulh-table-row']}>
                {Object.keys(fields).map(value => {
                  if (value === 'no')
                    return (
                      <td className={styles['ulh-table-row-data']}>{index + 1}</td>
                    )

                  return (
                    <td className={styles['ulh-table-row-data']}>{audit[value]}</td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles['ulh-entry-info']}>
          <p>
            Showing {(pageNumber - 1) * limit + 1} to {Math.min(pageNumber * limit, audits.length)} of {audits.length} entries
          </p>
          <div className={styles['ulh-pagination']}>
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
