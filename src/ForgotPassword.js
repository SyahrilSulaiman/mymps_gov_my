import react, {useState} from "react";
import { setUserSession } from './Utils/Common';
import logo1 from "./assets/img/logo1.png";
import ReCAPTCHA from "react-google-recaptcha";

import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";
import swal from "sweetalert";

function onChange(value) {
    console.log("Captcha value:", value);
}

function ForgetPassword(props){

    const username = useFormInput("");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleForgetPassword = () => {
        setError(null);
        setLoading(true);

        if(username.value == ""){

            swal("Opss!", "Sila pastikan kata nama dan kata laluan anda sah", "error");
            setLoading(false);

        }else{

            var formdata = new FormData();
            formdata.append("username", username.value);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            var urlAPI1 = 'https://mymps.corrad.my/int/api_generator.php?api_name=change_password';

            fetch(urlAPI1 , requestOptions)
            .then(response => response.json())
            .then(result => {

                setLoading(false);

                if(result.status == "unsuccess")
                {
                    console.log(result);
                    swal("Opss!", "Sila pastikan emel atau kad pengenalan anda sah", "error");
                    return false;
                }
                else if(result.status == "pending"){
                    console.log(result);
                    swal("Harap Maaf!", "Akaun ini mesti menunggu 10 minit sebelum ingin menukar kata laluan yang baru.", "error");
                    return false;
                }
                else if(result.status == "success")
                {
                    console.log(result);
                    swal("Berjaya", "Sila semak emel anda untuk mendapatkan kata laluan yang baharu.", "success");
                    props.history.push("/login");
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
                    Tukar Kata Laluan
                </h2>
                </div>
                <form className="mt-8">
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm">
                    <div>
                    <input aria-label="username" {...username} name="username" type="username" required className="mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Kad Pengenalan" />
                    </div>
                </div>

                

                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center">
                    <a href="/login" className="text-sm text-gray-100 hover:text-gray-200 focus:outline-none focus:underline transition ease-in-out duration-150">
                        Login
                    </a>
                    </div>

                    <div className="text-sm leading-5">
                    <a href="/register" className="font-medium text-gray-100 hover:text-gray-200 focus:outline-none focus:underline transition ease-in-out duration-150">
                        Daftar Pengguna ?
                    </a>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap">
                    <button type="button" onClick={handleForgetPassword} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        {loading ? 'Loading...' : 'Hantar'}
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
   
export default ForgetPassword;