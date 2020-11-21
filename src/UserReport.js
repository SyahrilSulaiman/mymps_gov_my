import React, { useState, useEffect } from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import { Pane, toaster, Button, AddIcon, ArrowLeftIcon, SortNumericalIcon, Tablist, Tab } from "evergreen-ui";
import BillList from './BillList';
import Topbaer from "./Topbar2";

function Bill(props) {

	return (
		<div>
			<Sidebar />
			<div className="relative md:ml-64 bg-gray-400" style={{ height: "100vh" }}>
				<Navbar />
				<div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
					<div className="flex flex-wrap ">
						<Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
							<Topbaer title="Laporan / Laporan Pengguna" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
						</Pane>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bill;
