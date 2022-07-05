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
        <List className='trade_items'>
         <>

        {
          props.isClicked?tradeList.length!==0?tradeList.map((item:any,index:number) => (<li className="list_item" key={index}>{item.base_currency +" - "+ item.quote_currency}</li>)):<p>No trade available</p> : <p>No Currency is Selected</p>
        }
         </>
        
       
        </List>
      
    </Box>
  )
}

export default TradeList