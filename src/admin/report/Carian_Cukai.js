import React, { useState, useEffect } from 'react'
import { Pane, TextInputField, Button, SearchIcon, ArrowLeftIcon, Heading } from "evergreen-ui";
import NoScroll from "no-scroll";
import swal from 'sweetalert2';
import axios from 'axios';
import SenaraiCukai from './Laporan_Carian_Cukai'



export default function Carian_Cuaki({type, startDate}){
    const [loading, setLoading] = useState(false);
    const [account,setAccount] = useState('');
    const [result,setResult] = useState('');
    // console.log(result);
    const handleChange = (e) => {
        setAccount(e.target.value);
    }

    const handleSubmit = (e) => {
            e.preventDefault();
            console.log(account);
            console.log(type);
            console.log(startDate);
            const formData = new FormData();
            formData.append('account',account);
            formData.append('type',type);
            formData.append('date',startDate);
            axios.post('https://mymps.mps.gov.my/int/api_generator.php?api_name=laporan_cukai_taksiran',formData)
            .then(res => {
                console.log(res.data);
                // console.log(JSON.parse(res.data.result))
                setLoading(true);
                if(res.data.status === 'success'){
                    setResult(JSON.parse(res.data.result))
                }
                else if(res.data.status === 'failure'){
                    setResult('');
                }
                else{
                    swal.fire('Ralat','Sila hubungi pentadbir system','error');
                }
            })
    }

    return (
        <div>
            {/* Header */}
            <div className="relative pb-4 ">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            {
                                type === '' ? '' :
                                <Pane display="flex">
                                <TextInputField
                                    width="100%"
                                    required
                                    onChange={handleChange}
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
                            }

                            <Pane>
                                <Button
                                    type="submit"
                                    iconBefore={SearchIcon}
                                    appearance="primary"
                                    intent="success"
                                    className="float-right"
                                    // onClick={handleSearch}
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
                                <Heading size={400} textAlign="center" color="white">Senarai laporan bayaran akan dipaparkan dibawah</Heading>
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
                                loading? (
                                    result === '' ? 'Maklumat laporan bayaran tidak ditemui' : <SenaraiCukai result={result} type={type}/> ):  ''
                                // <SenaraiCukai result={result} type={type}/>
                            }
                        </Pane>
                    </div>
                </div>
            </div>
        </div>
    );
}