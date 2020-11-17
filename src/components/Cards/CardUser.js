import React, {useState, useEffect} from "react";
import swal from "sweetalert";
import axios from "axios";
// components

// const useFormInput = (initialValue) => {
//   const [value, setValue] = useState(initialValue);

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };
//   return {
//     value,
//     onChange: handleChange,
//   };
// };

export default function CardUser({users,loading}) {

  const handleDelete = (e) => {
    //   console.log('Delete');
      swal("Adakah anda pasti?",{
          dangerMode:true,
          buttons:true
      }).then(result => {
          if(result){
            console.log(e+' Deleted');
          }
        })
  }
  const handleEdit = (e) => {
      console.log('Edit');
  }

  if(loading){
      return (
          <div className="">Loading...</div>
      );
  }
let bil = 1;
return (
    <div>
        {users.map((data,index) => (
            <div key = {data.U_USERIC}>
                <div className="flex-auto pb-4 px-4">
                    <div className="flex flex-row border-b border-gray-400">
                        <div className="relative w-2/12 md:w-1/12 pr-4">
                            <span className="font-semibold uppercase text-sm text-gray-700">
                            {index+1}
                            </span>
                        </div>
                        <div className="relative w-4/12 lg:w-3/12 pr-4 flex-grow">
                                <span className="font-semibold uppercase text-sm text-gray-700">
                                {
                                    data.U_USERIC === null ? data.U_USERNAME : data.U_USERIC
                                }
                                </span>
                        </div>
                        <div className="relative lg:w-6/12 pr-4 flex-grow hidden lg:block">
                                <span className="font-semibold uppercase text-sm md:text-sm  text-gray-700">
                                {
                                    data.U_USERNAME

                                }
                                </span>
                        </div>
                        <div className="relative lg:w-2/12 pr-4 flex-grow hidden lg:block">
                                <span className="font-semibold uppercase text-sm text-gray-700">
                                {
                                    data.U_USERPHONE

                                }
                                </span>
                        </div>
                        <div className="relative w-4/12 lg:w-2/12 pr-4 flex-initial">
                            <span className={"font-semibold uppercase text-xs "+ (data.U_USERSTATUS === 'Active' ? 'text-green-600' : data.U_USERSTATUS === 'Pending' ? 'text-yellow-600' : 'text-red-600')}>
                            {
                                data.U_USERSTATUS

                            }
                            </span>
                        </div>
                        <div className="relative w-1/12 w-auto pl-4 flex-initial">
                            <button onClick={(e) => handleEdit(data.U_USERIC)}>
                                <i className="fas fa-edit" style={{color:"green"}}></i>
                            </button>
                            <button onClick={(e) => handleDelete(data.U_USERIC)}>
                                <i className="far fa-trash-alt" style={{color:"red"}}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
)
}

