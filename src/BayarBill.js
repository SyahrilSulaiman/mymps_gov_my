import React, { useState, useEffect } from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import Footer from "./components/Footers/Footer";
import swal from "sweetalert";
import {Pane, Heading, Text, Button,Icon, AddIcon, ArrowLeftIcon} from "evergreen-ui";
// import SenaraiBil from './SenaraiBil';
// import Carian from './Carian';
import BillList from './BillList';

function Bill(props) {

	const token   = getToken();
	const user    = getUser();
	const nokp    = getNOKP();

	const [include,isInclude] = useState(false);
	const [dataset, setDataSet] = useState({
		jenis: 'Cukai Taksiran',
		akaun: 'A929181',
		amaun:'RM 30.00',
		tempoh:'Januari - Jun 2020',
		status:'Telah dibayar'
	});

		// setDataset({
		// 	...dataset,
		// 	jenis: 'Cukai Taksiran',
		// 	akaun: 'A929181',
		// 	amaun:'RM 30.00',
		// 	tempoh:'Julai - Disember 2020',
		// 	status:'Telah dibayar'
		// });

  // useEffect(async() => {

  //   var url = "https://toyyibpay.com/api/getBankFPX";

  //   const tarik   = await fetch(url);
  //   const data    = await tarik.json();

  //   for(var i = 0; i < data.length; i++){
  //     const item  = data[i].CODE;
  //     setDataSet(item);
  //   }
    
	// }, []);

	// bil > {bawak state} > bil detail
	
	
	const handleReceipt= (e) =>{
		// let url = 
		console.log(user);
		console.log(token);
		console.log(nokp);
		let id= '1';

		let url = btoa('nokp='+nokp+'&code=receipt'+'&id='+id);
		window.open('https://mymps.corrad.my/rp/receipt.php?'+url);
	}

	const handleReceipt2 = (e) => {
		let id= '2';
		let url = btoa('nokp='+nokp+'&code=receipt'+'&id='+id);
		window.open('https://mymps.corrad.my/rp/receipt.php?'+url);
  }
  
//   const handleStatus = (e) => {
// 		swal('Alamat emel belum disahkan','Sila sahkan alamat emel anda','info');
// 	}

  const handleAddBill = () => {
	console.log('Add Bil');
	window.location.href = '/add_cukai_taksiran';
}

  const handleBayar = () => {
	  console.log('Bayar');
	  window.location.href = '/payment';
  }


  return (
	<div>
      <Sidebar />
		<div className="relative md:ml-64 bg-gray-400" style={{ height: "100vh" }}>
			<Navbar />
			<Pane background="#2c3e50" className="p-3" position="relative">
				 <Heading size={400} color="white">{/*<Icon icon={ArrowLeftIcon} size={12} onClick={() => window.history.back()}/>*/} Bil / Senarai Cukai</Heading> 
			</Pane>
			{/* Header */}
						<div className="relative bg-gray-500 md:pt-32 pt-4 pb-4" style={{height: "100%"}}>
							<div className="px-4 md:px-10 mx-auto w-full" >
								<div className="flex flex-wrap">
									<div className="w-full px-4">
										<div className="relative flex flex-col min-w-0 break-words">
											<div className="flex-auto p-4">
												<div className="flex flex-row ">
													<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
														{/* <Pane background="#2c3e50" className="p-3 rounded-md">
															<Heading size={400} color="white">Bil Cukai Taksiran</Heading>
														</Pane> */}
													</div>
													<div  className="relative w-auto pl-4 flex-initial" onClick={handleAddBill} >
														<Button
														appearance="primary"
														intent="success"
														iconBefore={AddIcon}
														>
															Tambah
														</Button>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="w-full p-2 overflow-y-scroll" style={{height:"450px"}}>
										<div className="relative flex flex-col min-w-0 break-words" height={50}>
											<div className="flex-auto" height={50}>
												<BillList height={50}/>
											</div>
										</div>
									</div>

								</div>
							</div>
							{
								// List state -> so class
								// View bill state -> class jugak
								// routing sikit
							}
							{/* <BillList /> */}
					</div>
					{/* <Footer /> */}
			</div>
        
      </div>
  );
}

export default Bill;
