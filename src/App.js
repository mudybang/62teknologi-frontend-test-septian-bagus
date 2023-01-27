import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link 
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import BusinessList from "./components/BusinessList";
import BusinessTable from "./components/BusinessTable";
import BusinessDetails from "./components/BusinessDetails";

function App() {
  return (
    <Router>
      <CssBaseline />
      <div className="App">
        <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
          <Link to="/">List</Link>
          <Link to="/table">Table</Link>
        </Stack>
        <Routes>
              <Route exact path='/' element={< BusinessList />}></Route>
              <Route exact path='/table' element={< BusinessTable />}></Route>
              <Route exact path='/business/:id' element={< BusinessDetails />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
