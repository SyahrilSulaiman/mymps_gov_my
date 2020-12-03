import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getNOKP } from "./Utils/Common";
import swal from "sweetalert";
import NoScroll from "no-scroll";
import BayarCukai from "./BayarCukai";
import { Pane, Spinner, Heading, Strong, Button, Icon, ArrowLeftIcon, DocumentIcon } from "evergreen-ui";
import { SelectedBillContext } from "./contexts/SelectedBillContext";

export default function BillList({dataset,isNoData, selectedBil, setSelectedBil}) {

  NoScroll.on();

  sessionStorage.removeItem("cukai");
  const nokp = getNOKP();
  const displayKP = '<h5 className="uppercase font-medium text-xs text-gray-600">No Kad Pengenalan </h5>';

  const handleViewBill = (e) => {
    sessionStorage.setItem("noakaun", btoa(btoa(e)));
    window.location.href = "/bill_cukai_taksiran";
  };

  const handleBayar = (cukai, amount, penama, akaun) => {

    var array = [];
    array["CUKAI"] = cukai;
    array["TUNGGAKAN"] = amount;
    array["PEMILIK"] = penama;
    array["AKAUN"] = akaun;

    sessionStorage.setItem("INFO", btoa(btoa(btoa(JSON.stringify(array)))));
    sessionStorage.setItem("noakaun", btoa(btoa(akaun)));
    window.location.href = "/PengesahanPembayaran?Cukai=" + btoa(cukai);
  };
  
  const {addSelectedBill, resetSelectedBill} = useContext(SelectedBillContext);
  const handleAddBBayarBil = e =>{
    let newArray = [...selectedBil]
    let index = newArray.findIndex(element => element.account === e)
    if(index !== -1){
      newArray.splice(index,1);
      setSelectedBil(newArray);
    }
    else{
      setSelectedBil([...selectedBil,{'account':e}])
    }
  }

  const handleResetBill = e => {
    setSelectedBil([]);
  }

  const bills = dataset.data.length ? (
    dataset.data.map((bill) => {
      return (
        <div
          className=" w-full"
          onClick={
          //   single bill
            // bill.STATUS !== "PAID" ? (e) => handleBayar(bill.NOAKAUN, bill.BAKI_TUNGGAK, bill.NAMA_PEMILIK, bill.NOAKAUN) : () => handleViewBill(bill.NOAKAUN)
          
          // multiple bill
          (e) => addSelectedBill(bill.NOAKAUN,2)
          }
          key={bill.NOAKAUN}
        >
          <div className="flex flex-wrap ">
            <div className="w-full px-2 border-white">
              <Pane
                borderColor="white"
                width="100%"
                background="#dfe6e9"
                className="p-2 border cursor-pointer hover:bg-gray-500"
                display="grid"
                gridTemplateColumns="1px 1fr 10px"
              >
                <Pane>
                  {/* <Icon icon={DocumentIcon}></Icon>
                  <img src={iconBill} style={{width:"50px", height:"50px"}}/> */}
                  
                </Pane>
                <Pane>
                  <table border="1" cellPadding="0" className="text-left overflow-x:auto">
                    <tbody>
                      <tr>
                        <th width="110px"><Heading size={200}>{bill.NOKP === null ? "No. SSM Syarikat" : "No. Kad Pengenalan"}</Heading></th>
                        <td><Strong size={300}> : {bill.NOKP === null ? bill.NOSSM : bill.NOKP}</Strong ></td>
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
                    </tbody>
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

      <div className="w-full bg-transparent px-3">
        <Pane display="flex" alignItems="center" justifyContent="center" background="white" paddingY={100}>
          {/* <Heading size={200}>Tekan pada butang <Button type="button" appearance="primary" intent="success">Tambah Bil</Button> untuk menambah bil.</Heading> */}
          <Spinner />
        </Pane>
      </div>
    )

  if (isNoData) {
    return (
      <div className="w-full bg-transparent px-3">
        <Pane display="flex" alignItems="center" justifyContent="center" background="white" paddingY={100}>
          <Heading size={200}>Tekan pada butang <Button type="button" appearance="primary" intent="success">Tambah Bil</Button> untuk menambah bil.</Heading>
        </Pane>
      </div>
    )
  }
  else {
    return (
      <div className="">{bills}</div>
    );
  }
}
