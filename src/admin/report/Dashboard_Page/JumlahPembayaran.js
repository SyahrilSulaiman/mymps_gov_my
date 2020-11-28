import React, { useState, useEffect } from 'react'
import {Pane, Text, Heading} from 'evergreen-ui'
import {Link} from 'react-router-dom';

export default function JumlahPembayaran({value, user}){
    console.log('Jumlah : ',user);
    // const viewUser = (e) => {
    //     // console.log('LOLLL');
    //     history.push("./admin/usermanagement");
    // }
    return (
        
        <Pane clearfix className={'rounded-md w-full flex flex-wrap min-height-screen'}>
            
        
            <Pane
            elevation={1}
            float="left"
            // width={200}
            // height={120}
            margin={24}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            className={'rounded-md bg-white  lg:flex-1 cursor-pointer text-white hover:bg-green-600 bg-gradient-to-tr from-green-300 to-green-400'}
            // onClick={viewUser}
            >
                <Text>Jumlah Pengguna</Text>
                {
                    // pengguna.map((res,index) => {
                    //     <Text size={300}>{res.name} {res.value}</Text>
                    // })

                }
                {
                    user.map((data,index) => {
                        return(
                        <div key={index}>
                            <Text size={300}>{data.name}: {data.value}</Text>
                        </div>
                        )
                    })
                }
                    <div>
                        <Heading size={100}>Maklumat Lanjut </Heading>
                    </div>
            </Pane>


            <Pane
            elevation={1}
            float="left"
            // width={200}
            // height={120}
            margin={24}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            className={'rounded-md bg-white w-full lg:flex-1'}

            >
                <Text>Jumlah Bayaran Tahunan</Text>
                <Text size={300}>RM 1000{ /*value[0].yearly*/}</Text>
            </Pane>
            <Pane
            elevation={1}
            float="left"
            // width={200}
            // height={120}
            margin={24}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            className={'rounded-md bg-white w-full lg:flex-1'}

            >
                <Text>Jumlah Bayaran Bulanan</Text>
                <Text size={300}>RM 600{/*value[0].monthly*/}</Text>
            </Pane>
            <Pane
            elevation={1}
            float="left"
            // width={200}
            // height={120}
            margin={24}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            className={'rounded-md bg-white w-full lg:flex-1'}

            >
                <Text>Jumlah Bayaran Harian</Text>
                <Text size={300}>RM 50{/*(value[0].daily === 0 || value[0].daily === null )? 0 : value[0].daily */}
            </Text>
            </Pane>
        </Pane>
    )
}