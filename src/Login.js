import react, {useState} from "react";
import { setUserSession } from './Utils/Common';
import { TextInputField, Heading, Button, BuildIcon } from "evergreen-ui";
import logo1 from "./assets/img/logo1.png";
import GoogleLogin from 'react-google-login';
import { setGoogleToken } from './Utils/Common';

import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";
import ggl from "./assets/img/google-icon.svg";
import swal from "sweetalert";

function Login(props){

    sessionStorage.removeItem('GoogleToken');
    sessionStorage.removeItem('GoogleEmail');
    sessionStorage.removeItem('GoogleName');

    const username = useFormInput("");
    const password = useFormInput("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if(username.value == "" || password.value == ""){

            swal("Opss!", "Sila pastikan kata nama dan kata laluan anda sah", "error");
            setLoading(false);

        }else{

            var sha256 = require('js-sha256');

            var formdata = new FormData();
            formdata.append("email", username.value);
            formdata.append("password", sha256(password.value));

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            var urlAPI1 = 'https://mymps.corrad.my/int/api_generator.php?api_name=api_login';

            fetch(urlAPI1 , requestOptions)
            .then(response => response.json())
            .then(result => {

                setLoading(false);

                if(result.status == "unsuccess")
                {
                    console.log("Wrong credentials. Please try again!");
                    swal("Opss!", "Sila pastikan kata nama dan kata laluan anda sah.", "error");
                }
                else if(result.status == "success")
                {
                    setUserSession(btoa(result.data[0]), result.data[0]["U_USERNAME"], result.data[0]["U_USERIC"], result.data[0]["U_USEREMAIL"]);
                    sessionStorage.setItem("role", result.data[0]["U_USERROLE"]);
                    sessionStorage.setItem("notel", result.data[0]["U_USERPHONE"]);

                    if(result.data[0]['U_USERROLE'] == "Admin"){
                        props.history.push('/admin/dashboard');
                    }else{
                        props.history.push('/bill');
                    }
                    
                }

            })
            .catch(error => {

                console.log(error);
                swal("Opss!", "Something went wrong. Please contact your administrator!", "error")
                .then((value) => {
                    //props.history.push('/');
                })

            });
        }
        

    }

    return (
        <div className="bg-gray">
            <IndexNavbar fixed />
        <section className="py-20 px-5 relative" style={{background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
        <div className="min-h-screen flex items-center justify-center  px-4 sm:px-6">
            <div className="max-w-md w-full" style={{marginTop: "-100px"}}>
                <div>
                <img className="mx-auto w-auto" src={logo1} alt="mymps" style={{height: "120px"}}/>
                <h2 className="mt-6 text-center text-xl leading-9 font-extrabold text-white">
                    Log Masuk Akaun myMPS
                </h2>
                </div>
                <form className="mt-8"  onSubmit={ (e) => handleLogin(e)}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm">
                    <div>
                    <input aria-label="Email" {...username} name="email" type="text" required className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="No KP / No ROC/ROB" />
                    </div>
                    <div className="-mt-px">
                    <input aria-label="Password" {...password} name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Kata Laluan" />
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center">
                    <a href="/register" className="text-sm text-gray-100 hover:text-gray-200 focus:outline-none focus:underline transition ease-in-out duration-150">
                        <i className="fas fa-user"></i> Daftar Pengguna
                    </a>
                    </div>

                    <div className="text-sm leading-5">
                    <a href="/forgotpassword" className="font-medium text-gray-100 hover:text-gray-200 focus:outline-none focus:underline transition ease-in-out duration-150">
                        Terlupa kata laluan ? 
                    </a>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap p-2">
                    {/* <GoogleLogin
                        clientId="438559173225-ub4mfh6vkmnd0qntmper0a48gqv18nn5.apps.googleusercontent.com"
                        onSuccess={responseGoogle}
                        render={renderProps => (
                        <Button 
                            type="button"
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled}
                            className="mb-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 hover:text-gray focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                            fullWidth
                            variant="contained"
                            style={{marginTop:"-10px"}}
                        >
                            <img src={ggl} style={{width: "15px", height: "15px", marginRight: "7px", marginTop: "2px"}} /> 
                            Google
                        </Button>
                        )}
                        buttonText="Login"
                        cookiePolicy={'single_host_origin'}
                    /> */}
                    <button onClick={() => window.location.href = "/"} type="button" className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        Kembali
                    </button>
                    <button type="submit" className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        {loading ? 'Memuatkan...' : 'Log Masuk'}
                    </button>
                </div>
                </form>
            </div>
        </div>
        
        </section>
        <Footer />
        </div>
    )
    
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }
   
export default Login;