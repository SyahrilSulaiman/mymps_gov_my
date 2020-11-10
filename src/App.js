import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import GoogleRoute from "./Utils/GoogleRoute";
import { getToken, getNOKP, getUser, getEmail, removeUserSession, setUserSession } from "./Utils/Common";

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
import Payment from "./Payment";
import Add from "./Add";


//import "./main.css";

function App() {

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {

    if(getEmail() && getEmail())
    {
        var formdata = new FormData();
        formdata.append("nokp", getNOKP());
        formdata.append("email", getEmail());

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        var urlAPI = "https://mymps.corrad.my/int/api_generator.php?api_name=check_session";

        fetch(urlAPI, requestOptions)
        .then(response => response.json())
        .then((result) => {
          
          setUserSession(btoa(result.data[0]), result.data[0]["MPS_USERNAME"], result.data[0]["MPS_USERIC"], result.data[0]["MPS_USEREMAIL"]);
          setAuthLoading(false);
          // window.location.href="/home";

        })
        .catch((error) => {
          console.log(error)
          removeUserSession();
          setAuthLoading(false);

        });
    }
    
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

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
              <PublicRoute path="/forgotpassword" component={ForgotPassword} />
              <PrivateRoute path="/home" component={Dashboard} />
              <PrivateRoute path="/setting" component={Setting} />
              <PrivateRoute path="/bill" component={Bill} />
              <PrivateRoute path="/senaraibill" component={SenaraiBil} />
              <PrivateRoute path="/payment" component={Payment} />
              <PrivateRoute path="/add" component={Add} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
