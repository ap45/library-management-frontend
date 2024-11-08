import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from "./components/dashboard/Dashboard";
import AddItem from "./components/add-item/AddItem";
import AddPatron from "./components/add-patron/AddPatron";
import ManageFines from "./components/manage-fines/ManageFines";
import Checkout from "./components/checkout/Checkout";
import Checkin from "./components/checkin/Checkin";

import Header from "./components/header/Header";
import Layout from "./components/layout/Layout";
import SearchBar from "./components/search-bar/SearchBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-item" element={<AddItem />} />
            <Route path="add-patron" element={<AddPatron />} />
            <Route path="manage-fines" element={<ManageFines />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkin" element={<Checkin />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;