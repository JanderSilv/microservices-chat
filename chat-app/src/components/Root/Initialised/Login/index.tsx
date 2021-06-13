import { Link } from 'react-router-dom'
import userSessionAtom from "#root/recoil/atoms/userSession";
import { gql, useMutation } from "@apollo/client";
import { Button, Card, Elevation, FormGroup, InputGroup, AnchorButton } from "@blueprintjs/core";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRecoilState } from "recoil";

const mutation = gql`
  mutation createUserSession($password: String!, $username: String!) {
    createUserSession(
        username: $username,
        password: $password,
      ) {
        createdAt
        user {
          username
      }
    }
  }
`

const Login = () => {
  const [, setUserSession] = useRecoilState(userSessionAtom);
  const [login] = useMutation(mutation);

  const [form, setForm] = useState({
    username: 'Jander',
    password: 'password',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm(prevValue => ({
      ...prevValue,
      [event.target.name]: event.target.value
    }))
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    login({
      variables: { ...form }
    }).then((response) => {
      setUserSession(response.data.createUserSession)
    });
  }

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Card elevation={Elevation.TWO} style={{ width: '30vw', margin: 'auto' }}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Nome de Usuário"
            labelFor="username-input"
            labelInfo="(required)">
            <InputGroup name="username" id="username-input" placeholder="Nome de Usuário" value={form.username} onChange={handleChange} />
          </FormGroup>
          <FormGroup
            label="Senha"
            labelFor="password-input"
            labelInfo="(required)">
            <InputGroup name="password" id="password-input" placeholder="Sua senha" value={form.password} onChange={handleChange} />
          </FormGroup>
          <Button type="submit" className="bp3-intent-primary" style={{ marginRight: '1rem' }}>Submit</Button>
          <Link to="/criar-conta">
            <Button text="Criar Conta!" />
          </Link>
        </form>
      </Card>
    </div>);
};

export default Login;