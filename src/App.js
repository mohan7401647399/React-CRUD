import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import UserView from './components/UserView';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/userView' element={<UserView />} />
      </Routes>
    </div>
  );
}

export default App;
