import React, { useState, useEffect } from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import { Pane, toaster, Button, AddIcon, ArrowLeftIcon, Icon, SortNumericalIcon, Tablist, Tab, Heading, ArrowRightIcon } from "evergreen-ui";
import BillList from './BillList';
import Topbaer from "./Topbar2";
import swal from "sweetalert";
import noscroll from "no-scroll";

function Bill(props) {

	noscroll.on();

	const token 	= getToken();
	const user 		= getUser();
	const nokp 		= getNOKP();
	const [dialog, setDialog ] = useState(false)

	const handleAddBill = () => {
		window.location.href = '/add_cukai_taksiran';
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
						<div className="w-full mx-4">
							<div className="flex-auto overflow-y-scroll" style={{ height: "100vh" }}>
								{/* <BillList /> */}
								<Pane width="100%">
									<Pane display="grid" gridTemplateColumns="1fr 20px" className="p-5 my-1 rounded-lg" background="#2f3542" onClick={() => window.location.href = "/cukaitaksiran"}>
										<Pane><Heading color="#f1f2f6"> Cukai Taksiran </Heading><small className="text-gray-500">Senarai bil cukai taksiran</small></Pane>
										<Pane><Icon icon={ArrowRightIcon} color="#f1f2f6" className="py-5"></Icon></Pane>
									</Pane>
									<Pane display="grid" gridTemplateColumns="1fr 20px" className="p-5 my-1 rounded-lg" background="#2f3542" color="#f1f2f6" onClick={() => window.location.href = "/kompaun"}>
										<Pane><Heading color="#f1f2f6"> Kompaun </Heading><small className="text-gray-500">Senarai bil kompaun</small></Pane>
										<Pane><Icon icon={ArrowRightIcon} color="#f1f2f6" className="py-5"></Icon></Pane>
									</Pane>
									<Pane display="grid" gridTemplateColumns="1fr 20px" className="p-5 my-1 rounded-lg" background="#2f3542" color="#f1f2f6" onClick={() => window.location.href = "/lesen"}>
										<Pane><Heading color="#f1f2f6"> Lesen </Heading><small className="text-gray-500">Senarai bil lesen</small></Pane>
										<Pane><Icon icon={ArrowRightIcon} color="#f1f2f6" className="py-5"></Icon></Pane>
									</Pane>
								</Pane>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bill;
