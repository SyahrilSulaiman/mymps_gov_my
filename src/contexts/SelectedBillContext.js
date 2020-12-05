import React, { createContext, useState, useEffect } from 'react';
import { AddIcon, CrossIcon } from "evergreen-ui";

export const SelectedBillContext = createContext();

const SelectedBillContextProvider = (props) => {
    const [selectedBil,setSelectedBil] = useState([]);
    const [unpaidBil, setUnpaidBil] = useState([]);

    const handleUnpaidBil = (dataset) => {
      const results = dataset.data.filter( json => json.STATUS.toUpperCase().includes('PENDING PAYMENT'))
      setUnpaidBil(results); 
    }

    useEffect(() => {
      // console.log('Unpaid : ', unpaidBil)
    },[unpaidBil])
    
    const addSelectedBill = (account,amount) => {
        let newArray = [...selectedBil]
        let index = newArray.findIndex(element => element.NOAKAUN === account)
        if(index !== -1){
          newArray.splice(index,1);
          setSelectedBil(newArray);
        }
        else{
          setSelectedBil([...selectedBil,{NOAKAUN:account,BAKI_TUNGGAK:amount}])
        }
    }

    const handleSelectedBil = (account) => {
        let newArray = [...selectedBil]
        let index = newArray.findIndex(element => element.NOAKAUN === account)
        if(index !== -1){
          return <CrossIcon marginTop={40} marginLeft={10} color="danger"/>
        }
        else{
          return <AddIcon marginTop={40} marginLeft={10} color="success"/>
        }
    }

    const resetSelectedBill = () => {
        setSelectedBil([]);
    }
    
    useEffect(() => {
		// console.log('Selected Bil :', selectedBil)
    },[selectedBil])
    
    return ( 
        <SelectedBillContext.Provider value={{selectedBil, addSelectedBill, resetSelectedBill, handleSelectedBil, handleUnpaidBil, unpaidBil}}>
            {props.children}
        </SelectedBillContext.Provider>
     );
}
 
export default SelectedBillContextProvider;