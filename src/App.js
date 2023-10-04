import Container from 'react-bootstrap/Container';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Lists from './components/Lists';

function App() {
  return (
    <>
      <Container>
        <h1>MCS Lists</h1>
        <Routes>
          <Route path="/" element={<Lists />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
