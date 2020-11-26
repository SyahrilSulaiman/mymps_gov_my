import React from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "../Utils/Common";

import Sidebar from "./Sidebar_Admin";
import Navbar from "../components/Navbars/AdminNavbar";
import LineChart from "../components/Cards/CardLineChart";
import BarChart from "../components/Cards/CardBarChart";
import {Pane, Text} from 'evergreen-ui';
import GraphChart from "./report/Graph"

function Dashboard(props) {

  const token = getToken();
  const user = getUser();
  const nokp = getNOKP();

  
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

                  <Pane clearfix background="white" className={'rounded-md w-full flex'}>
                    <Pane
                      elevation={1}
                      float="left"
                      // width={200}
                      // height={120}
                      margin={24}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      className={'rounded-md w-full flex-1'}
                    >
                      <Text>Keseluruhan</Text>
                      <Text size={300}>RM {/*res.total*/}</Text>
                    </Pane>
                    <Pane
                      elevation={1}
                      float="left"
                      // width={200}
                      // height={120}
                      margin={24}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      className={'rounded-md w-full flex-1'}

                    >
                      <Text>Tahun Ini</Text>
                      <Text size={300}>RM {/*res.yearly*/}</Text>
                    </Pane>
                    <Pane
                      elevation={1}
                      float="left"
                      // width={200}
                      // height={120}
                      margin={24}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      className={'rounded-md w-full flex-1'}

                    >
                      <Text>Bulan Ini</Text>
                      <Text size={300}>RM {/*res.monthly*/}</Text>
                    </Pane>
                    <Pane
                      elevation={1}
                      float="left"
                      // width={200}
                      // height={120}
                      margin={24}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      className={'rounded-md w-full flex-1'}

                    >
                      <Text>Hari Ini</Text>
                      <Text size={300}>RM {/*(res.daily === 0 || res.daily === null )? 0 : res.daily */}
                      </Text>
                    </Pane>
                  </Pane>
                }
                <Pane clearfix background="white" className={'rounded-md w-full flex'}>
                  <GraphChart />
                </Pane>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
