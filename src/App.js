import './App.css';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Home from './components/Home';
import Lists from './components/Lists';
import List from './components/List';
import NotFound from './components/NotFound';
import Error from './components/Error';

// Use React Router 6 to organize and control access to different parts of the
// application.
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="lists" element={<Lists />} />
        <Route path="lists/:listId" element={<List />} />
        <Route path="error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

// Use a Layout element to easily structure the page layouts.  It's not fully
// utilized here, but keeps a spot open for a more advanced layout.
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

// The navbar isn't strictly necessary in this simple app, but it, too, allows
// for more advanced navigation if/when needed.
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
