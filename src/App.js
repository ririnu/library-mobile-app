import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import About from './components/About';
import UserList from './UserList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">📚 Library App</Link>
        <div className="navbar-nav" style={{display:'flex', flexDirection:'row', gap:'20px'}}>
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/registration">Register</Link>
          <Link className="nav-link" to="/users">Users</Link>
          <Link className="nav-link" to="/about">About</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
