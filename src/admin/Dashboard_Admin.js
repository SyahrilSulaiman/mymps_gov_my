import React,{ useState, useEffect } from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "../Utils/Common";
import axios from 'axios'

import Sidebar from "./Sidebar_Admin";
import Navbar from "../components/Navbars/AdminNavbar";
import LineChart from "../components/Cards/CardLineChart";
import BarChart from "../components/Cards/CardBarChart";
import {Pane, Text} from 'evergreen-ui';
import JumlahPembayaran from './report/Dashboard_Page/JumlahPembayaran'
import LineGraph from './report/Dashboard_Page/LineGraph'
import Axios from "axios";

function Dashboard(props) {

  // const token = getToken();
  // const user = getUser();
  // const nokp = getNOKP();

  const [jumlah,setJumlah] = useState([]);
  const [pengguna,setPengguna] = useState([]);

  useEffect(() => {
    axios.get('https://mymps.corrad.my/int/api_generator.php?api_name=laporan_jumlah_pembayaran')
    .then( res => {
      setJumlah(res.data.result);
    })
  },[]);

  useEffect(() => {
    console.log('aaaa');
    axios.get('https://mymps.corrad.my/int/api_generator.php?api_name=laporan_pengguna')
    .then( res => {
      setPengguna(res.data.result);
      console.log(pengguna)
      console.log(res.data.result)
    })
  },[]);
  
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-blue-200" style={{height: "100%"}}>
        <Navbar />
        {/* Header */}
        <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
              <div className="flex flex-wrap">
                {
                  // Bayaran -- 
                  <JumlahPembayaran value={jumlah} user={pengguna}/>
                }
                <Pane clearfix background="white" className={'rounded-md w-full flex pt-4'}>
                  <LineGraph />
                </Pane>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
