import Axios from "axios";
import React, {useState, useEffect} from "react";
import swal from "sweetalert";
import Sidebar from "../admin/Sidebar_Admin";
import Navbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footers/Footer";
import { get } from "jquery";
import { Pane, Button, Heading, TextInputField, Text } from "evergreen-ui";

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

export default function UserDetail({showUser,display}) {

  const handleBack = (e) => {
    // window.location.href = "./usermanagement";
    display(false);
  }
  const handleApprove = (e) => {
    console.log('Approve');
  }
  const handleUpdate = (e) => {
    console.log('Update');
  }
  const handleRemove = (e) => {
    console.log("Remove");
  }
  console.log(showUser);
  return (
        <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className="block" id="link1">
                <Pane display="flex" paddingTop={3} paddingBottom={10} background="tint3">
                  <Pane flex={1} alignItems="right" display="flex">
                    <Button
                      className="float-right"
                      appearance="primary"
                      intent="none"
                      type="button"
                      onClick={handleBack}
                    >
                      Kembali
                    </Button>
                  </Pane>
                </Pane>

                  <Pane display="flex" padding={10} background="#dfe6e9" borderRadius={5}>
                    <Pane flex={1} alignItems="center" display="flex">
                      <Text size={600}>Profil Pengguna mymps</Text>
                    </Pane>
                  </Pane>

                  <Pane display="flex" padding={3} background="tint3" borderRadius={3} marginTop="30px">
                    <Pane flex={1} alignItems="center">
                      <TextInputField
                        label="NAMA PENUH"
                        width="100%"
                        placeholder="Sila isi nama penuh anda"
                        required={false}
                        disabled
                        defaultValue={showUser.U_USERNAME}
                        // onChange={(e) => setUsername(e.target.value)}
                      />

                      <TextInputField
                        label="NOMBOR KAD PENGENALAN"
                        width="100%"
                        placeholder="Sila isi nombor kad pengenalan anda"
                        required={false}
                        disabled
                        defaultValue={showUser.U_USERIC}
                      />

                      <TextInputField
                        label="ALAMAT EMEL"
                        width="100%"
                        placeholder="Sila isi alamat emel anda"
                        required={false}
                        disabled
                        defaultValue={showUser.U_USEREMAIL}
                        // onChange={(e) => setEmail(e.target.value)}
                      />

                      <TextInputField
                        label="NOMBOR TELEFON"
                        width="100%"
                        placeholder="Sila isi nombor telefon anda"
                        required={false}
                        disabled
                        defaultValue={showUser.U_USERPHONE}
                        // onChange={(e) => setTelephone(e.target.value)}
                      />

                      <TextInputField
                        label="STATUS"
                        width="100%"
                        placeholder=""
                        required={false}
                        disabled
                        defaultValue={showUser.U_USERSTATUS}
                        // onChange={(e) => setTelephone(e.target.value)}
                      />
                      
                    </Pane>
                  </Pane>

                  <Pane display="flex" padding={10}>
                  {showUser.U_USERSTATUS === 'Pending' ? 
                    <Pane flex={1} alignItems="left" display="flex">
                          <Pane>
                            <Button
                              className="float-left"
                              appearance="primary"
                              intent="warning"
                              type="button"
                              onClick={handleApprove}
                            >
                              Sahkan
                            </Button>
                          </Pane> 
                      </Pane>
                      : '' }

                      <Pane flex={1} alignItems="right" display="flex">
                          <Pane>
                            <Button
                              className="float-left"
                              appearance="primary"
                              intent="danger"
                              type="button"
                              onClick={handleRemove}
                            >
                              Hapus
                            </Button>
                          </Pane>
                      </Pane>
                    </Pane>


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
          </div>
      </div>
  );

}
