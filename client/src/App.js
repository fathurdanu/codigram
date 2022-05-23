import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Switch } from 'react-router-dom';
import { LoginPage, SignupPage } from './pages';
import { Navigation, Content, Search, AddPost, Account, PostDetails, AccountInfo, UpdatePost } from './components';


function App() {


  return (
    <div className="bg-mid-color">

      <Routes>
        <Route path="/" element={<><Navigation /><Content></Content></>}></Route>
        <Route path="search" element={<><Navigation /><Search /></>}></Route>
        <Route path="add" element={<><Navigation /><AddPost /></>}></Route>
        <Route path="account">
          <Route path="" element={<><Navigation /><Account /></>}></Route>
          <Route path=":id" element={<><Navigation /><AccountInfo /></>}></Route>
        </Route>
        <Route path="posts">
          <Route path=":id" element={<><Navigation /><PostDetails /></>}></Route>
          <Route path="edit">
            <Route path=":id" element={<><Navigation /><UpdatePost /></>}></Route>
          </Route>
        </Route>
        <Route path="login" element={<LoginPage></LoginPage>}> </Route>
        <Route path="register" element={<SignupPage></SignupPage>}> </Route>
      </Routes>
    </div>
  );
}

export default App;
