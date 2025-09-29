import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './App.css';
import { Layout } from './Layout';
import { NavMenu } from './components/navmenu/NavMenu';
import { StoreTable } from './components/stores/StoreTable';

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    

    return (
      <BrowserRouter>
        
       

        <div className="min-h-screen bg-auto flex flex-col">
        <nav className="navbar">
        <div className="navbar-brand"><Link to="/NavMenu">Amila Onboarding</Link></div>
        <ul className="navbar-nav">
        {/* Notice the active link text is changed to "Stores" for this view */}
        <li><a href="#">Customers</a></li>
        <li><a href="#">Products</a></li>
        <li><Link to="/StoreTable">Stores</Link></li>
        <li><a href="#">Sales</a></li>
      </ul>
    </nav>

        <Routes>
        <Route path="/StoreTable" element={<StoreTable/> }/>
       </Routes>

            
     {/* <StoreTable />*/}

        </div>
        
     </BrowserRouter >
    );

   
}

export default App;
