import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Camareros from './views/Camareros';
import Usuarios from './views/Usuarios';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      
      <Header />
      <main>
        <Routes>
          <Route path="/camareros" element={<Camareros />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </main>
      <footer></footer>
    </Router>
  );
}

export default App;