import userSessionAtom from "#root/recoil/atoms/userSession";
import { gql, useMutation } from "@apollo/client";
import { Button, Card, Elevation, FormGroup, InputGroup } from "@blueprintjs/core";
import { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

const mutation = gql`
  mutation createUser($password: String!, $username: String!) {
    createUser(
        username: $username,
        password: $password,
      ) {
          username
    }
  }
`

const SignUp = () => {
  const { push } = useHistory();
  const [createUser] = useMutation(mutation);

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm(prevValue => ({
      ...prevValue,
      [event.target.name]: event.target.value
    }))
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await createUser({
      variables: { ...form }
    });
    push('/');
  }

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Card elevation={Elevation.TWO} style={{ width: '30vw', margin: 'auto' }}>
        <h1>Criar conta</h1>
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
          <Button type="submit" className="bp3-intent-primary">Criar Conta</Button>
        </form>
      </Card>
    </div>);
};

export default SignUp;