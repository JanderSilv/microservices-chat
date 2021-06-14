import { gql, useMutation } from "@apollo/client";
import { Button, Card, Elevation, FormGroup, InputGroup } from "@blueprintjs/core";
import { useRecoilState } from "recoil";
import userSessionAtom from "#root/recoil/atoms/userSession";
import { ChangeEvent, FormEvent, useState } from "react";

const sumMutation = gql`
  mutation sum($num1: Int!, $num2: Int!) {
    sum(num1: $num1, num2: $num2)
  }
`

const mutation = gql`
  mutation {
    deleteUserSession(me: true)
  }
`
const Main = () => {
  const [logout] = useMutation(mutation);
  const [sum, { data }] = useMutation(sumMutation);

  const [userSession, setUserSession] = useRecoilState(userSessionAtom);
  const [form, setForm] = useState({
    num1: '',
    num2: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm(prevValue => ({
      ...prevValue,
      [event.target.name]: event.target.value
    }))
  };

  const handleLogout = () => {
    logout().then(() => {
      setUserSession(null)
    });
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    sum({
      variables: { num1: Number(form.num1), num2: Number(form.num2) }
    })
  }

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Card elevation={Elevation.TWO} style={{ width: '30vw', margin: 'auto' }}>
        <h1>Olá, {userSession?.user?.username}</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Número 1"
            labelFor="num1-input"
            labelInfo="(required)">
            <InputGroup name="num1" id="num1-input" placeholder="Número 1" value={form.num1} onChange={handleChange} />
          </FormGroup>
          <FormGroup
            label="Número 2"
            labelFor="num2-input"
            labelInfo="(required)">
            <InputGroup name="num2" id="num2-input" placeholder="Número 2" value={form.num2} onChange={handleChange} />
          </FormGroup>
          <Button type="submit" className="bp3-intent-primary" style={{ marginRight: '1rem' }}>Somar</Button>
        </form>
        <h1>Resposta: {data?.sum}</h1>
        <Button onClick={handleLogout} className="bp3-intent-primary">Deslogar</Button>
      </Card>
    </div>);
};

export default Main;