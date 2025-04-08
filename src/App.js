import {Routes, BrowserRouter,Route} from "react-router-dom"
import './App.css';
import Home from "./page/Home"
import Dashboard from "./page/Dashbord"
import Login from "./page/Login";
import Registration from "./page/Registration";
import Product from "./page/Product";
import Productlist from "./page/Productlist";
import Productcard from "./page/ProductCard";
function App() {
  return (
   <>
  < BrowserRouter>
  <Dashboard />
  <Routes>
    <Route path= "/" element={<Home/>}/> 
    <Route path= "/login" element={<Login/>}/> 
    <Route path= "/registration" element={<Registration/>}/>
    <Route path= "/product" element={<Product/>}/>  
    <Route path="/product/:id" element={<Product />} />
    <Route path= "/productlist" element={<Productlist/>}/>
    <Route path= "/productcard" element={<Productcard/>}/>
    <Route path= "/productcard/:id" element={<Productcard/>}/>

  </Routes>
  </BrowserRouter>
   
   </>
  );
}

export default App;
