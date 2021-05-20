import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost'
import MyPhoto from './pages/MyPhoto';
import FavouritePage from './pages/FavouritePage'
import withProtected from './components/withProtected'
function App() {
  return (
    <div className="App"> 
      <Navbar />
      <div className='content'>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/createpost" component={withProtected(CreatePost)}/>
          <Route exact path="/myphoto" component={withProtected(MyPhoto)}/>
          <Route exact path="/myfav" component={withProtected(FavouritePage)}/>
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
