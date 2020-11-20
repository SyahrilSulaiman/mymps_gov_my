import React, { useState, useEffect } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import Carian from './Carian';
import { Pane, TextInputField, Button, SearchIcon, ArrowLeftIcon, Paragraph, Heading } from "evergreen-ui";

export default function Search({ type }) {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState(false);
    const [bill, setBill] = useState([]);

    useEffect(() => {
        // console.log(type)
    }, [type]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    let searchType = "";
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.get('https://mymps.corrad.my/int/api_generator.php?api_name=searchBill', {
            params: {
                search: search.trim(),
                type: type
            }
        })
            .then(res => {
                if (type === 'nokp') {
                    searchType = 'No Kad Pengenalan';

                    if (res.data.status === 'FAILED') {
                        setDisplay(false);
                        swal('Tidak ditemui', searchType + ' tidak ditemui', 'error');
                    }
                    else {
                        setBill(res.data);
                        // console.log('Search NOKP',res.data);
                        setDisplay(true);
                    }
                }

                if (type === 'akaun') {
                    searchType = 'Akaun';
                    // res = res.data;
                    // console.log('Search Response : ',res.data[0]);

                    if (res.data.status === 'FAILED') {
                        setDisplay(false);
                        swal('Tidak ditemui', searchType + ' tidak ditemui', 'error');
                    }
                    else {
                        setBill(res.data[0]);
                        // console.log('Search Account ',res.data);
                        // console.log('Bill Akaun',bill);
                        setDisplay(true);
                    }
                }

                if (type === 'ssm') {
                    searchType = 'No SSM';
                    res = res.data;
                    // console.log(res);

                    if (res.status === 'FAILED') {
                        setDisplay(false);
                        swal('Tidak ditemui', searchType + ' tidak ditemui', 'error');
                    }
                    else {
                        // console.log('Search SSM: ',res)
                        setBill(res);
                        setDisplay(true);
                    }
                }
                setLoading(false);
            })

    }

    if (type === '' || type === null || type == 'tiada') {
        return (
            <div></div>
        );
    }
    else {

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
                    {/* {
                    <Carian bill={bill} type={type} display={display}/>
                } */}
                </div>
                <div className="relative pb-4 overflow-y-scroll" style={{height:"422px"}}>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <Pane background="tint1">
                                {
                                    <Carian className="bg-gray-100" bill={bill} type={type} display={display} />
                                }
                            </Pane>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}