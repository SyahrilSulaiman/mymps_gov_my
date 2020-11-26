import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
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
} from "evergreen-ui";
import BillList from "./BillList";
import Topbaer from "./Topbar2";
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

function Bill(props) {
  const [userid, setUserId] = useState(sessionStorage.nokp);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  $(document).ready(function () {
    $("#example").DataTable({
		responsive: true
	})
  });

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
          console.log(result.data);
          setData(result.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, []);

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
  } else if (loading == false && data)
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
                className="p-2 my-5 xl:mx-4 xl:rounded-md"
                width="100%"
                display="flex"
                justifyContent="right"
                alignContent="right"
              ></Pane>
              <Pane className="p-3 xl:mx-4 xl:rounded-md my-1 bg-white" width="100%">
                <table id="example" className="display">
                  <thead>
                    <tr>
					  <th><Heading size={200}>No</Heading></th>
                      <th><Heading size={200}>Nombor Akaun</Heading></th>
                      <th><Heading size={200}>Jumlah Bayaran (RM)</Heading></th>
                      <th><Heading size={200}>No. Invois</Heading></th>
					  <th><Heading size={200}>No. Rujukan FPX</Heading></th>
					  <th><Heading size={200}>Status Pembayaran</Heading></th>
					  <th><Heading size={200}>Penyata Akaun</Heading></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((data, key) => {
                        return (
                          <tr key={key}>
							<td><Heading size={200}>{key + 1}</Heading></td>
                            <td><Heading size={200}><b>{data.A_NO}</b></Heading></td>
                            <td><Heading size={200}>{data.AP_AMOUNT}</Heading></td>
                            <td><Heading size={200}>{data.AP_INVOICE_NO}</Heading></td>
							<td><Heading size={200}>{data.AP_FPX_TRANSACTION_ID !== null ? data.AP_FPX_TRANSACTION_ID : "--"}</Heading></td>
							<td><Heading size={200} color={data.AP_STATUS == '1' ? "green" : "red"}>{data.AP_STATUS == '1' ? "Berjaya" : "Tidak Berjaya"}</Heading></td>
							<td><Button>PDF</Button></td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </Pane>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Bill;
