import React, { useEffect, useState } from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "../Utils/Common";
import BootstrapTable from 'react-bootstrap-table-next';

import Sidebar from "./Sidebar_Admin";
import Navbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footers/Footer";
import { sha256 } from "js-sha256";

function Dashboard(props) {

  const [getUserList , setUserList] = useState();

  const token = getToken();
  const user = getUser();
  const nokp = getNOKP();

  const columns = [{
    dataField: 'U_USERNAME',
    text: 'Product ID'
  }, {
    dataField: 'U_USERIC',
    text: 'Product Name'
  }, {
    dataField: 'U_USERPHONE',
    text: 'Product Price'
  }];

  useEffect(()=> {

    var formdata = new FormData();
    formdata.append("secretKey",  sha256(btoa(sessionStorage.getItem("role"))));

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    var urlAPI1 = 'https://mymps.corrad.my/int/api_generator.php?api_name=get_ListUser';

    fetch(urlAPI1, requestOptions)
    .then(response => response.json())
    .then(result => {
      //console.log(result.data);
      setUserList(result.data);
    });

  }, []);


  console.log(getUserList);

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  if(getUserList){
    return (
      <div>
        <Sidebar />
        <div className="relative md:ml-64 bg-blue-600" style={{ height: "100%" }}>
          <Navbar />
          {/* Header */}
          <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">
            <div className="px-4 md:px-10 mx-auto w-full">
            <BootstrapTable keyField='id' data = { getUserList } columns={ columns }  style={{background: "White"}}/>
            </div>
          </div>
          <div className="px-4 md:px-10 mx-auto w-full m-24"></div>
          <Footer />
        </div>
      </div>
    );
  }else{
    return (
      <div>
        <Sidebar />
        <div className="relative md:ml-64 bg-blue-600" style={{ height: "100%" }}>
          <Navbar />
          {/* Header */}
          <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">
            <div className="px-4 md:px-10 mx-auto w-full">
            </div>
          </div>
          <div className="px-4 md:px-10 mx-auto w-full m-24"></div>
          <Footer />
        </div>
      </div>
    );
  }
  
}

export default Dashboard;
