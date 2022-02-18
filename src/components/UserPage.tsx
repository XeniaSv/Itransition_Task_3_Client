import DataTable from "./DataTable";
import Toolbar from "./ToolBar";
import {useContext, useEffect, useRef} from 'react'
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

export default function UserPage() {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const tableRef = useRef();

    useEffect(() => {
        const interval = setInterval(async () => {
            if (localStorage.getItem('token')) {
                const response = await store.checkAuth();
                if (response.status == 200) {}
                else {
                    clearInterval(interval);
                    navigate('/login');
                }
            }
        }, 5000);
    });

    const parentProps = {
        "onBlockUnblockDeleteUser": () => {
            // @ts-ignore
            tableRef.current?.update();
        }
    }

    return (
        <div>
            <Toolbar {...parentProps}/>
            <DataTable ref={tableRef}/>
        </div>
    )
}