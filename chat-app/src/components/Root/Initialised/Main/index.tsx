import { gql, useMutation } from "@apollo/client";
import { Button, Card, Elevation } from "@blueprintjs/core";
import { useRecoilState } from "recoil";
import userSessionAtom from "#root/recoil/atoms/userSession";

// const query = gql`
//   query {
//     userSession(me: true) {
//       user {
//         username
//       }
//     }
//   }
// `

const mutation = gql`
  mutation {
    deleteUserSession(me: true)
  }
`
const Main = () => {
  // const {data, loading} = useQuery(query);
  const [logout] = useMutation(mutation);

  const [userSession, setUserSession] = useRecoilState(userSessionAtom);

  const handleLogout = () => {
    logout().then(() => {
      setUserSession(null)
    });
  }

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Card elevation={Elevation.TWO} style={{ width: '30vw', margin: 'auto' }}>
        <h1>Olá, {userSession?.user?.username}</h1>
        <Button onClick={handleLogout} className="bp3-intent-primary">Deslogar</Button>
      </Card>
    </div>);
};

export default Main;