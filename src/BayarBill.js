import React, { useState, useEffect } from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import Footer from "./components/Footers/Footer";
import swal from "sweetalert";
import { Pane, Heading, Text, Button, Icon, AddIcon, ArrowLeftIcon } from "evergreen-ui";
// import SenaraiBil from './SenaraiBil';
// import Carian from './Carian';
import BillList from './BillList';

function Bill(props) {

	const token = getToken();
	const user = getUser();
	const nokp = getNOKP();

	const [include, isInclude] = useState(false);
	const [dataset, setDataSet] = useState({
		jenis: 'Cukai Taksiran',
		akaun: 'A929181',
		amaun: 'RM 30.00',
		tempoh: 'Januari - Jun 2020',
		status: 'Telah dibayar'
	});

	const handleReceipt = (e) => {
		// let url = 
		console.log(user);
		console.log(token);
		console.log(nokp);
		let id = '1';

		let url = btoa('nokp=' + nokp + '&code=receipt' + '&id=' + id);
		window.open('https://mymps.corrad.my/rp/receipt.php?' + url);
	}

	const handleReceipt2 = (e) => {
		let id = '2';
		let url = btoa('nokp=' + nokp + '&code=receipt' + '&id=' + id);
		window.open('https://mymps.corrad.my/rp/receipt.php?' + url);
	}

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
				<div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
					<div className="flex flex-wrap ">
						<Pane background="#2c3e50" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
							<Heading size={400} color="white"><Icon icon={ArrowLeftIcon} size={12} onClick={() => window.history.back()} /> Bil / Senarai Bil</Heading>
						</Pane>
						<Pane className="py-5 xl:mx-4 xl:rounded-md" position="relative" width="100%">
							<Button
								appearance="primary"
								intent="success"
								iconBefore={AddIcon}
								className="xs:ml-5"
								onClick={handleAddBill}
							>
								Tambah Bil
							</Button>
						</Pane>
						<div className="w-full">
                                <div className="flex-auto mt-6 " style={{height:"80vh"}}>
									<BillList />
								</div>
						</div>
						{/* 
						<div className="w-full">
							<div className="relative flex flex-col min-w-0 break-words">
								<div className="flex-auto p-4">
									<div className="flex flex-row ">
										<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
										</div>
										<div className="relative w-auto pl-4 flex-initial" onClick={handleAddBill} >
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
						*/}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bill;
