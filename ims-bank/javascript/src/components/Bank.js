import React, { useEffect, useState, useMemo } from "react";
import api from '../services/api';
import { Column, CellProps, useTable } from 'react-table';
import { organizeClientsAccounts } from "../helpers/clients";

export const Bank = () => {
  const [data, setData] = useState([]);
  

  useEffect(async () => {
    const {data} = await api.get('transactions.json');
    setData(organizeClientsAccounts(data));
    
  }, []);

  
  const columns = React.useMemo(
    () => [
      {
        Header: "Customer's name",
        accessor: 'name',
      },
      {
        Header: "Checking account total",
        accessor: 'checking',
      },
      {
        Header: "Saving account total",
        accessor: 'savings',
      },
      {
        Header: "Total",
        Cell:({row}) => {
          return row.original.savings + row.original.checking
        }
      }
    ],
    [],
  );

  const tableInstance = useTable({ columns, data});
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
  return (
    
    <table {...getTableProps()}>
     <thead>
       {headerGroups.map(headerGroup => (
         <tr {...headerGroup.getHeaderGroupProps()}>
           {headerGroup.headers.map(column => (
             <th {...column.getHeaderProps()} style={{border: "1px solid grey", width: "20%"}}>
               {column.render('Header')}
             </th>
           ))}
         </tr>
       ))}
     </thead>
     <tbody {...getTableBodyProps()}>
       {rows.map(row => {
         prepareRow(row)
         return (
           <tr {...row.getRowProps()} >
             {row.cells.map(cell => {
               return (
                 <td {...cell.getCellProps()} style={{border: "1px solid grey"}}>
                   {cell.render('Cell')}
                 </td>
               )
             })
             }
           </tr>
         );
       })}
     </tbody>
   </table>
  )
};
