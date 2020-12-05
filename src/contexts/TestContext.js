import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const TestContext = createContext();

const TestContextProvider = (props) => {
    const [bank,setBank] = useState(null);
    useEffect(()=> {
        axios.get('https://toyyibpay.com/api/getBankFPX').then(res => {
            setBank(res.data);
            console.log(res.data);
        })
    },[])

    if (bank != null){
        return (
            <TestContext.Provider value={{bank}}>
                {props.children}
            </TestContext.Provider>
        );
    }
    else{
        return (
            <div></div>
        )
    }
}

export default TestContextProvider;
