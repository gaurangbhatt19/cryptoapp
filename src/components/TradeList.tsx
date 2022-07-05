import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { Box } from '@mui/system';
import { tradelistprops } from '../types/Props_types';
import { trade } from '../types/Component_types';


const TradeList: React.FC<tradelistprops> = (props:tradelistprops) => {

  const [listOfIds,setListOfIds]=useState<trade[]>([])

  useEffect(() => {
    let idsArray: trade[] = [];
    axios.get("https://api.exchange.coinbase.com/products").then((response) => {
      response.data.forEach((item:any) => {
        idsArray.push({
          base_currency:item.base_currency,
          quote_currency:item.quote_currency
        });
      })
      setListOfIds(idsArray);
    })
  },[])
  
  let isIncluded:boolean=false
  let tradeList:trade[]=  listOfIds?.filter((item:any) => {
    // comparing clicked crypto text with trade left right
     isIncluded= item.base_currency === props.searchedCrypto || item.quote_currency===props.searchedCrypto
    return  (isIncluded) && (props.searchedCrypto!==null)
    })

  
  return (
    <Box sx={{ bgcolor: 'white',border: '1px solid white',padding: '10px'}} className="trade_container">
        <h2>Currency Pair Trade</h2>
        <Divider/>
        {
        
        
        props.isClicked ?

        <List className='trade_items'>
         <>
        {
         tradeList.length!==0?tradeList.map((item:any,index:number) => (<li className="list_item" key={index}>{item.base_currency +" - "+ item.quote_currency}</li>)):<div style={{width:"45vw", color: 'red',textAlign: 'center'}}><p>No TradeList Available</p></div>
        }
         </>
        </List>

      : <div style={{color: 'green'}}><p>Please select Bitcoin exchange rate to view currency list</p></div>
        }
        
    </Box>
  )
}

export default TradeList