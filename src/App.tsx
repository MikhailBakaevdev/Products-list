import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { DataTable } from './pages/list';
import { CreateEditForm } from './entities/createEditForm';


export default function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<DataTable />} />
            <Route path="productForm/:id?" element={<CreateEditForm />} />
      </Routes>
    </Router>
  );
}
