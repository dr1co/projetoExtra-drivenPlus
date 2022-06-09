import ReactDOM from 'react-dom';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import Subscriptions from './components/Subscriptions.js';
import SubscriptionPlan from './components/SubscriptionPlan.js';
import Home from './components/Home.js';
import User from './components/User.js';
import UpdateUser from './components/UpdateUser.js';

import UserContext from './contexts/UserContext.js';

import './assets/css/reset.css';

function App() {
    const localUser = JSON.parse(localStorage.getItem("localUser"));
    const [user, setUser] = useState({
        id: undefined,
        name: "",
        cpf: "",
        email: "",
        password: "",
        membership: null
    })

    if (localUser !== null) {
        setUser({
            id: localUser.id,
            name: localUser.name,
            cpf: localUser.cpf,
            email: localUser.email,
            password: localUser.password,
            membership: localUser.membership
        });
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ user, setUser }}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/subscriptions/:planId" elememt={<SubscriptionPlan />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/users/:userId" element={<User />} />
                    <Route path="/users/:userId/update" element={<UpdateUser />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));