import * as React from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, {tooltipClasses, TooltipProps} from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import UserService from "../services/UserService";
import IconButton from '@mui/material/IconButton';


const LightTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

export default function CustomizedTooltips(props: object) {
    return (
        <div style={{margin: "0 auto", width: 300, display: 'flex', justifyContent: 'space-between'}}>
            <LightTooltip title="Block">
                <Button onClick={async () => {
                    const item = localStorage.getItem('selectedIds');
                    if (item != null) {
                        const ids = item.split(',');
                        console.log(ids);
                        for (const id of ids) {
                            if (id != '') {
                                const response = await UserService.blockUser(id);
                                if (response.status == 202) {
                                    // @ts-ignore
                                    props.onBlockUnblockDeleteUser();
                                } else {
                                    alert(response);
                                }
                            }
                        }
                    }
                }} style={{color: "#607d8b", fontSize: 18}}>Block</Button>
            </LightTooltip>

            <LightTooltip title="Unblock">
                <IconButton
                    onClick={async () => {
                        const item = localStorage.getItem('selectedIds');
                        if (item != null) {
                            const ids = item.split(',');
                            for (const id of ids) {
                                if (id != '') {
                                    const response = await UserService.unblockUser(id);
                                    if (response.status == 202) {
                                        // @ts-ignore
                                        props.onBlockUnblockDeleteUser();
                                    } else {
                                        alert(response);
                                    }
                                }
                            }
                        }
                    }}
                    color="primary"
                    aria-label="add to shopping cart">
                    <LockOpenIcon style={{color: '#78909c', alignSelf: 'center'}}/>
                </IconButton>
            </LightTooltip>

            <LightTooltip title="Delete">
                <IconButton
                    onClick={async () => {
                        const item = localStorage.getItem('selectedIds');
                        if (item != null) {
                            const ids = item.split(',');
                            for (const id of ids) {
                                if (id != '') {
                                    const response = await UserService.deleteUser(id);
                                    if (response.status == 200) {
                                        // @ts-ignore
                                        props.onBlockUnblockDeleteUser();
                                    } else {
                                        alert(response.status);
                                    }
                                }
                            }
                        }
                    }}
                    color="primary"
                    aria-label="add to shopping cart">
                    <DeleteIcon style={{color: '#78909c', alignSelf: 'center'}}/>
                </IconButton>
            </LightTooltip>


        </div>
    );
}