import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import {
  Pane,
  toaster,
  Button,
  AddIcon,
  ArrowLeftIcon,
  SortNumericalIcon,
  Spinner,
  Tablist,
  Tab,
  TextInput,
  Heading,
  Table,
  ChevronRightIcon,
  Icon,
} from "evergreen-ui";
import BillList from "./BillList";
import Topbaer from "./Topbar2";

function Bill(props) {
  const [userid, setUserId] = useState(sessionStorage.nokp);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var apiUrl =
      "https://mymps.corrad.my/int/api_generator.php?api_name=userReport";

    var formData = new FormData();
    formData.append("userid", userid);
    formData.append("search", search);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(true);
        if (result.status == "success") {
          setData(result.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, []);

  const searching = (paramSearch) => {
    console.log(paramSearch);
    if (paramSearch !== null) {
      var apiUrl =
        "https://mymps.corrad.my/int/api_generator.php?api_name=userReport";

      var formData = new FormData();
      formData.append("userid", userid);
      formData.append("search", paramSearch);

      var requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
      };

      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLoading(true);
          if (result.status == "success") {
            setData(result.data);
            setLoading(false);
          } else {
            setLoading(false);
          }
        });
    }
  };

  const dataa = {
    columns: [
      {
        label: "Akaun",
        field: "A_NO",
        sort: "asc",
        width: 500,
      },
      {
        label: "No. Invois",
        field: "AP_INVOICE_NO",
      },
    ],
    rows: data,
  };

  if (loading == true) {
    return (
      <div>
        <Sidebar />
        <div
          className="relative md:ml-64 bg-gray-400"
          style={{ height: "100vh" }}
        >
          <Navbar />
          <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
            <div className="flex flex-wrap ">
              <Pane
                background="#2c3e50"
                className="xl:mx-4 xl:rounded-md"
                width="100%"
              >
                <Topbaer
                  title="Laporan / Laporan Transaksi"
                  leftButtonIcon={ArrowLeftIcon}
                  onClickLeftButton={() => window.history.back()}
                />
              </Pane>

              <div className="w-full bg-transparent px-3">
                <Pane
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  paddingY={100}
                >
                  {/* <Heading size={200}>Tekan pada butang <Button type="button" appearance="primary" intent="success">Tambah Bil</Button> untuk menambah bil.</Heading> */}
                  <Spinner />
                </Pane>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (loading == false && data !== null)
    return (
      <div>
        <Sidebar />
        <div
          className="relative md:ml-64 bg-gray-400"
          style={{ height: "100vh" }}
        >
          <Navbar />
          <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
            <div className="flex flex-wrap ">
              <Pane
                background="#2c3e50"
                className="xl:mx-4 xl:rounded-md"
                width="100%"
              >
                <Topbaer
                  title="Laporan / Laporan Transaksi"
                  leftButtonIcon={ArrowLeftIcon}
                  onClickLeftButton={() => window.history.back()}
                />
              </Pane>

              <Pane
                className="p-3 xl:mx-4 xl:rounded-md xl:my-2"
                width="100%"
                background="tint1"
              >
                <TextInput
                  width="100%"
                  placeholder="carian..."
                  onKeyPress={event => {
                    if(event.key == "Enter"){
                      searching(event.target.value)
                    }
                  }}
                />
              </Pane>

              <Pane className="p-3 xl:mx-4 xl:rounded-md bg-white" width="100%">
                {data && data.map((data, index) => {
                  return(
                    <Pane display="grid" gridTemplateColumns="50px 1fr 20px" background="tint1" className={index !== 0 ? "py-2" : ""}>
                      <Heading size={100} className="py-8 mx-auto">{index + 1}</Heading>
                      <Pane className="p-4">
                        <Heading size={200}>Akaun : {data.A_NO}</Heading>
                        <Heading size={200}>No Invois : {data.AP_INVOICE_NO}</Heading>
                        <Heading size={200}>Status : {data.AP_STATUS == '1' ? "Berjaya" : "Tidak Berjaya"}</Heading>
                      </Pane>
                      <Heading className="py-8 mx-auto"><Icon icon={ChevronRightIcon}></Icon></Heading>
                    </Pane>
                  )
                })}
                {!data && (() => {
                  return(
                    <Pane display="grid" gridTemplateColumns="50px 1fr 20px">
                      <Heading size={100}></Heading>
                      <Pane>
                        <Heading size={200}> -- Tiada Maklumat --</Heading>
                      </Pane>
                      <Heading></Heading>
                    </Pane>
                  )
                })}
                {/* <table id="example" className="display" border="0">
                  <thead>
                    <tr>
                      <th>
                        <Heading size={200}>No</Heading>
                      </th>
                      <th>
                        <Heading size={200}>Nombor Akaun</Heading>
                      </th>
                      <th>
                        <Heading size={200}>Jumlah Bayaran (RM)</Heading>
                      </th>
                      <th>
                        <Heading size={200}>No. Invois</Heading>
                      </th>
                      <th>
                        <Heading size={200}>No. Rujukan FPX</Heading>
                      </th>
                      <th>
                        <Heading size={200}>Status Pembayaran</Heading>
                      </th>
                      <th>
                        <Heading size={200}>Penyata Akaun</Heading>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((data, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              <Heading size={200}>{key + 1}</Heading>
                            </td>
                            <td>
                              <Heading size={200}>
                                <b>{data.A_NO}</b>
                              </Heading>
                            </td>
                            <td>
                              <Heading size={200}>{data.AP_AMOUNT}</Heading>
                            </td>
                            <td>
                              <Heading size={200}>{data.AP_INVOICE_NO}</Heading>
                            </td>
                            <td>
                              <Heading size={200}>
                                {data.AP_FPX_TRANSACTION_ID !== null
                                  ? data.AP_FPX_TRANSACTION_ID
                                  : "--"}
                              </Heading>
                            </td>
                            <td>
                              <Heading
                                size={200}
                                color={data.AP_STATUS == "1" ? "green" : "red"}
                              >
                                {data.AP_STATUS == "1"
                                  ? "Berjaya"
                                  : "Tidak Berjaya"}
                              </Heading>
                            </td>
                            <td>
                              <Button>PDF</Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table> */}
              </Pane>
            </div>
          </div>
        </div>
      </div>
    );

  else {
    return (
      <div>
        <Sidebar />
        <div
          className="relative md:ml-64 bg-gray-400"
          style={{ height: "100vh" }}
        >
          <Navbar />
          <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
            <div className="flex flex-wrap ">
              <Pane
                background="#2c3e50"
                className="xl:mx-4 xl:rounded-md"
                width="100%"
              >
                <Topbaer
                  title="Laporan / Laporan Transaksi"
                  leftButtonIcon={ArrowLeftIcon}
                  onClickLeftButton={() => window.history.back()}
                />
              </Pane>

              <div className="w-full bg-transparent px-3">
                <Pane
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  paddingY={100}
                >
                  <Heading size={200}>Tiada data dijumpai.</Heading>
                  {/* <Spinner /> */}
                </Pane>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Bill;
