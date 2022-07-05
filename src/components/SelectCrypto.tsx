import React, { useEffect, useState } from 'react'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { Box } from '@mui/system';
import { selectcryptoprops } from '../types/Props_types';
import { crypto } from '../types/Component_types';
import { Divider, ListItemIcon } from '@mui/material';
import {ReactComponent as ReactLogo} from '../eth.svg';


const SelectCrypto: React.FC <selectcryptoprops> = (props: selectcryptoprops) => {
  
  const[apiResponse,setApiResponse]=useState<crypto[]>()
  useEffect(() =>{
    axios.get("https://api.coingecko.com/api/v3/exchange_rates")
    .then(
        response=>{
            let listItems:crypto[]=[]
            Object.entries(response.data.rates).filter((crypto:any)=>crypto[1].type==="crypto").forEach((item:any)=>{
              listItems.push({
                curName:item[0].toUpperCase(),
                valueCur:item[1].value
              })
            })

            setApiResponse(listItems)

        }
        )
    .catch(error=>console.log(error))

  },[])


function handleClick(e:string){
  props.setSearchText(e)
}
  return (
    <>
 <Box sx={{ bgcolor: 'orange',border: '1px solid orange',color: 'white',padding: '10px'}} className="select_container">
        <h2>Bitcoin Exchange Rate</h2>
        <Divider/>
        <List className="currency_items">
        {
            apiResponse?.map(( cryptoDetails) => (
                <ListItem disablePadding key={cryptoDetails.curName} className="currency_listitems">
                <ListItemButton onClick={()=>{
                    handleClick(cryptoDetails.curName)
                    props.handleIsClicked(true)
                }}>
                  <ListItemIcon>
                    <img src={"https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/32/black/"+cryptoDetails.curName.toLocaleLowerCase()+".png"} alt=""/> 
                  </ListItemIcon>
                  <ListItemText primary= {`${cryptoDetails.curName} : ${cryptoDetails.valueCur}`} style={{ textAlign: 'center',marginLeft: "4px" }}/>
                </ListItemButton>
              </ListItem>))
        }

        </List>
    </Box>
    </>
  )
}

export default SelectCrypto