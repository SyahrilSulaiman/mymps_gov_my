import React, { useState, useEffect } from 'react'
import {Pane, Text, Heading} from 'evergreen-ui'

export default function JumlahPembayaran({value, pengguna}){
    return (
        
        <Pane clearfix background="white" className={'rounded-md w-full flex'}>
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
            className={'rounded-md w-full flex-1'}
            >
                <Text>Jumlah Pengguna</Text>
                {
                    // pengguna.map((res,index) => {
                    //     <Text size={300}>{res.name} {res.value}</Text>
                    // })
                }
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
            className={'rounded-md w-full flex-1'}

            >
                <Text>Tahunan</Text>
                <Text size={300}>RM { /*value[0].yearly*/}</Text>
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
            className={'rounded-md w-full flex-1'}

            >
                <Text>Bulanan</Text>
                <Text size={300}>RM {/*value[0].monthly*/}</Text>
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
            className={'rounded-md w-full flex-1'}

            >
                <Text>Harian</Text>
                <Text size={300}>RM {/*(value[0].daily === 0 || value[0].daily === null )? 0 : value[0].daily */}
            </Text>
            </Pane>
        </Pane>
    )
}