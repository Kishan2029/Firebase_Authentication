import * as React from 'react';
import Box from '@mui/material/Box';
import { rows } from '../../Asset/data'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import InfiniteScroll from "react-infinite-scroll-component";


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

// function generateRow(n) {
//   let row = [];
//   for (let i = 0; i < n; i++) {
//     setRows((rows)=>{
//       ...rows,
//       { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 }
//     })
    
//   }
//   return;
// }
export default function DataGridDemo() {
  // const [rows, setRows]=useState(rows);
  return (
    <div className="Grid">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
    </div>
  );
}
