import React, { useState, useEffect } from 'react'
import { Pane, TextInputField, Button, SearchIcon, ArrowLeftIcon, Heading } from "evergreen-ui";
import NoScroll from "no-scroll";
import swal from 'sweetalert2';
import axios from 'axios';



export default function Carian_Cuaki({type}){
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        // setSearch(e.target.value);
        console.log('Search');
    }

    const handleSubmit = (e) => {
        console.log('Submit');
    }


    return (
        <div>
            {/* Header */}
            <div className="relative pb-4 ">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <Pane display="flex">
                                <TextInputField
                                    width="100%"
                                    required
                                    onChange={(e) => handleChange(e)}
                                    label={
                                        type === 'akaun' ? ('Nombor Akaun')
                                            : type === 'ssm' ? ('Nombor ROC/ROB Syarikat')
                                                : type === 'nokp' ? ('Nombor Kad Pengenalan')
                                                    : ('Carian...')
                                    }
                                    description={
                                        type === 'akaun' ? ('Lengkapkan maklumat nombor akaun dibawah.')
                                            : type === 'ssm' ? ('Lengkapkan nombor ROC/ROB syarikat dibawah.')
                                                : type === 'nokp' ? ('Lengkapkan nombor kad pengenalan dibawah')
                                                    : ('Carian...')
                                    }
                                    placeholder={
                                        type === 'akaun' ? ('Sila isi nombor akaun')
                                            : type === 'ssm' ? ('Sila isi nombor ROC/ROB Syarikat')
                                                : type === 'nokp' ? ('Sila isi nombor kad pengenalan')
                                                    : ('Carian...')
                                    }
                                />
                            </Pane>
                            <Pane>
                                <Button
                                    type="submit"
                                    iconBefore={SearchIcon}
                                    appearance="primary"
                                    intent="success"
                                    className="float-right"
                                >
                                    {loading ? 'Mencari..' : 'Cari'}
                                </Button>
    
                                <Button
                                    type="button"
                                    iconBefore={ArrowLeftIcon}
                                    appearance="primary"
                                    intent="danger"
                                    onClick={() => window.history.back()}
                                >
                                    Kembali
                                </Button>
                            </Pane>
                            <Pane marginTop={32} padding={10} background="#2d3436">
                                <Heading size={400} textAlign="center" color="white">Senarai bil akan dipaparkan dibawah</Heading>
                            </Pane>
                        </div>
                    </div>
                </form>
            </div>
            <div className="relative pb-4 overflow-y-scroll" style={{height:"422px"}}>
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <Pane background="tint1">
                            {
                                // <Carian className="bg-gray-100" bill={bill} type={type} display={display} />
                            }
                        </Pane>
                    </div>
                </div>
            </div>
        </div>
    );
}