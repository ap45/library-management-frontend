import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from "./components/dashboard/Dashboard";
import AddItem from "./components/add-item/AddItem";
import AddPatron from "./components/add-patron/AddPatron";
import Checkout from "./components/checkout/Checkout";
import Checkin from "./components/checkin/Checkin";
import Reservation from "./components/reservation/Reservation";
import Renewal from "./components/renewal/Renewal";
import ItemList from "./components/item-list/ItemList";
import Header from "./components/header/Header";
import Layout from "./components/layout/Layout";

// import SearchBar from "./components/search-bar/SearchBar"; search bar scrapped

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main-content">
        {/* <SearchBar /> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-item" element={<AddItem />} />
            <Route path="add-patron" element={<AddPatron />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkin" element={<Checkin />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="renewal" element={<Renewal />} />
            <Route path="item-list" element={<ItemList />} /> 
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;