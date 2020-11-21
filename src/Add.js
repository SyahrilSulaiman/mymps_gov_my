import React, { useState, useEffect } from 'react'
import Sidebar from "./Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import Search from './Search';
import { Pane, Button, Heading, Icon, ArrowLeftIcon, SelectField, toaster, Portal, Text } from "evergreen-ui";
import Topbaer from "./Topbar2";

export default function Add({ props }) {
    const [type, setType] = useState('');

    function goBack() {
        toaster.danger("Go Back");
    }

    return (
        <div>
            <Sidebar />
            <div className="relative md:ml-64 bg-gray-400" style={{ height: "100vh" }}>
                <Navbar />
                <div className="w-full xl:pt-24 lg:pt-24 md:pt-16 sm:pt-16 xs:pt-16">
                    <div className="flex flex-wrap ">
                        <Pane background="#2c3e50" className="xl:mx-4 xl:rounded-md" width="100%">
                            <Topbaer title="Bil / Tambah Bil" leftButtonIcon={ArrowLeftIcon} onClickLeftButton={() => window.history.back()} />
                        </Pane>
                    </div>
                    <div className="flex flex-wrap xl:pt-2">
                        <Pane background="white" className="p-3 xl:mx-4 xl:rounded-md" position="relative" width="100%">
                            <SelectField
                                label="Carian Bil"
                                description="Sila pilih kaedah carian bil anda"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value='tiada'>-- Sila Pilih --</option>
                                <option value="nokp">Kad Pengenalan</option>
                                <option value="ssm">Nombor ROC/ROB Syarikat</option>
                                <option value="akaun">Nombor Akaun</option>
                            </SelectField>
                            <Search type={type} />
                        </Pane>
                    </div>
                </div>

            </div>
        </div>
    );
}
