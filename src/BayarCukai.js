import react, {useState , useEffect} from "react";
import OTPInput, { ResendOTP } from "react-otp-input";

import logo1 from "./assets/img/logo1.png";

import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";
import "./otp.css";
import swal from "sweetalert";

function Bayar() {

    useEffect(() => {
        const inputs = document.querySelectorAll('#otp > *[id]');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('keydown', function(event) {
                if (event.key === "Backspace") {
                    inputs[i].value = '';
                    if (i !== 0)
                    inputs[i - 1].focus();
                } else {
                    if (i === inputs.length - 1 && inputs[i].value !== '') 
                    {
                        return true;
                    } 
                    else if (event.keyCode > 47 && event.keyCode < 58) 
                    {
                        inputs[i].value = event.key;
                        if (i !== inputs.length - 1)
                        inputs[i + 1].focus();
                        event.preventDefault();
                    } 
                    else if (event.keyCode > 64 && event.keyCode < 91) 
                    {
                        // inputs[i].value = String.fromCharCode(event.keyCode);
                        // if (i !== inputs.length - 1)
                        // inputs[i + 1].focus();
                        event.preventDefault();
                    }
                }
            });
        }

        const inputs2 = document.querySelectorAll('#otp2 > *[id]');

        for (let i = 0; i < inputs2.length; i++) {
            inputs2[i].addEventListener('keydown', function(event) {
                if (event.key === "Backspace") {
                    inputs2[i].value = '';
                    if (i !== 0)
                    inputs2[i - 1].focus();
                } else {
                    if (i === inputs2.length - 1 && inputs2[i].value !== '') 
                    {
                        return true;
                    } 
                    else if (event.keyCode > 47 && event.keyCode < 58) 
                    {
                        inputs2[i].value = event.key;
                        if (i !== inputs2.length - 1)
                        inputs2[i + 1].focus();
                        event.preventDefault();
                    } 
                    else if (event.keyCode > 64 && event.keyCode < 91) 
                    {
                        // inputs[i].value = String.fromCharCode(event.keyCode);
                        // if (i !== inputs.length - 1)
                        // inputs[i + 1].focus();
                        event.preventDefault();
                    }
                }
            });
        }
    });

    

    const handleSubmit = (() => {
        let value = "";
        const inputSemua = document.querySelectorAll("#otp > *[id]");

        for(let j = 0; j < inputSemua.length; j++){
            
            if(value == ""){
                swal("Opss!", "Sila lengkap maklumat kad pengenalan anda!", "error");
                return false;
            }else{
                value += inputSemua[j].value;
            }
        }

        console.log(parseInt(value));

        var urlAPI3 = 'https://apisim.mps.gov.my/api/mymps/akaunbyic?nokp=' + parseInt(value);

        fetch(urlAPI3)
        .then(response => response.json())
        .then(result => {
            console.log(result);
        })
    });

    return (
        <div className="bg-gray">
        <IndexNavbar fixed />
        <section className="py-20 px-5 relative" style={{background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
        <div className="min-h-screen flex items-center justify-center  px-4 sm:px-6">
            <div className="max-w-md w-full sm: mt-10" style={{marginTop: "-200px"}}>
                <div>
                <img className="mx-auto w-auto" src={logo1} alt="mymps" style={{height: "120px"}}/>
                <h2 className="mt-6 text-center text-xl leading-9 font-extrabold text-white">
                    Laman Bayaran Cukai Ekpress
                </h2>
                </div>
                <form className="mt-8">
                <input type="hidden" name="remember" value="true" />
                <p className="text-center text-white">No. Kad Pengenalan</p>
                <div className="mx-auto rounded-md" style={{margin:"30px"}}>
                    <div className="mb-6 text-center">
                        <div id="otp" className="flex justify-center">
                            <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="first" maxLength="1" />
                            <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="second" maxLength="1" />
                            <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="third" maxLength="1" />
                            <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="fourth" maxLength="1" />
                            <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="fifth" maxLength="1" />
                            <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="sixth" maxLength="1" />
                            <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="seventh" maxLength="1" />
                            <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="eight" maxLength="1" />
                            <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="ninth" maxLength="1" />
                            <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="tenth" maxLength="1" />
                            <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="eleventh" maxLength="1" />
                            <input className="m-2 text-center form-control form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="twelveth" maxLength="1" />
                        </div>

                        <br />
                        
                        <div id="otp2" className="flex justify-center">
                            {/* <input className="m-2 text-center form-control2 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="first" maxlength="1" />
                            <input className="m-2 text-center form-control2 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="second" maxlength="1" />
                            <input className="m-2 text-center form-control2 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="third" maxlength="1" />
                            <input className="m-2 text-center form-control2 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="fourth" maxlength="1" />
                            <input className="m-2 text-center form-control2 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="fifth" maxlength="1" />
                            <input className="m-2 text-center form-control2 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="sixth" maxlength="1" />
                            <input className="m-2 text-center form-control2 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="seventh" maxlength="1" />
                            <input className="m-2 text-center form-control2 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="eight" maxlength="1" />
                            <input className="m-2 text-center form-control2 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="ninth" maxlength="1" />
                            <input className="m-2 text-center form-control2 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="tenth" maxlength="1" />
                            <input className="m-2 text-center form-control2 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="eleventh" maxlength="1" />
                            <input className="m-2 text-center form-control2 form-control-solid rounded focus:border-blue-400 focus:shadow-outline" type="text" id="twelveth" maxlength="1" /> */}
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <button type="button" onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        Semak Akaun
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

export default Bayar;
 
