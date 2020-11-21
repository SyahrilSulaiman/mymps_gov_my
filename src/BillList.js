import React, { useState, useEffect } from "react";
import axios from "axios";
import { getNOKP } from "./Utils/Common";
import swal from "sweetalert";
import NoScroll from "no-scroll";
import BayarCukai from "./BayarCukai";
import { Pane, Spinner, Heading, Strong, Icon, ArrowLeftIcon, DocumentIcon } from "evergreen-ui";
import iconBill from "./assets/img/bill.png";

export default function BillList() {

  NoScroll.on();

  sessionStorage.removeItem("cukai");
  const nokp = getNOKP();
  const displayKP =
    '<h5 className="uppercase font-medium text-xs text-gray-600">No Kad Pengenalan </h5>';
  const handleViewBill = (e) => {
    // set=[e.target.id]
    // return (
    // 	 senarai = <Senarai />
    console.log("View");
    sessionStorage.setItem("noakaun", btoa(btoa(e)));
    window.location.href = "/bill_cukai_taksiran";
  };

  const handleBayar = (cukai, amount, penama, akaun) => {

    var array = [];
    array["CUKAI"]      = cukai;
    array["TUNGGAKAN"]  = amount;
    array["PEMILIK"]    = penama;
    array["AKAUN"]      = akaun;

    sessionStorage.setItem("INFO", btoa(btoa(btoa(JSON.stringify(array)))));
    sessionStorage.setItem("noakaun", btoa(btoa(akaun)));
    window.location.href = "/PengesahanPembayaran?Cukai=" + btoa(cukai);
  };

  const [dataset, setDataSet] = useState({
    data: [],
  });

  useEffect(() => {
    // let mounted = true;
    // const formData = new FormData();
    // formData.append('nokp',nokp);

    // const loadData = async () =>{
    //     const res = await axios.post('https://mymps.corrad.my/int/api_generator.php?api_name=showBill',formData);
    //     if(mounted){
    //         console.log(res.data)
    //         if(res.data.status === 'success'){
    //             // swal('jadi','x','success');
    //             setDataSet({
    //                 data:res.data.data
    //             })
    //         }
    //         else{
    //             swal('Tiada Akaun Didaftarkan','Sila menambah akaun untuk dibayar','info');
    //         }
    //     }
    // }
    // loadData();
    // return () => {
    //     mounted = false;
    // }
    const formData2 = new FormData();
    formData2.append("userSecret", nokp)
    axios.post('https://mymps.corrad.my/int/api_generator.php?api_name=user_notification', formData2)
    .then((res) => {
      if(res.data.status === "inactive"){
        swal("Tahniah!","Terima kasih kerana mendaftar sebagai pengguna mymps, sila semak emel anda untuk pengesahan akaun bagi membolehkan pembayaran dilakukan.","success");
      }
    })
    .catch((err) => {
      console.log(err);
      swal("Ralat", "Sila hubungi pentadbir sistem!", "error");
    });

    const formData = new FormData();
    formData.append("nokp", nokp);
    axios
      .post(
        "https://mymps.corrad.my/int/api_generator.php?api_name=showBill",
        formData
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          // swal('jadi','x','success');
          setDataSet({
            data: res.data.data,
          });
        } else {
          swal(
            "Tiada bil didaftarkan",
            "Sila tambah bil anda dengan klik pada + Tambah",
            "info"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        swal("Ralat", "Sila hubungi pentadbir sistem!", "error");
      });


  }, []);

  const emptyHandler = () => {
    console.log("Test Handler");
  };

  const bills = dataset.data.length ? (
    dataset.data.map((bill) => {
      return (
        <div
          className=" w-full"
          onClick={
            //betulkan status***
            bill.STATUS !== "PAID" ? (e) => handleBayar(bill.NOAKAUN, bill.BAKI_TUNGGAK, bill.NAMA_PEMILIK, bill.NOAKAUN) : () => handleViewBill(bill.NOAKAUN)
          }
          key={bill.NOAKAUN}
        >
          <div className="flex flex-wrap">
            <div className="w-full px-2 border-white">
              <Pane
              borderColor="white"
              width="100%"
              background="#dfe6e9"
              className="p-2 border"
              display="grid"
              gridTemplateColumns="1px 1fr 10px"
              >
                <Pane>
                  {/* <Icon icon={DocumentIcon}></Icon>
                  <img src={iconBill} style={{width:"50px", height:"50px"}}/> */}
                </Pane>
                <Pane>
                  <table border="1" cellPadding="0" className="text-left overflow-x:auto">
                    <tr>
                      <th><Heading size={200}>No. Kad Pengenalan </Heading></th>
                      <td><Strong size={300}> : {bill.NOKP === null ? "-" : bill.NOKP}</Strong ></td>
                    </tr>
                    <tr>
                      <th><Heading size={200}>No. Akaun </Heading></th>
                      <td><Strong size={300}> : {bill.NOAKAUN === null ? "-" : bill.NOAKAUN}</Strong></td>
                    </tr>
                    <tr>
                      <th><Heading size={200}>Nama Pemilik </Heading></th>
                      <td><Strong size={300}> : {bill.NAMA_PEMILIK === null ? "-" : bill.NAMA_PEMILIK}</Strong></td>
                    </tr>
                    <tr>
                      <th><Heading size={200}>Status </Heading></th>
                      <td><Strong size={300} color={bill.STATUS === "PAID" ? "#47B881" : "#EC4C47"}> : {bill.NAMA_PEMILIK === null ? "-" : bill.STATUS == "PAID" ? "TELAH DIBAYAR" : "TERTUNGGAK"}</Strong></td>
                    </tr>
                  </table>
                </Pane>
                <Pane color="gray" alignContent="right" justifyContent="center">
                  <i className="pt-12 fas fa-chevron-right"></i>
                </Pane>
              </Pane>
            </div>
          </div>
        </div>
      );
    })
  ) : (
      <div className="w-full bg-white">
          <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
            <Spinner />
          </Pane>
      </div>
    );

  return <div className="">{bills}</div>;
}
