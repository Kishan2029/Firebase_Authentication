// import * as React from 'react';
import React, {Component, Fragment, lazy, Suspense} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useDemoData } from '@mui/x-data-grid-generator';
import LazyLoad from 'react-lazy-load';
import loadable from './loadable';
import './Datagrid.css'

const ReactTable = lazy(() => import("react-table"));

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function QuickFilteringGrid() {
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns],
  );



  return (
    <div className="strip">
    {/* <h1 >Table</h1> */}
    <LazyLoad offset={300}>
    <Box sx={{ height: 900, width: 1 }}>
    
      <DataGrid
        {...data}
        // disableColumnFilter
        // disableColumnSelector  
        // pageSize={100}
        disableDensitySelector
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
      
    </Box>
    </LazyLoad>
    </div>
  );
}
