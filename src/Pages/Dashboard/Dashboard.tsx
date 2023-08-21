import Layout from "../../components/Layout";
import Card from "../../components/Card";

export const Dashboard: React.FC = () => {
    return (
        <Layout>
            <Card title='Card Title' className='w-1/2'>
                <div className='text-2xl'>Card Content</div>
            </Card>
        </Layout>
    );
}