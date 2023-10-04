import Container from 'react-bootstrap/Container';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Lists from './components/Lists';
import List from './components/List';
import NewList from './components/NewList';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <Container>
        <h1>MCS Lists</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/lists/:id" element={<List />} />
          <Route path="/lists/new" element={<NewList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
