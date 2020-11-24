import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import GoogleRoute from "./Utils/GoogleRoute";
import {
  getToken,
  getNOKP,
  getUser,
  getEmail,
  removeUserSession,
  setUserSession,
} from "./Utils/Common";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Setting from "./Profile";
import Bill from "./BayarBill";
import Home from "./Home";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import GoogleLogin from "./GoogleLogin";
import NotFound from "./NotFound";
import SenaraiBil from "./SenaraiBil";
import BeforeBayar from "./BeforeBayar";
import Payment from "./Payment";
import Add from "./Add";
import UserReport from "./UserReport";
import Pdf from "./ReactPDF";

import cukaitaksiran from "./ListCukaiTaksiran";
import kompaun from "./ListKompaun";
import lesen from "./ListLesen";

import Admin_Dashboard from "./admin/Dashboard_Admin";
import Admin_Setting from "./admin/Setting_Admin";
import Admin_UserManagement from "./admin/UserManagement_Admin";
import Admin_Report from "./admin/Report_Admin";
import Admin_UserStatus from "./admin/Report_UserStatus";
import UserDetail from "./admin/UpdateUser_Admin";
import AddUser from "./admin/AddUser_Admin";

import { useLoading, Audio } from "@agney/react-loading";

//import "./main.css";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="50" />,
  });

  useEffect(() => {
    if (getEmail() && getEmail()) {
      var formdata = new FormData();
      formdata.append("nokp", getNOKP());
      formdata.append("email", getEmail());

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      var urlAPI =
        "https://mymps.corrad.my/int/api_generator.php?api_name=check_session";

      fetch(urlAPI, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setUserSession(
            btoa(result.data[0]),
            result.data[0]["U_USERNAME"],
            result.data[0]["U_USERIC"],
            result.data[0]["U_USEREMAIL"]
          );
          sessionStorage.setItem("role", result.data[0]["U_USERROLE"]);
          sessionStorage.setItem("notel", result.data[0]["U_USERPHONE"]);
          
          if (result.data[0]["U_USERROLE"] == "Admin") {
            //window.location.href = "/admin/dashboard";
          }
          setAuthLoading(false);
          // window.location.href="/home";
        })
        .catch((error) => {
          console.log(error);
          removeUserSession();
          setAuthLoading(false);
        });
    }
  }, []);

  if (authLoading && getToken()) {
    return(
      <div></div>
    );
  }

  if (sessionStorage.getItem("role") == "Admin") {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/register" component={Register} />
                <PublicRoute
                  path="/forgotpassword"
                  component={ForgotPassword}
                />
                <PrivateRoute
                  path="/admin/dashboard"
                  component={Admin_Dashboard}
                />
                <PrivateRoute
                  path="/admin/setting"
                  component={Admin_Setting}
                />
                <PrivateRoute
                  path="/admin/usermanagement"
                  component={Admin_UserManagement}
                />
                <PrivateRoute
                  path="/admin/report"
                  component={Admin_Report}
                />
                <PrivateRoute
                  path="/admin/laporan_pengguna"
                  component={Admin_UserStatus}
                />
                <PrivateRoute
                  path="/admin/update_user"
                  component={UserDetail}
                />
                <PrivateRoute
                  path="/admin/add_user"
                  component={AddUser}
                />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  } else if (sessionStorage.getItem("role") == "User") {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/register" component={Register} />
                <GoogleRoute path="/verifyuser" component={GoogleLogin} />
                <PublicRoute
                  path="/forgotpassword"
                  component={ForgotPassword}
                />
                {
                  //   <PrivateRoute path="/home" component={Dashboard} />
                }
                <PrivateRoute path="/setting" component={Setting} />
                <PrivateRoute path="/bill" component={Bill} />
                <PrivateRoute path="/cukaitaksiran" component={cukaitaksiran}/>
                <PrivateRoute path="/kompaun" component={kompaun}/>
                <PrivateRoute path="/lesen" component={lesen}/>
                <PrivateRoute path="/bill_cukai_taksiran" component={SenaraiBil} />
                <PrivateRoute path="/payment" component={Payment} />
                <PrivateRoute path="/laporan-pengguna" component={UserReport} />
                <PrivateRoute path="/add_cukai_taksiran" component={Add} />
                <PrivateRoute path="/PengesahanPembayaran" component={BeforeBayar}/>
                <Route path="/receipt.php" component={Pdf} />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/register" component={Register} />
                <PrivateRoute path="/home" component={Dashboard} />
                <PrivateRoute path="/setting" component={Setting} />
                <PrivateRoute path="/bill" component={Bill} />
                <PrivateRoute path="/cukaitaksiran" component={cukaitaksiran}/>
                <PrivateRoute path="/kompaun" component={kompaun}/>
                <PrivateRoute path="/lesen" component={lesen}/>
                <PrivateRoute path="/bill_cukai_taksiran" component={SenaraiBil} />
                <PrivateRoute path="/payment" component={Payment} />
                <PrivateRoute path="/add_cukai_taksiran" component={Add} />
                <PrivateRoute path="/laporan-pengguna" component={UserReport} />
                <PrivateRoute path="/PengesahanPembayaran" component={BeforeBayar}/>
                <Route path="/receipt.php" component={Pdf} />
                <PublicRoute
                  path="/forgotpassword"
                  component={ForgotPassword}
                />
                <PrivateRoute
                  path="/admin/dashboard"
                  component={Admin_Dashboard}
                />
                <PrivateRoute
                  path="/admin/setting"
                  component={Admin_Setting}
                />
                <PrivateRoute
                  path="/admin/usermanagement"
                  component={Admin_UserManagement}
                />
                <PrivateRoute
                  path="/admin/report"
                  component={Admin_Report}
                />
                <PrivateRoute
                  path="/admin/laporan_pengguna"
                  component={Admin_UserStatus}
                />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
