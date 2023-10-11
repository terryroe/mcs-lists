import './App.css';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Home from './components/Home';
import Lists from './components/Lists';
import List from './components/List';
import NewList from './components/NewList';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="lists" element={<Lists />} />
          <Route path="lists/new" element={<NewList />} />
          <Route path="lists/:listId" element={<List />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

function Navigation() {
  return (
    <Navbar bg="primary" data-bs-theme="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MCS Lists
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="lists">
            Lists
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default App;
