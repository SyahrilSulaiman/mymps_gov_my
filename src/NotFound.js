import React from 'react';
import { Link } from 'react-router-dom';
import {removeUserSession} from "./Utils/Common";

const NotFound = () => (
  <div>
    <h1>404 - Page Not Found!!</h1>
    <Link to="/">
      <button className="bg-blue-500 text-white rounded py-2 px-3" onClick={() => removeUserSession()}>Kembali</button>
    </Link>
  </div>
);

export default NotFound;