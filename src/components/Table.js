import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get'; // ⬅️ Tambahkan ini

const Table = ({ columns, data, emptyMessage = 'No data available' }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-line dark:border-line-dark">
      <table className="min-w-full divide-y divide-line dark:divide-line-dark">
        <thead className="bg-subtle dark:bg-subtle-dark">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-muted dark:text-muted-dark"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line dark:divide-line-dark">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="transition-colors duration-150 hover:bg-subtle/60 dark:hover:bg-subtle-dark/60">
                {columns.map((column, colIndex) => {
                  const value = get(row, column.accessor); // ⬅️ Gunakan lodash.get di sini
                  return (
                    <td
                      key={colIndex}
                      className="px-5 py-4 whitespace-nowrap text-sm text-ink dark:text-ink-dark"
                    >
                      {column.render 
                        ? column.render(value, row) 
                        : column.truncate
                          ? value?.length > 50
                            ? `${value.substring(0, 50)}...`
                            : value
                          : value
                      }
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-5 py-10 text-center text-sm text-muted dark:text-muted-dark">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      render: PropTypes.func,
      truncate: PropTypes.bool
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  emptyMessage: PropTypes.string
};

export default Table;
