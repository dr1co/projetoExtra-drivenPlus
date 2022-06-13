import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        name: "",
        cpf: "",
        password: ""
    });

    let navigate = useNavigate()

    function signUp() {
        if (credentials.email !== "" && credentials.name !== "" && credentials.cpf.length === 11 && credentials.password !== "") {
            editCpf(credentials.cpf)
            setMessage("");
            const request = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", credentials);
            request.then(() => {
                setSuccess(true);
                setTimeout(() => navigate("/"), 3000);
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
            });
        } else {
            setMessage("Preencha os dados corretamente!");
        }
    }

    function editCpf(cpf) {
        let newCpf = cpf;
        for (let i = 3; i < cpf.length; i += 4) {
            newCpf = [newCpf.slice(0, i), ".", newCpf.slice(i)].join('');
        }
        newCpf = [newCpf.slice(0, 11), "-", newCpf.slice(11)].join('');
        setCredentials({...credentials, cpf: newCpf});
    }

    return (
        <Container>
            <Input type="text" placeholder="Nome" value={credentials.name} onChange={(e) => setCredentials({...credentials, name: e.target.value})} />
            <Input type="text" placeholder="CPF (somente números)" value={credentials.cpf} onChange={(e) => setCredentials({...credentials, cpf: e.target.value})} />
            <Input type="text" placeholder="E-mail" value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})} />
            <Input type="password" placeholder="Senha" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
            <RegisterButton onClick={signUp}> CADASTRAR </RegisterButton>
            <StyledLink to="/">
                <Login> Já possui uma conta? Entre </Login>
            </StyledLink>
            <Warn display={message === "" ? "none" : "flex"}> {message} </Warn>
            <Success display={success ? "flex" : "none"}> Usuário cadastrado com sucesso! Redirecionando... </Success>
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

const RegisterButton = styled.button`
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

const Login = styled.p`
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
`;

const Success = styled.p`
    width: 300px;
    font-size: 14px;
    font-weight: 700;
    color: #CC0000;
    margin: 10px auto 0 auto;
    display: flex;
    justify-content: center;
    text-align: center;
    display: ${props => props.display};
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;