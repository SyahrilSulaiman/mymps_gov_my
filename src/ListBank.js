import React, {useState, useEffect} from "react";

function ListBank(){

    const [bank, setBank] = useState({});

    useEffect(async () => {
        await fetch('https://dev.toyyibpay.com/api/getBankFPX')
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setBank(result);
        })
    },[])

    
    const bankk = bank.length ? (
        bank.map((bank) => {
            return (
                <button key={bank.CODE}>{bank.CODE}</button>
            );
        })
    ):(<div></div>)
        
    
}

export default ListBank;