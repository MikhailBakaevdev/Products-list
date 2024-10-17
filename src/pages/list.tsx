import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { PRODUCTS_HEADER } from './constants';
import { Header } from '../components/header';
import { PRODUCT_TYPES } from '../components/productsSelect/constants';
import { Box, Button } from '@mui/material';
import { useAppSelector } from '../store/hooks';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'name', headerName: 'Название', width: 200 },
  {
    field: 'productTypes',
    headerName: 'Тип продукта',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value: String[], row) => value?.map((id) => PRODUCT_TYPES.find((el) => el.key === id)?.value),
  },
  {
    field: 'productsCounter',
    headerName: 'Количество',
    type: "number",
    width: 150,
  },
];


export const DataTable = () => {
    const data = useAppSelector((state) => state.data)
    const navigate = useNavigate();

    const rows = data;

  const handleClick = (id: GridRowId) => {
    navigate(`/productForm/${id}`);
  }

  const handleCreate = () => {
    navigate(`/productForm/`);
  }

  return (
    <Paper sx={{ height: '100vh', width: '100%' }}>
        <Header title= {PRODUCTS_HEADER}/>
        <Box sx={{ width: 350, maxWidth: '100%', margin: "20px" }}>
            <Button onClick={handleCreate} variant="contained">Добавить продукт</Button>
        </Box>
      <DataGrid
        rows={rows}
        onRowClick={(params) => handleClick(String(params.id))}
        columns={columns}
        initialState={{ }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}