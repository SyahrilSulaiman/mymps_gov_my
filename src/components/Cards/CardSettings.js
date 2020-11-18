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
      
      swal("Anda pasti untuk set semula kata laluan anda?", {
        buttons: {
          tidak: {
            text:"Tidak",
            value:"cancel",
            className:"bg-red-500"
          },
          teruskan: {
            text:"Teruskan",
            value:"pasti",
            className:"bg-green-500 hover:bg-green-400 focus:bg-green-400"
          }
        }
      })
      .then((value) => {
        switch(value) {
          case "pasti":
            swal("Tukar Kata Laluan");
            break;
          
          case "cancel":
            break;

          default:
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
                  <Pane display="flex" padding={10} background="#dfe6e9" borderRadius={5}>
                    <Pane flex={1} alignItems="center" display="flex">
                      <Text size={600}>Set Kata Laluan</Text>
                    </Pane>
                  </Pane>

                  <Pane padding={3} background="tint3" borderRadius={3} marginTop="30px">
                      <TextInputField
                        label="KATA LALUAN TERKINI"
                        width="100%"
                        placeholder="Sila isi kata laluan terkini"
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <TextInputField
                        label="KATA LALUAN BARU"
                        width="100%"
                        placeholder="Sila isi kata laluan baru"
                        required={true}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />

                      <TextInputField
                        label="SAH KATA LALUAN BARU"
                        width="100%"
                        placeholder="Sila sahkan kata laluan baru"
                        required={true}
                        onChange={(e) => setConformPassword(e.target.value)}
                      />
                    </Pane>

                    <Pane>
                      <Button
                        className="float-right"
                        appearance="primary"
                        intent="success"
                        type="button"
                        onClick={handleChangePassword}
                      >
                        Kemaskini
                      </Button>
                    </Pane>
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>

    </>
  );
}
