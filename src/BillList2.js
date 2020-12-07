import React, { useState, useEffect } from "react";
import axios from "axios";
import { getNOKP } from "./Utils/Common";
import swal from "sweetalert";
import NoScroll from "no-scroll";
import BayarCukai from "./BayarCukai";
import { Pane, Spinner, Heading, Strong, Button, Icon, ArrowLeftIcon, DocumentIcon } from "evergreen-ui";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function BillList() {

    sessionStorage.removeItem("cukai");
    const nokp = getNOKP();
    const displayKP = '<h5 className="uppercase font-medium text-xs text-gray-600">No Kad Pengenalan </h5>';

    const handleViewBill = (e) => {
        sessionStorage.setItem("noakaun", btoa(btoa(e)));
        window.location.href = "/bill_cukai_taksiran";
    };

    const handleBayar = (cukai, amount, penama, akaun) => {

        var array = [];
        array["CUKAI"] = cukai;
        array["TUNGGAKAN"] = amount;
        array["PEMILIK"] = penama;
        array["AKAUN"] = akaun;

        sessionStorage.setItem("INFO", btoa(btoa(btoa(JSON.stringify(array)))));
        sessionStorage.setItem("noakaun", btoa(btoa(akaun)));
        window.location.href = "/PengesahanPembayaran?Cukai=" + btoa(cukai);
    };

    const [dataset, setDataSet] = useState({
        data: [],
    });
    const [loading, setLoading] = useState(false);
    const [isNoData, setIsNoData] = useState(false);
    const [count, setCount] = useState({
        prev: 0,
        next: 10
    })
    const [hasMore, setHasMore] = useState(true);
    const [current, setCurrent] = useState(dataset.data.slice(count.prev, count.next))

    useEffect(() => {

        const formData = new FormData();
        formData.append("nokp", nokp);
        axios
            .post(
                "https://mymps.mps.gov.my/int/api_generator.php?api_name=showBill",
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

    const getMoreData = () => {
        if (current.length === dataset.data.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setCurrent(current.concat(dataset.data.slice(count.prev + 10, count.next + 10)))
        }, 1000)
        setCount((prevState) => ({ prev: prevState.prev + 10, next: prevState.next + 10 }))
    }

    if (dataset.data !== null && loading === false) {
        return (
            <InfiniteScroll
                dataLength={current.length}
                next={getMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                <div>
                    {current && current.map(((item, index) => (
                        <div key={index} className="post">
                            <h3>{`${item.title}-${item.id}`}</h3>
                            <p>{item.body}</p>
                        </div>
                    )))
                    }
                </div>
            </InfiniteScroll>
        );

    } else if (dataset.data === null && loading === false) {
        return (<div>
            
        </div>);
    } else if (loading === true) {

        return (
            <div className="w-full bg-transparent px-3">
                <Pane display="flex" alignItems="center" justifyContent="center" background="white" paddingY={100}>
                    <Spinner />
                </Pane>
            </div>
        );
    }
}
