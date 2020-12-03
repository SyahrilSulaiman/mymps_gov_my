import React, { useState, useEffect } from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import { Pane, toaster, Button, AddIcon, ArrowLeftIcon, Dialog, SortNumericalIcon, Tablist, Tab, Heading } from "evergreen-ui";
import BillList from './BillList';
import Topbaer from "./Topbar2";
import axios from 'axios'
import swal from 'sweetalert'

function Bill(props) {

	const token 	= getToken();
	const user 		= getUser();
	const nokp 		= getNOKP();
	const [dialog, setDialog ] = useState(false);
	const [dataset, setDataSet] = useState({data: []});
	const [loading, setLoading] = useState(false);
	const [isNoData, setIsNoData] = useState(false);
	const [selectedBil, setSelectedBil] = useState([]);

	const handleAddBill = () => {
		window.location.href = '/add_cukai_taksiran';
	}

	useEffect(() => {
		console.log('Selected Bil :', selectedBil)
	},[selectedBil])

	useEffect(() => {

		const formData = new FormData();
		formData.append("nokp", nokp);
		axios
		  .post(
			"https://mymps.corrad.my/int/api_generator.php?api_name=showBill",
			formData
		  )
		  .then((res) => {
			setLoading(true);
			if (res.data.status === "success") {
			  setDataSet({
				data: res.data.data,
			  });
			  setLoading(false);
			} else {
			  setIsNoData(true);
			  setLoading(false);
			}
		  })
		  .catch((err) => {
			console.log(err);
			swal("Ralat", "Sila hubungi pentadbir sistem!", "error");
		  });
	
	
	  }, []);

	return (
		<div>
			<Sidebar />
			<div className="relative md:ml-64" style={{ height: "100vh", background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)" }}>
				<Navbar />
				<div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16" style={{ background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
					<div className="flex flex-wrap ">
						<Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
							<Topbaer title="Bil / Cukai Taksiran" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
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
								<BillList dataset={dataset} isNoData={isNoData} selectedBil={selectedBil} setSelectedBil={setSelectedBil}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bill;
