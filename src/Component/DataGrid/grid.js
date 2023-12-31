// import React, {
//     useState,
//     useReducer,
//     useEffect,
//     useMemo,
//   } from 'react';
//   import Paper from '@mui/material/Paper';
//   import {
//     VirtualTableState,
//     createRowCache,
//   } from '@devexpress/dx-react-grid';
//   import {
//     Grid,
//     VirtualTable,
//     TableHeaderRow,
//   } from '@devexpress/dx-react-grid-material-ui';
  
//   const VIRTUAL_PAGE_SIZE = 50;
//   const MAX_ROWS = 50000;
//   const URL = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/Sales';
//   const buildQueryString = (skip, take) => (
//     `${URL}?requireTotalCount=true&skip=${skip}&take=${take}`
//   );
//   const getRowId = row => row.Id;
  
//   const initialState = {
//     rows: [],
//     skip: 0,
//     requestedSkip: 0,
//     take: VIRTUAL_PAGE_SIZE * 2,
//     totalCount: 0,
//     loading: false,
//     lastQuery: '',
//   };
  
//   function reducer(state, { type, payload }) {
//     switch (type) {
//       case 'UPDATE_ROWS':
//         return {
//           ...state,
//           ...payload,
//           loading: false,
//         };
//       case 'START_LOADING':
//         return {
//           ...state,
//           requestedSkip: payload.requestedSkip,
//           take: payload.take,
//         };
//       case 'REQUEST_ERROR':
//         return {
//           ...state,
//           loading: false,
//         };
//       case 'FETCH_INIT':
//         return {
//           ...state,
//           loading: true,
//         };
//       case 'UPDATE_QUERY':
//         return {
//           ...state,
//           lastQuery: payload,
//         };
//       default:
//         return state;
//     }
//   }
  
//   export default () => {
//     const [state, dispatch] = useReducer(reducer, initialState);
//     const [columns] = useState([
//       { name: 'Id', title: 'Id', getCellValue: row => row.Id },
//       { name: 'Category', title: 'Category', getCellValue: row => row.ProductCategoryName },
//       { name: 'Store', title: 'Store', getCellValue: row => row.StoreName },
//       { name: 'Product', title: 'Product', getCellValue: row => row.ProductName },
//       { name: 'Amount', title: 'Amount', getCellValue: row => row.SalesAmount },
//     ]);
//     const [tableColumnExtensions] = useState([
//       { columnName: 'Id', width: 80 },
//       { columnName: 'Category', width: 220 },
//       { columnName: 'Store', width: 220 },
//       { columnName: 'Amount', width: 120 },
//     ]);
  
//     const cache = useMemo(() => createRowCache(VIRTUAL_PAGE_SIZE));
//     const updateRows = (skip, count, newTotalCount) => {
//       dispatch({
//         type: 'UPDATE_ROWS',
//         payload: {
//           skip,
//           rows: cache.getRows(skip, count),
//           totalCount: newTotalCount < MAX_ROWS ? newTotalCount : MAX_ROWS,
//         },
//       });
//     };
  
//     const getRemoteRows = (requestedSkip, take) => {
//       dispatch({ type: 'START_LOADING', payload: { requestedSkip, take } });
//     };
  
//     const loadData = () => {
//       const {
//         requestedSkip, take, lastQuery, loading,
//       } = state;
//       const query = buildQueryString(requestedSkip, take);
//       if (query !== lastQuery && !loading) {
//         const cached = cache.getRows(requestedSkip, take);
//         if (cached.length === take) {
//           updateRows(requestedSkip, take);
//         } else {
//           dispatch({ type: 'FETCH_INIT' });
//           fetch(query)
//             .then(response => response.json())
//             .then(({ data, totalCount: newTotalCount }) => {
//               cache.setRows(requestedSkip, data);
//               updateRows(requestedSkip, take, newTotalCount);
//             })
//             .catch(() => dispatch({ type: 'REQUEST_ERROR' }));
//         }
//         dispatch({ type: 'UPDATE_QUERY', payload: query });
//       }
//     };
  
//     useEffect(() => loadData());
  
//     const {
//       rows, skip, totalCount, loading,
//     } = state;
//     return (
//       <Paper>
//         <Grid
//           rows={rows}
//           columns={columns}
//           getRowId={getRowId}
//         >
//           <VirtualTableState
//             infiniteScrolling
//             loading={loading}
//             totalRowCount={totalCount}
//             pageSize={VIRTUAL_PAGE_SIZE}
//             skip={skip}
//             getRows={getRemoteRows}
//           />
//           <VirtualTable columnExtensions={tableColumnExtensions} />
//           <TableHeaderRow />
//         </Grid>
//       </Paper>
//     );
//   };
  