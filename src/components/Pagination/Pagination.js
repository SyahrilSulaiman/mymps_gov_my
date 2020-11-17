import { paginationReducer } from '@material-ui/data-grid';
import React from 'react'

 export const Pagination = ({usersPerPage, totalUsers, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <div className="bg-blue-100 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <nav className="relative z-0 inline-flex shadow-sm">
                {pageNumbers.map(number => (       
                    <div  key={number}>           
                        <a onClick={() => paginate(number)} href="#!" className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">{number}</a>
                    </div>
                ))}
            </nav>
        </div>

    )
}

export default Pagination;