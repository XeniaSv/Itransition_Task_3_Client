import React, { Component, useEffect } from 'react';
import UserPage from "./components/UserPage";
import {
    Routes,
    Route,
    useNavigate
} from "react-router-dom"
import LoginForm from "./components/LoginForm";


export default function App () {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    }, []);

    return (
            <Routes >
                <Route path='/login' element={<LoginForm />}/>
                <Route path='/userPage' element={<UserPage />}/>
            </Routes>
    );
}

// class App extends Component {
//
//     render() {
//         return (
//             <Routes >
//                 <Route path='/login' element={<LoginForm />}/>
//                 <Route path='/userPage' element={<Tooltip />}/>
//             </Routes>
//         );
//     }
// }

{/*<Tooltip/>*/}
{/*<DataTable/>*/}
{/*<LoginForm />*/}

// export default App;
