import AddNew from "./AddNew";
import List from "./List";
import { Routes, Route, Link } from 'react-router-dom';
import { variables} from './Variables.js';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation();
  const[list, setList] = useState([]);

  const fetchList = () => {
    fetch(variables.API_URL+'contact')
    .then(response => response.json())
    .then(data => setList(data))
  }

  useEffect(() => {
    fetchList();
  },[location])

  return (
    <div className="App">
      <nav className="navbar">
          <div className="links">
            <Link to='/add'>Add New</Link>
            <Link to='/all-contacts'>View All</Link>
            <Link to='/suppliers'>Suppliers</Link>
            <Link to='/customers'>Customers</Link>
          </div>
      </nav>
      <Routes>
              <Route exact path='/' element={<List allContacts={list}/>}></Route>
              <Route exact path='/add' element={<AddNew edit='false'/>}></Route>
              <Route exact path='/all-contacts' element={<List allContacts={list}/>}></Route>
              <Route exact path='/suppliers' element={<List allContacts={list}/>}></Route>
              <Route exact path='/customers' element={<List allContacts={list}/>}></Route>
              <Route exact path='/edit' element={<AddNew edit='true'/>}></Route>
      </Routes>
    </div>

   
  );
}

export default App;
