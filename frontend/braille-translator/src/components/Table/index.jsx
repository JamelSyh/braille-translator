import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>word</th>
            <th className={styles.tableHeader}>contraction</th>
            <th className={styles.tableHeader}>braille</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el, key) => (
            <tr className={styles.tableRowItems} key={key}>
              <td className={styles.tableCell}>{el.word}</td>
              <td className={styles.tableCell}>{el.contraction}</td>
              <td className={styles.tableCell}>{el.braille}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
