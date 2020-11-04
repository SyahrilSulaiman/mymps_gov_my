import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";

import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken, getNOKP, getUser, getEmail, removeUserSession, setUserSession } from "./Utils/Common";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Register from "./Register";
import BayarCukai from "./BayarCukai";
import NotFound from "./NotFound";

//import "./main.css";

function App() {

  console.log(Cookies.get('__session'));

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
              <PublicRoute path="/paytax" component={BayarCukai} />
              <PrivateRoute path="/home" component={Dashboard} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
