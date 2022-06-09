import styled from 'styled-components';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import UserContext from '../contexts/UserContext.js';

import logo from '../assets/media/Driven_white 1.png';

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("")
    const { user, setUser } = useContext(UserContext);

    let navigate = useNavigate();
    
    if(user.id !== undefined) {
        if (user.membership !== null) {
            navigate("/home");
        } else {
            navigate("/subscriptions");
        }
    }

    function signUp() {
        if (credentials.email !== "" && credentials.password !== "") {
            setMessage("")
            const request = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", credentials);
            request.then((res) => {
                setUser({
                    id: res.data.id,
                    name: res.data.name,
                    cpf: res.data.cpf,
                    email: res.data.email,
                    password: res.data.password,
                    membership: res.data.membership
                });
                localStorage.setItem("localUser", JSON.stringify(user));
                if (res.data.membership !== null) {
                    navigate("/home");
                } else {
                    navigate("/subscriptions");
                }
            });
            request.catch((err) => {
                switch (err.response.status) {
                    case 401:
                        setMessage("Usuário não encontrado. Verifique os dados e tente novamente!");
                        break;
                    case 422:
                        setMessage("Dados inválidos. Verfique-os e tente novamente!");
                        break;
                    case 500:
                        setMessage("Servidor caiu. Tente novamente mais tarde...");
                        break;
                    default:
                        setMessage("Verifique os dados e tente novamente!");
                }
            })
        } else {
            setMessage("Preencha os dados corretamente!");
        }
    }

    return (
        <Container>
            <Logo src={logo} alt="logo" />
            <Input type="text" placeholder="E-mail" value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})} />
            <Input type="password" placeholder="Senha" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
            <LoginButton onClick={signUp}> ENTRAR </LoginButton>
            <StyledLink to="/sign-up">
                <Register> Não possui uma conta? Cadastre-se </Register>
            </StyledLink>
            <Warn display={message === "" ? "none" : "flex"}> {message} </Warn>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    width: 300px;
    margin-bottom: 92px;
`;

const Input = styled.input`
    width: 300px;
    height: 52px;
    background-color: #FFFFFF;
    border: 0 solid transparent;
    border-radius: 8px;
    margin: 8px auto;
    padding: 0 14px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #000000;

    &::placeholder {
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        color: #7E7E7E;
    }
`;

const LoginButton = styled.button`
    width: 300px;
    height: 52px;
    background-color: #FF4791;
    border: 0 solid transparent;
    border-radius: 8px;
    margin: 16px auto;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #FFFFFF;
    cursor: pointer;
`;

const Register = styled.p`
    margin: 8px auto 0 auto;
    font-size: 14px;
    color: #FFFFFF;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const Warn = styled.p`
    width: 300px;
    font-size: 14px;
    font-weight: 700;
    color: #CC0000;
    margin: 10px auto 0 auto;
    display: flex;
    justify-content: center;
    text-align: center;
    display: ${props => props.display};
`

const StyledLink = styled(Link)`
    text-decoration: none;
`;