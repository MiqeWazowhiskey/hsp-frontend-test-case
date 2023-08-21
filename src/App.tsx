import './App.css'
import Layout from "./components/Layout";
import Card from "./components/Card";
import {GetUsers} from "./api/users.ts";

function App() {
    const users = GetUsers();
    console.log(users);
  return (
    <Layout>
        <Card title='Card Title' className='w-1/2'>
            <div className='text-2xl'>Card Content</div>
        </Card>
    </Layout>
  )
}


export default App
