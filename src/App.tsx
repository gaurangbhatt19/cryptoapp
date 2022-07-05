import React, { useState } from 'react';
import './App.css';
import SelectCrypto from './components/SelectCrypto';
import TradeList from './components/TradeList';
import { Grid } from '@mui/material';

function App() {
const [searchText,setSearchText]=useState<string|null>(null)
const[isClicked,setIsClicked]=useState<boolean>(false)
  return (
    <div className="App">
      <div className="app_container">
        <Grid container spacing={2}>
          
          <Grid item md={6}>
            <SelectCrypto setSearchText={setSearchText} handleIsClicked={setIsClicked}/>
           </Grid>
  
          <Grid item md={6}>
            <TradeList searchedCrypto={searchText} isClicked={isClicked}/>
          </Grid>
        
      </Grid>
      </div>
    </div>
  );
}

export default App;
