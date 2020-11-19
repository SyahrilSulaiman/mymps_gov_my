import React, { useState, useEffect } from "react";
import axios from "axios";
import { getNOKP } from "./Utils/Common";
import swal from "sweetalert";
import NoScroll from "no-scroll";
import BayarCukai from "./BayarCukai";
import {Pane, Heading, Icon, ArrowLeftIcon} from "evergreen-ui";

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

  const handleBayar = (cukai, amount, penama) => {
    console.log("Bayar");
    sessionStorage.setItem("cukai", btoa(btoa(cukai)));
    sessionStorage.setItem("amaun", btoa(btoa(amount)));
    sessionStorage.setItem("penama", btoa(btoa(penama)));
    window.location.href = "/payment?Cukai=" + cukai;
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
          className="px-4 md:px-2 mx-auto w-full"
          onClick={
            //betulkan status***
            bill.STATUS !== "PAID" ? () => handleBayar(bill.NOAKAUN, bill.BAKI_TUNGGAK, bill.NAMA_PEMILIK) : () => handleViewBill(bill.NOAKAUN)
          }
          key={bill.NOAKAUN}
        >
          <div className="flex flex-wrap">
            <div className="w-full px-2">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-md border">
                <div className="flex-auto p-3">

                  <div className="flex flex-row pt-4">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="uppercase font-medium text-xs text-gray-600">
                        No Kad Pengenalan:{" "}
                        <span className="font-semibold text-sm text-gray-800">
                          {bill.NOKP === null ? "-" : bill.NOKP}
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div className="flex flex-row pb-4">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="uppercase font-medium text-xs text-gray-600">
                        No Akaun:{" "}
                        <span className="font-semibold text-sm text-gray-800">
                          {bill.NOAKAUN}
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div className="flex flex-row pb-4">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="uppercase font-medium text-xs text-gray-600">
                        Nama Pemilik:{" "}
                        <span className="font-semibold text-sm text-gray-800">
                          {bill.NAMA_PEMILIK}
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div className="flex flex-row pb-4">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="uppercase font-medium text-xs text-gray-600">
                        Alamat Harta
                      </h5>
                      <span className="font-semibold text-xs text-gray-800">
                        {bill.ADDRHARTA}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <h5
                        className={
                          "uppercase font-medium text-xs" +
                          (bill.STATUS === "TERTUNGGAK"
                            ? " text-red-600"
                            : " text-green-600")
                        }
                      >
                        {bill.STATUS === "PAID"
                          ? "Telah dibayar"
                          : "tertunggak"}
                      </h5>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className="w-full">
      <div className="flex flex-wrap bg-white p-64">
        
      </div>
    </div>
  );

  return <div className="">{bills}</div>;
}
