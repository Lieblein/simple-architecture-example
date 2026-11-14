import { enableMapSet } from 'immer';
import Layout from '@components/Layout';
import ShowListPage from './pages/ShowListPage';

enableMapSet();

export default function App() {
  return (
    <Layout>
      <ShowListPage />
    </Layout>
  );
}
