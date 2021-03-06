import React,{useState, useEffect} from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "../Utils/Common";

import Sidebar from "./Sidebar_Admin";
import Navbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footers/Footer";
import CukaiTaksiran from './report/Carian_Cukai';
import PieChart from "./report/Pie"
import { Pane, Button, SelectField, ArrowLeftIcon , Icon, Heading} from 'evergreen-ui'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Dashboard(props) {
  const token = getToken();
  const user = getUser();
  const nokp = getNOKP();

  const [type, setType] = useState('');
  // setType(false)

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  const [startDate, setStartDate] = useState('');

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-blue-600" style={{ height: "150vh" }}>
        <Navbar />
        {/* Header */}
        <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
        <div className="flex flex-wrap ">
            <Pane background="#2c3e50" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
                <Heading size={400} color="white">
                     Laporan Bayaran Cukai Taksiran
                </Heading>
            </Pane>
        </div>

            <div className="flex flex-wrap xl:pt-2">
              <Pane background="white" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
                <Heading size={500}>Tarikh : &nbsp;<DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="yyyy-MM-dd" isClearable placeholderText="Sila pilih tarikh" /></Heading>
              </Pane>
            </div>
            <div className="flex flex-wrap xl:pt-2">
              <Pane background="white" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
                  <SelectField
                      label="Jenis Carian"
                      description="Sila buat pilihan jenis carian bil"
                      onChange={(e) => setType(e.target.value)}
                  >
                      <option value='tiada'>-- Sila Pilih --</option>
                      <option value="nokp">Kad Pengenalan</option>
                      <option value="ssm">Nombor ROC/ROB Syarikat</option>
                      <option value="akaun">Nombor Akaun</option>
                  </SelectField>
                  {
                    // type === '' ? '' :
                    <CukaiTaksiran type={type} startDate={startDate}/>
                  }
              </Pane>
            </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
