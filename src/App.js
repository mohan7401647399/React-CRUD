import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import UserView from './components/UserView';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/userView' element={<UserView />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
