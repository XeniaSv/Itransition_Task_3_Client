import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import TextField from '@mui/material/TextField';
import {Grid, Paper} from "@mui/material";
import {styled} from "@mui/material/styles";
import Button from '@mui/material/Button';
import {grey} from '@mui/material/colors';
import {useNavigate} from "react-router-dom"

const margin = {
    marginTop: '10px',
}

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const LoginForm: FC = () => {
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');

    const [registrationName, setRegistrationName] = useState<string>('');
    const [registrationEmail, setRegistrationEmail] = useState<string>('');
    const [registrationPassword, setRegistrationPassword] = useState<string>('');

    const {store} = useContext(Context);
    return (
        <div style={{margin: '100px auto', width: '70%', height: '100%'}}>

            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={6}>
                    <Item style={{border: '1px solid #b0bec5'}}>
                        <h2>Log in</h2>
                        <div style={{
                            margin: '0 auto',
                            display: "flex",
                            flexDirection: "column",
                            width: 300,
                            alignItems: "center"
                        }}>
                            <TextField
                                onChange={e => setLoginEmail(e.target.value)}
                                value={loginEmail}
                                style={margin}
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"/>
                            <TextField
                                onChange={e => setLoginPassword(e.target.value)}
                                value={loginPassword}
                                style={margin}
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"/>
                            <Button style={{
                                backgroundColor: grey[300],
                                color: grey[700],
                                borderColor: grey[600],
                                marginTop: '10px',
                                marginBottom: '10px'
                            }}
                                    disabled={loginEmail == '' || loginPassword == ''}
                                    onClick={async () => {
                                        const res = await store.login(loginEmail, loginPassword);
                                        if (res.status == 200) {
                                            navigate('/userPage')
                                        } else {
                                            alert(res?.data?.message)
                                        }
                                    }}
                                    variant="contained">
                                Log in
                            </Button>
                        </div>

                    </Item>
                </Grid>
                <Grid item xs={6}>

                    <Item style={{border: '1px solid #b0bec5'}}>
                        <h2>Sign up</h2>
                        <div style={{
                            margin: '0 auto',
                            display: "flex",
                            flexDirection: "column",
                            width: 300,
                            alignItems: "center"
                        }}>
                            <TextField
                                onChange={e => setRegistrationName(e.target.value)}
                                value={registrationName}
                                style={margin}
                                id="outlined-basic"
                                label="First Name"
                                variant="outlined"/>
                            <TextField
                                onChange={e => setRegistrationEmail(e.target.value)}
                                value={registrationEmail}
                                style={margin}
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"/>
                            <TextField
                                onChange={e => setRegistrationPassword(e.target.value)}
                                value={registrationPassword}
                                style={margin}
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"/>
                            <Button style={{
                                backgroundColor: grey[300],
                                color: grey[700],
                                borderColor: grey[600],
                                marginTop: '10px',
                                marginBottom: '10px'
                            }}
                                    disabled={registrationName == '' || registrationEmail == '' || registrationPassword == ''}
                                    onClick={async () => {
                                        const res = await store.registration(registrationName, registrationEmail, registrationPassword);
                                        if (res.status == 201) {
                                            navigate('/userPage')
                                        } else {
                                            alert(res?.data?.message)
                                        }
                                    }}
                                    variant="contained">
                                Sign up
                            </Button>
                        </div>

                    </Item>
                </Grid>


            </Grid>
            {/*<input*/}
            {/*    onChange={e => setEmail(e.target.value)}*/}
            {/*    value={email}*/}
            {/*    type="text"*/}
            {/*    placeholder='Email'*/}
            {/*/>*/}

            {/*<input*/}
            {/*    onChange={e => setPassword(e.target.value)}*/}
            {/*    value={password}*/}
            {/*    type="password"*/}
            {/*    placeholder='Password'*/}
            {/*/>*/}


        </div>
    );
};

export default observer(LoginForm);