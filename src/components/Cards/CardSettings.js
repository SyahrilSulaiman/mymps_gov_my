import React, {useState} from "react";
import swal from "sweetalert";

// components

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default function CardSettings({notel=""}) {

  console.log(notel);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const username  = sessionStorage.getItem('username');
  const email     = sessionStorage.getItem('email');
  const nokp      = sessionStorage.getItem('nokp');

  const handleUpdate = () => {

    var username  = document.getElementById("username").value;
    var email     = document.getElementById("email").value;
    var notel     = document.getElementById("notel").value;

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

        formdata.append("username", username.trim());
        formdata.append("email", email.trim());
        formdata.append("nokp", nokp);
        formdata.append("notel", notel.trim());

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

            window.location.href = "./setting";

          }
          else
          {
            setLoading("false");
            swal("Ralat!","Kemaskini tidak berjaya.","error");
          }

        })
    }
  }

  return (
    <>
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
                    {...username}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={sessionStorage.getItem("username")}
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
                    {...nokp}
                    readOnly
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-gray-200 rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue={sessionStorage.getItem("nokp")}
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
                  {...email}
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  defaultValue={sessionStorage.getItem("email")}
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
                    defaultValue={notel}
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
            
          </form>
        </div>
      </div>
    </>
  );
}
