import React,{ useState, useEffect } from 'react'

export default function SenaraiCarianCukai({result, currentPage, resultPerPage, }){
    return (
        <>
        {
            result.map((res,index) => 
            <tr key={index}>
                <td className="border px-8 py-4">{index+1+((currentPage-1)*resultPerPage)}</td>
                <td className="border px-8 py-4">{res.account_id}</td>
                <td className="border px-8 py-4">{res.invoice_no}</td>
                <td className="border px-8 py-4">{res.date}</td>
                <td className="border px-8 py-4">RM&nbsp;{res.amount}</td>
            </tr>
        )
        }
        </>
    );
}