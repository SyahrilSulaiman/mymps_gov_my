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

export default function CardUser() {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState([]);

  useEffect(() =>{
        setLoading(true);
        axios.get('https://mymps.corrad.my/int/api_generator.php?api_name=user_list')
      .then(res => {
          if (res.data.status === 'success'){
              console.log(JSON.parse(res.data.data));
            setUser(JSON.parse(res.data.data));
            setLoading(false);
          }
      });
      
  },[])
  
  const handleDelete = (e) => {
      console.log('Delete');
  }
  const handleEdit = (e) => {
      console.log('Edit');
  }

  if(loading === false){
    let bil = 0;
    const users = user.length ? (
    
        user.map(data => {
            bil++;
            return (
                <div key = {data.U_USERIC}>
                    <div className="flex-auto pb-4 px-4">
                        <div className="flex flex-row border-b border-gray-400">
                            <div className="relative w-2/12 md:w-1/12 pr-4">
                                <span className="font-semibold uppercase text-sm text-gray-700">
                                {bil}
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
                                <button onClick={(e) => handleEdit(e)}>
                                    <i className="fas fa-edit" style={{color:"green"}}></i>
                                </button>
                                <button onClick={(e) => handleDelete(e)}>
                                    <i className="far fa-trash-alt" style={{color:"red"}}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    ) : (<div></div>);
        return (
            <div>
                {users}
            </div>
        );
    }
    else{
        return (
            <>
                Loading...
            </>
        );
    }
}

