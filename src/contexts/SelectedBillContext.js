import React, { createContext, useState, useEffect } from 'react';

export const SelectedBillContext = createContext();

const SelectedBillContextProvider = (props) => {
    const [selectedBil,setSelectedBil] = useState([]);
    
    const addSelectedBill = (account,amount) => {
        let newArray = [...selectedBil]
        let index = newArray.findIndex(element => element.account === account)
        if(index !== -1){
          newArray.splice(index,1);
          setSelectedBil(newArray);
        }
        else{
          setSelectedBil([...selectedBil,{account,amount}])
        }
    }

    const resetSelectedBill = () => {
        setSelectedBil([]);
    }
    
    useEffect(() => {
		console.log('Selected Bil :', selectedBil)
    },[selectedBil])
    
    return ( 
        <SelectedBillContext.Provider value={{selectedBil, addSelectedBill, resetSelectedBill}}>
            {props.children}
        </SelectedBillContext.Provider>
     );
}
 
export default SelectedBillContextProvider;