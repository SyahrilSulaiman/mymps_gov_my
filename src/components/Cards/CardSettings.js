import React, { useState } from "react";
import { Pane, Button, Heading, TextInputField, Text } from "evergreen-ui";
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

export default function CardSettings({ 
  nama = "",
  nokp = "",
  email = "",
  notel = "",
  color = "blue",
}) {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [namapenuh, setUsername] = useState(nama);
  const [kadpengenalan, setIC] = useState(nokp);
  const [emel, setEmail] = useState(email);
  const [telefon, setTelephone] = useState(notel);           
  const [password, setPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [conf_password, setConformPassword] = useState("");
  const [openTab, setOpenTab] = useState(1);

  const handleUpdate = () => {

    if (namapenuh == "") {
      swal("Opss!", "Kata nama tidak boleh dikosongkan.", "error");
      return false;
    }
    else if (emel == "") {
      swal("Opss!", "Emel tidak boleh dikosongkan", "error");
      return false;
    }
    else if (telefon == "") {
      swal("Opss!", "Nombor telefon tidak boleh dikosongkan", "error");
      return false;
    }
    else {

      var formdata = new FormData();

      formdata.append("username", namapenuh.trim());
      formdata.append("email", emel.trim());
      formdata.append("nokp", kadpengenalan);
      formdata.append("notel", telefon.trim());

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      var urlAPI = "https://mymps.corrad.my/int/api_generator.php?api_name=update_profile";

      fetch(urlAPI, requestOptions)
        .then(response => response.json())
        .then(result => {

          if (result.status == "success") {

            setLoading("false");
            swal("Berjaya!", "Akaun profil anda sudah dikemaskini.", "success");

            sessionStorage.removeItem('username');
            sessionStorage.setItem('username', result.data[0]["U_USERNAME"]);

            sessionStorage.removeItem('email');
            sessionStorage.setItem('email', result.data[0]['U_USEREMAIL']);

            window.location.href = "./setting";

          }
          else {
            setLoading("false");
            swal("Ralat!", "Kemaskini tidak berjaya.", "error");
          }

        })
    }
  }

  const handleChangePassword = () => {

    if (password == "") {
      swal("Opss", "Sila isi kata laluan terkini.", "error");
    } else if (new_password == "") {
      swal("Opss", "Sila isi kata laluan yang baru.", "error")
    } else if (conf_password == "") {
      swal("Opss", "Sila isi pengesahan kata laluan yang baru.", "error")
    } else if (new_password !== conf_password) {
      swal("Opss", "Kata laluan anda tidak sah", "error")
    } else {

      console.log(password);
      console.log(new_password);
      console.log(conf_password);
      swal({
        title: "Set Semula Kata Laluan",
        text: "Anda pasti untuk set semula kata laluan akaun anda?",
        button: true,
        dangerMode: true,
      }).then((change) => {
        if (change) {
          swal("Kata laluan akaun anda sudah dikemaskini!");
        } else {

        }
      })
    }
  }

  return (
    <>

      <div className="w-full">
        <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row justify-center" role="tablist">
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
              Profil
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
              Kata Laluan
              </a>
          </li>
        </ul>

        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <p>
                  <Pane display="flex" padding={10} background="#dfe6e9" borderRadius={5}>
                    <Pane flex={1} alignItems="center" display="flex">
                      <Text size={600}>Profil Akaun myMPS</Text>
                    </Pane>
                  </Pane>

                  <Pane display="flex" padding={3} background="tint3" borderRadius={3} marginTop="30px">
                    <Pane flex={1} alignItems="center">
                      <TextInputField
                        label="NAMA PENUH"
                        width="100%"
                        placeholder="Sila isi nama penuh anda"
                        required={true}
                        defaultValue={namapenuh}
                        onChange={(e) => setUsername(e.target.value)}
                      />

                      <TextInputField
                        label="NOMBOR KAD PENGENALAN"
                        width="100%"
                        placeholder="Sila isi nombor kad pengenalan anda"
                        required={true}
                        disabled
                        defaultValue={kadpengenalan}
                      />

                      <TextInputField
                        label="ALAMAT EMEL"
                        width="100%"
                        placeholder="Sila isi alamat emel anda"
                        required={true}
                        defaultValue={emel}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <TextInputField
                        label="NOMBOR TELEFON"
                        width="100%"
                        placeholder="Sila isi nombor telefon anda"
                        required={true}
                        defaultValue={telefon}
                        onChange={(e) => setTelephone(e.target.value)}
                      />
                    </Pane>
                  </Pane>
                  <Pane>
                    <Button
                      className="float-right"
                      appearance="primary"
                      intent="success"
                      type="button"
                      onClick={handleUpdate}
                    >
                      Kemaskini
                    </Button>
                  </Pane>
                  </p>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <p>
                  <Pane display="flex" padding={10} background="#636e72" borderRadius={5}>
                    <Pane flex={1} alignItems="center" display="flex">
                      <Text size={600} color="white">Set Kata Laluan</Text>
                    </Pane>
                  </Pane>

                  <Pane display="flex" padding={16} background="tint3" borderRadius={3}>
                    
                  </Pane>
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>



      {/* <div className="w-full lg:w-6/12 shadow-lg bg-gray-400 rounded-2xl mb-5 h-full">
        <div className="rounded-t-2xl bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <Heading size={600}>Akaun myMPS</Heading>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">

            </h6>
            <div className="flex flex-wrap">

              <div className="w-full  px-4">
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

              <div className="w-full  px-4">
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

              <div className="w-full  px-4">
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

              <div className="w-full px-4">
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
                  <Button
                    className="float-right"
                    appearance="primary"
                    intent="success"
                    type="button"
                    onClick={handleUpdate}
                  >
                    Kemaskini
                  </Button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>

      <div className=" w-full lg:w-6/12 shadow-lg  bg-gray-300 rounded-xl" style={{marginBottom:"500px"}}>
        <div className="rounded-t-xl bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
          <Heading size={600}>Set semula kata laluan</Heading>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blue-500 text-sm mt-3 mb-6 font-bold uppercase">

            </h6>
            <div className="flex flex-wrap">

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kata Laluan Sekarang
                  </label>
                  <input
                    type="text"
                    id="username"
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kata Laluan Baru
                  </label>
                  <input
                    type="email"
                    id="email"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Pengesahan Kata Laluan
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setConformPassword(e.target.value)}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

            </div>

            <hr className="mt-6 border-b-1 border-gray-400" />

            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <Button 
                  className="float-right"
                  type="button"
                  intent="success"
                  appearance="primary"
                  onClick={handleChangePassword}
                  >Kemaskini
                  </Button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div> */}
    </>
  );
}
