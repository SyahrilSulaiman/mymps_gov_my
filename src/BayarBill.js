import React, { useState, useEffect } from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import { Pane, toaster, Button, AddIcon, ArrowLeftIcon, SortNumericalIcon, Tablist, Tab } from "evergreen-ui";
import BillList from './BillList';
import Topbaer from "./Topbar2";

function Bill(props) {

	const token = getToken();
	const user = getUser();
	const nokp = getNOKP();

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
						<Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
							<Topbaer title="Bil / Senarai Bil" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
						</Pane>
						<Pane className="py-5 xl:mx-4 xl:rounded-md" position="relative" width="100%">
							<Tablist display="grid" gridTemplateColumns="1fr 1fr">
								<Tab onSelect={() => handleAddBill()}>
									<Button
									width="100%"
									justifyContent="center"
									appearance="primary"
									intent="success"
									iconBefore={AddIcon}
									className="xs:ml-5"
									onClick={handleAddBill}
									>
									Tambah Bil
									</Button>
								</Tab>
								<Tab onSelect={() => toaster.danger("Harap maaf, tiada kaedah pembayaran secara menyeluruh buat masa ini.", { id: "forbidden-action" })}>
									<Button
									width="100%"
									justifyContent="center"
									appearance="primary"
									iconBefore={SortNumericalIcon}
									className="xs:ml-5 ml-1"
									onClick={() => toaster.danger("Harap maaf, tiada kaedah pembayaran secara menyeluruh buat masa ini.", { id: "forbidden-action" })}
									>
									Bayar Semua
									</Button>
								</Tab>
							</Tablist>
						</Pane>
						<div className="w-full">
							<div className="flex-auto overflow-y-scroll" style={{ height: "60vh" }}>
								<BillList />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bill;
