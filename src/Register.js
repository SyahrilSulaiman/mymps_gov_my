import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "./Utils/Common";
import logo1 from "./assets/img/logo1.png";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";
import swal from "sweetalert";

function Register(props) {

  sessionStorage.removeItem('GoogleToken');
  sessionStorage.removeItem('GoogleEmail');
  sessionStorage.removeItem('GoogleName');

  const username = useFormInput("");
  const password = useFormInput("");
  const confpassword = useFormInput("");
  const email = useFormInput("");
  const confemail = useFormInput("");
  const nokp = useFormInput("");
  const ssm = useFormInput("");
  const notel = useFormInput("");
  const color = "blue";

  var numbers = /^[0-9]+$/;

  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegisterIndividu = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if(username.value == "")
    {
      swal("Opss!", "Sila masukkan kata nama anda.","error");
      return false;
    }
    else if(nokp.value == "")
    {
      swal("Opss!", "Sila masukkan nombor kad pengenalan anda.","error");
      return false;
    }
    else if(nokp.value.length < 12 || nokp.value.length > 12){
      swal("Opss!", "No kad pengenalan yang anda masuk tidak sah.","error");
      return false;
    }
    else if(!nokp.value.match(numbers)){
      swal("Opss!", "No kad pengenalan yang anda masuk tidak sah.","error");
      return false;
    }
    else if(email.value == "")
    {
      swal("Opss!", "Sila masukkan emel anda.", "error");
      return false;
    }
    else if(email.value !== confemail.value){
      swal("Opss!", "Sila pastikan emel dan emel pengesahan sah.", "error");
      return false;
    }
    else if(password.value == "")
    {
      swal("Opss!", "Sila masukkan kata laluan anda.", "error");
      return false;
    }
    else if(password.value !== confpassword.value)
    {
      swal("Opss!", "Sila pastikan kataluan dan sah kata laluan sama.", "error");
      return false;
    }
    else if(password.value.length < 6)
    { 
      swal("Opss!", "Kata laluan anda tidak selamat. Sila cuba lagi.", "error");
      return false;
    }
    else{
      
      if(nokp.value.match(numbers)){
        
        var formdata = new FormData();
        formdata.append("username", username.value);
        formdata.append("password", password.value);
        formdata.append("email", email.value);
        formdata.append("nokp", nokp.value);
        formdata.append("notel", notel.value);

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        var urlAPI = "https://mymps.corrad.my/int/api_generator.php?api_name=daftar_pengguna";

        fetch(urlAPI, requestOptions)
        .then(response => response.json())
        .then(result => {

          if(result.status == "success"){

            setLoading("false");
            swal("Tahniah!","Pendaftaran sebagai pengguna MyMPS berjaya! Sila sahkan akaun anda sebagai pengguna melalui klik pada pautan di emel anda.","success");

            //setUserSession(btoa(formdata), username.value, nokp.value, email.value);
            props.history.push("/login");

          }else{
            setLoading("false");
            swal("Ralat!","Pendaftaran pengguna tidak berjaya!","error");
            
          }

        })

      }
    }
  };

  const handleRegisterSyarikat = (e) => {

    e.preventDefault();
    setError(null);
    setLoading(true);

    if(username.value == "")
    {
      swal("Opss!", "Sila masukkan nama syarikat anda.","error");
      return false;
    }
    else if(ssm.value == "")
    {
      swal("Opss!", "Sila masukkan nombor pendaftaran syarikat anda.","error");
      return false;
    }
    else if(email.value == "")
    {
      swal("Opss!", "Sila masukkan emel anda.", "error");
      return false;
    }
    else if(email.value !== confemail.value){
      swal("Opss!", "Sila pastikan emel dan emel pengesahan sah.", "error");
      return false;
    }
    else if(password.value == "")
    {
      swal("Opss!", "Sila masukkan kata laluan anda.", "error");
      return false;
    }
    else if(password.value !== confpassword.value)
    {
      swal("Opss!", "Sila pastikan kataluan dan sah kata laluan sama.", "error");
      return false;
    }
    else if(password.value.length < 6)
    { 
      swal("Opss!", "Kata laluan anda tidak selamat. Sila cuba lagi.", "error");
      return false;
    }
    else{
      
      if(1){
        
        var formdata = new FormData();
        formdata.append("username", username.value);
        formdata.append("password", password.value);
        formdata.append("email", email.value);
        formdata.append("nokp", ssm.value);
        formdata.append("notel", notel.value);

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        var urlAPI = "https://mymps.corrad.my/int/api_generator.php?api_name=daftar_pengguna";

        fetch(urlAPI, requestOptions)
        .then(response => response.json())
        .then(result => {

          if(result.status == "success"){

            setLoading("false");
            swal("Tahniah!","Pendaftaran sebagai pengguna MyMPS berjaya! Sila sahkan akaun anda sebagai pengguna melalui klik pada pautan di emel anda.","success");

            //setUserSession(btoa(formdata), username.value, ssm.value, email.value);
            props.history.push("/login");

          }else{
            setLoading("false");
            swal("Ralat!","Pendaftaran pengguna tidak berjaya!","error");
            
          }

        })

      }
    }
  }

  const [openTab, setOpenTab] = React.useState(1);

  return (
    <div className="bg-gray">
      <IndexNavbar fixed />

      
      <section className="py-20 relative" style={{background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>

      <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">

                {/* <img className="mx-auto" src={logo1} style={{width:"120px", height:"120px"}}/> */}
                    <h1 class="mb-8 text-xl text-gray-700 text-center mt-6" style={{marginTop: "30px"}}>Pendaftaran Pengguna MyMPS</h1>

                    {/* <p className="mt-1 text-sm leading-5 text-gray-600 text-center" style={{marginTop: "30px"}}>
                      Selamat Datang ke laman daftar sebagai pengguna Majlis Perbandaran Selayang 2020. Sila pastikan setiap maklumat diisi lengkap sebelum daftar sebagai pengguna.
                    </p> */}

                    <div className="flex flex-wrap p-2">
                      <div className="w-full">
                        <ul
                          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                          role="tablist"
                        >
                          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                              className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 1
                                  ? "text-white bg-" + color + "-600"
                                  : "text-" + color + "-600 bg-white")
                              }
                              onClick={e => {
                                e.preventDefault();
                                setOpenTab(1);
                              }}
                              data-toggle="tab"
                              href="#link1"
                              role="tablist"
                            >
                              Individu
                            </a>
                          </li>
                          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                              className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 2
                                  ? "text-white bg-" + color + "-600"
                                  : "text-" + color + "-600 bg-white")
                              }
                              onClick={e => {
                                e.preventDefault();
                                setOpenTab(2);
                              }}
                              data-toggle="tab"
                              href="#link2"
                              role="tablist"
                            >
                              Syarikat
                            </a>
                          </li>
                        </ul>
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                          <div className="flex-auto">
                            <div className="tab-content tab-space">
                              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
<form onSubmit={ (e) => handleRegisterIndividu(e)}>
                                <div className="col-span-6 sm:col-span-3 p-2" style={{marginTop: "30px"}}>
                                  <label for="first_name" className="block text-sm font-medium leading-5 text-gray-700">Nama Penuh</label>
                                  <input {...username} id="name" placeholder="cth: adrian" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 p-2">
                                  <label for="last_name" className="block text-sm font-medium leading-5 text-gray-700">No. Kad Pengenalan</label>
                                  <input {...nokp} id="nokp" placeholder="cth: 923456061278" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 p-2">
                                  <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">No. Telefon</label>
                                  <input {...notel} id="notel" placeholder="cth: 0123456789" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 p-2">
                                  <label for="email_address" className="block text-sm font-medium leading-5 text-gray-700">Alamat Emel</label>
                                  <input {...email} id="email_address" placeholder="cth: malik@email.com" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 p-2">
                                  <label for="email_address" className="block text-sm font-medium leading-5 text-gray-700">Sah Alamat Emel</label>
                                  <input {...confemail} id="conf_email_address" placeholder="cth: malik@email.com" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 p-2">
                                  <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">Kata Laluan</label>
                                  <input {...password} type="password" id="password" placeholder="cth: 12345678" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 p-2">
                                  <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">Sah Kata Laluan</label>
                                  <input {...confpassword} type="password" id="conf_password" placeholder="cth: 12345678" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <button
                                    type="submit"
                                    
                                    class="w-full text-center rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-5 p-2"
                                >Daftar Pengguna
                                </button>
</form>
                              </div>
                              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
<form onSubmit={ (e) => handleRegisterSyarikat(e)}>
                                <div className="col-span-6 sm:col-span-3 p-2" style={{marginTop: "30px"}}>
                                  <label for="first_name" className="block text-sm font-medium leading-5 text-gray-700">Nama Penuh</label>
                                  <input {...username} id="name" placeholder="cth: adrian" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 p-2">
                                  <label for="last_name" className="block text-sm font-medium leading-5 text-gray-700">No. Syarikat / SSM </label>
                                  <input {...ssm} id="ssm" placeholder="cth: A450P45" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 p-2">
                                  <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">No. Telefon</label>
                                  <input {...notel} id="notel" placeholder="cth: 0123456789" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 p-2">
                                  <label for="email_address" className="block text-sm font-medium leading-5 text-gray-700">Alamat Emel</label>
                                  <input {...email} id="email_address" placeholder="cth: malik@email.com" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 p-2">
                                  <label for="email_address" className="block text-sm font-medium leading-5 text-gray-700">Sah Alamat Emel</label>
                                  <input {...confemail} id="conf_email_address" placeholder="cth: malik@email.com" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 p-2">
                                  <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">Kata Laluan</label>
                                  <input {...password} type="password" id="password" placeholder="cth: 12345678" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <div className="col-span-6 sm:col-span-3 p-2">
                                  <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">Sah Kata Laluan</label>
                                  <input {...confpassword} type="password" id="conf_password" placeholder="cth: 12345678" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                </div>

                                <button
                                    type="submit"
                                    class="w-full text-center rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-5 p-2"
                                >Daftar Pengguna
                                </button>
</form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="text-center text-sm text-grey-dark mt-4">
                        Dengan mendaftar ini, anda bersetuju dengan <a class="no-underline border-grey-dark text-grey-dark"> Terma & Syarat </a> dan 
                        <a class="no-underline border-grey-dark text-grey-dark"> Polisi Privasi </a> kami.
                    </div>

                    <div class="text-center text-grey-dark mt-6">
                      <a href="/login" className="font-extra-small text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                         Sudah mempunyai akaun? Log Masuk
                      </a>
                    </div>

                </div>

                
            </div>
        </div>

      {/* sample form */}
      {/* <div className=" sm:mt-0" style={{padding: "20px"}}>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 bg-gray-100" style={{padding: "20px", borderRadius: "10px"}}>
            <div className="px-4 sm:px-0">
              <img className="mx-auto" src={logo1} style={{width:"120px", height:"120px"}}/>
              <h3 className="text-lg font-medium leading-6 text-gray-900 text-center" style={{marginTop: "30px"}}>Daftar Pengguna</h3>
              <p className="mt-1 text-sm leading-5 text-gray-600" style={{marginTop: "30px"}}>
                Selamat Datang ke laman daftar sebagai pengguna Majlis Perbandaran Selayang 2020. Sila pastikan setiap maklumat diisi lengkap sebelum daftar sebagai pengguna.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">

                    <div className="col-span-6 sm:col-span-3">
                      <label for="first_name" className="block text-sm font-medium leading-5 text-gray-700">NAMA PENGGUNA</label>
                      <input {...username} id="name" placeholder="cth: adrian" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label for="last_name" className="block text-sm font-medium leading-5 text-gray-700">NO KAD PENGENALAN</label>
                      <input {...nokp} id="nokp" placeholder="cth: 923456061278" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label for="email_address" className="block text-sm font-medium leading-5 text-gray-700">ALAMAT EMEL</label>
                      <input {...email} id="email_address" placeholder="cth: malik@email.com" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label for="email_address" className="block text-sm font-medium leading-5 text-gray-700">SAHKAN ALAMAT EMEL</label>
                      <input {...confemail} id="conf_email_address" placeholder="cth: malik@email.com" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">KATA LALUAN</label>
                      <input {...password} id="password" placeholder="cth: 12345678" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label for="street_address" className="block text-sm font-medium leading-5 text-gray-700">SAHKAN KATA LALUAN</label>
                      <input {...confpassword} id="conf_password" placeholder="cth: 12345678" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6">
                      <a href="/login" className="font-small text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        <i className="fas fa-user"></i> Sudah mempunyai akaun? Log Masuk
                      </a>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 bg-gray-300">
                  <button onClick={handleRegister} type="button" className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
                    Daftar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      {/* sample form */}
      </section>

      {/* <section className="pb-16 bg-gray-300 relative pt-32">
        
      </section> */}

      <Footer />
    </div>
  );
}

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

export default Register;
