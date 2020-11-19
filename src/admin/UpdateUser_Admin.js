import Axios from "axios";
import React, {useState, useEffect} from "react";
import swal from "sweetalert";
import Sidebar from "../admin/Sidebar_Admin";
import Navbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footers/Footer";
import { get } from "jquery";
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

export default function CardSettings() {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users,setUsers] = useState([]);

    useEffect(() => {
        console.log(sessionStorage.user);
        console.log(atob(sessionStorage.user));
        let formData = new FormData();
        formData.append("nokp",atob(sessionStorage.user));
        const fetchUser = async () =>{
            setLoading(true);
            const res = await Axios.post('https://mymps.corrad.my/int/api_generator.php?api_name=get_user',formData)
            .then(response => {
                // setUsers(response.data.data);
                if(response.data.status === 'success'){
                    setUsers(response.data.data[0]);
                    // console.log(users);
                    console.log('Response',response);
                    console.log('Users :',users);
                }else{
                    swal('Masaalah Teknikal','Hubungi pentadbir system','error');
                    window.location.href = './usermanagement';
                }
                setLoading(false);
            })
            
            

        }
        fetchUser();
        // console.log('Users :',users);
    },[]);

    const handleDelete = () => {
        console.log('delete');
    }
    const handleUpdate = () => {

        // var username  = document.getElementById("username").value;
        // var email     = document.getElementById("email").value;
        // var notel     = document.getElementById("notel").value;

        // const username = useFormInput("");
        // const email = useFormInput("");
        // const notel = useFormInput("");
        // const status = useFormInput("");
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const notel = document.getElementById("notel").value
        const status = document.getElementById("status").value
    
        if(username == "")
        {
          swal("Opss!", "Kata nama tidak boleh dikosongkan.","error");
          return false;
        }
        else if(email == "")
        {
          swal("Opss!", "Emel tidak boleh dikosongkan","error");
          return false;
        }
        else if(notel == "")
        { 
          swal("Opss!", "Nombor telefon tidak boleh dikosongkan","error");
          return false;
        }
        else
        {
    
          var formdata = new FormData();
    
            // formdata.append("username", username.trim());
            // formdata.append("email", email.trim());
            // formdata.append("nokp", user);
            // formdata.append("notel", notel.trim());
    
            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };
    
            var urlAPI = "https://mymps.corrad.my/int/api_generator.php?api_name=update_profile";
    
            fetch(urlAPI, requestOptions)
            .then(response => response.json())
            .then(result => {
    
              if(result.status == "success"){
    
                setLoading("false");
                swal("Berjaya!","Akaun profil anda sudah dikemaskini.","success");
    
                sessionStorage.removeItem('username');
                sessionStorage.setItem('username', result.data[0]["U_USERNAME"]);
    
                sessionStorage.removeItem('email');
                sessionStorage.setItem('email', result.data[0]['U_USEREMAIL']);
    
                window.location.href = "./admin/usermanagement";
    
              }
              else
              {
                setLoading("false");
                swal("Ralat!","Kemaskini tidak berjaya.","error");
              }
    
            })
        }
      }
      if(loading){
        return (
            <div className="">Loading...</div>
        );
    }

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-blue-400" style={{ height: "100%" }}>
        <Navbar />
        {/* Header */}
        <div className="relative bg-blue-600 md:pt-32 pb-16 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">

              <div className="relative flex flex-col min-w-0 break-words w-full h-full shadow-lg  bg-gray-300 border-0">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-gray-800 text-xl font-bold">Akaun mymps</h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                    
                  </h6>
                  <div className="flex flex-wrap">
      
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Nama Penuh 
                        </label>
                        <input
                          type="text"
                          id="username"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          defaultValue={users.U_USERNAME}
                        />
                      </div>
                    </div>
      
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          NOMBOR KAD PENGENALAN
                        </label>
                        <input
                          type="text"
                          readOnly
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-200 rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          defaultValue={users.U_USERIC}
                        />
                      </div>
                    </div>
      
                    <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Alamat Emel
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        defaultValue={users.U_USEREMAIL}
                      />
                    </div>
                  </div>
      
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          NOMBOR TELEFON
                        </label>
                        <input
                          type="text"
                          id="notel"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          defaultValue={users.U_USERPHONE}
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Status
                        </label>
                        <input
                          type="text"
                          id="status"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          defaultValue={users.U_USERSTATUS}
                        />
                      </div>
                    </div>
      
                  </div>
      
                  <hr className="mt-6 border-b-1 border-gray-400" />
                  <div className="flex flex-wrap mt-6">
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                        <button type="button" onClick={handleUpdate} className="bg-green-500 hover:bg-green-700 text-white py-2 px-3 rounded float-right">
                            Kemaskini
                        </button>
                        </div>
                    </div>
                    </div>
                  <div className="flex flex-wrap mt-6">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-green-700 text-white py-2 px-3 rounded float-right">
                          Padam
                        </button>
                      </div>
                    </div>
                  </div>
                  
                </form>
              </div>
            </div>
              
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );

}
