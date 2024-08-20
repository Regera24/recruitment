import './App.css';
import { Routes, Route} from 'react-router-dom';
import DLayout from './Components/Layout';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Protected from './Pages/Protected';
import JobManage from './Pages/JobManage';
import User from './Pages/User';
import DCompany from './Pages/DetailCompany';
import Search from './Pages/Search';
import Job from './Pages/DetailJob';
function App() {
  return (
      <Routes>
        <Route path='/' element={<DLayout/>}>
          <Route index element={<Home/>}></Route>
          <Route path='/dashboard' element={<Protected><Dashboard/></Protected>}></Route>
          <Route path='/managejobs' element={<Protected><JobManage/></Protected>}></Route>
          <Route path='/user' element={<Protected><User/></Protected>}></Route>
          <Route path='/company/:id' element={<DCompany/>}></Route>
          <Route path='/job/:jid' element={<Job/>}></Route>
          <Route path='/search/:keyword' element={<Search/>}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
  );
}

export default App;
