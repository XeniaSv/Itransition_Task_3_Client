import * as React from 'react';
import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import moment from 'moment';
import {DataGrid, GridColDef, GridRowsProp, GridSelectionModel} from '@mui/x-data-grid';
import UserService from "../services/UserService";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 245},
    {field: 'firstName', headerName: 'First name', width: 110},
    {field: 'email', headerName: 'Email', width: 220},
    {field: 'regData', headerName: 'Registration data', width: 200},
    {field: 'lastLogin', headerName: 'Last login', width: 200},
    {field: 'isActivated', headerName: 'Is activated', width: 110},
    {field: 'isBlocked', headerName: 'Is blocked', width: 100},
];

const DataTable = forwardRef((props, ref) => {
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

    useEffect(() => {
        getUsers();
    }, []);

    useImperativeHandle(ref, () => ({
        update() {
            getUsers();
        }
    }));

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            const userArray: GridRowsProp = response.data.map((user) => {
                return {
                    id: user._id,
                    firstName: user.name,
                    email: user.email,
                    regData: (moment(user.registrationDate)).format('DD-MM-YYYY HH:mm'),
                    lastLogin: (moment(user.lastLoginDate)).format('DD-MM-YYYY HH:mm'),
                    isActivated: user.isActivated,
                    isBlocked: user.isBlocked
                }
            })
            setRows(userArray);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div style={{height: 500, width: 1200, margin: "0 auto"}}>
            <DataGrid
                style={{fontSize: 16}}
                rows={rows}
                columns={columns}
                //pageSize={5}
                rowsPerPageOptions={[50]}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                    localStorage.setItem("selectedIds", newSelectionModel.toString())
                    console.log(localStorage)
                }}
                selectionModel={selectionModel}/>
        </div>
    );
})

export default DataTable;