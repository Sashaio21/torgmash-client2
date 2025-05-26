import './App.css';
import './styles/global.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserMe } from './redux/slices/userSlices';
import { Button } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import ApplicationPage from './pages/ApplicationPage';
import Auth from './pages/UsersPage/Auth'
import MainEmployee from './pages/Employee/MainEmployee'
import SendApplication from './pages/Employee/SendApplication'
import MainProgrammer from './pages/Programmer/MainProgrammer'
import Task from './pages/Programmer/Task'
import AddTask from './pages/SeniorDeveloper/AddTask';
import MainDeveloper from './pages/SeniorDeveloper/MainDeveloper'
import Header from './components/Header';
import SeniorApplication from './pages/SeniorDeveloper/SeniorApplication';
import CreateNewFunction from './pages/SeniorDeveloper/CreateNewFunction';
import Redirection from './pages/Redirection';
import ApplicationPageDeveloper from './pages/SeniorDeveloper/ApplicationPageDeveloper';
import Register from './pages/UsersPage/Register';
import HR from './pages/UsersPage/HR';

function App() { 
  const { user, status, error } = useSelector((state) => state.user);
  const dispatchAuthMe = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if (!localStorage.getItem("token")){
      navigate('/auth')
    }
    dispatchAuthMe(fetchUserMe()); // Теперь можно загружать данные о пользователе
    console.log("app ", user)
  }, [])

  const test = () => {
    console.log(user)
  }

 
 return (
    <div style={{display:"flex", flexDirection:"column", gap: "30px"}}>
        <Header/>
        {/* <Button onClick={()=>test()}>test</Button> */}
        <div className='container' >
          <Routes>
              <Route path='/' element={<Redirection/>}></Route>
              <Route path='/auth' element={<Auth/>}/>
              <Route path='/employee' element={<MainEmployee/>}/>
              <Route path='/send/application' element={<SendApplication/>}/>
              <Route path='/application/page/:idApplication' element={<ApplicationPage/>}/>
              <Route path='/programmer' element={<MainProgrammer/>}/>
              <Route path='/task/:idTask' element={<Task/>}/>
              <Route path='/add/task' element={<AddTask/>}/>
              <Route path='/developer' element={<MainDeveloper/>}/>
              <Route path='/application/page/senior/:idApplication' element={<SeniorApplication/>}/>
              <Route path='/application/create' element={<CreateNewFunction/>}/>
              <Route path='/user/register' element={<HR/>}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;