
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import './App.css'
import Dashboard from "./components/dashboard/Dashboard"
import AddItem from "./components/add-item/AddItem"
import Patrons from "./components/patrons/Patrons"
import AddPatron from "./components/add-patron/AddPatron"
import ManageFines from "./components/manage-fines/ManageFines"
import Checkout from "./components/checkout/Checkout"
import Checkin from "./components/checkin/Checkin"
import Header from "./components/header/Header"
import Layout from "./components/layout/Layout"
import SearchBar from "./components/search-bar/SearchBar"

function App(){

  return (
    <>
      <BrowserRouter>
      <Header />
      <SearchBar /> 
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" /> } />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/patrons" element={<Patrons />} />
            <Route path="/add-patron" element={<AddPatron />} /> 
            <Route path="/manage-fines" element={<ManageFines />} />
            <Route path="/checkout" element={<Checkout /> } />
            <Route path="/checkin" element={<Checkin /> } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}


export default App
