import './App.css'
import Layout from "./components/Layout";
import Card from "./components/Card";


function App() {

  return (
    <Layout>
        <Card title='Card Title' className='w-1/2'>
            <div className='text-2xl'>Card Content</div>
        </Card>
    </Layout>
  )
}


export default App
