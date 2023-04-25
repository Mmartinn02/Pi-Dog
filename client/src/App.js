import './App.css';
import { useEffect } from 'react';
import { Route, Switch, BrowserRouter} from "react-router-dom";

import {LandingPage} from './pages/LandingPage'
import {HomePage} from './pages/HomePage'
import {DogDetailsPage} from './pages/DogDetailsPage'
import {CreateDogPage} from './pages/CreateDogPage'

import {Navbar} from './components/Navbar'

import {useDispatch} from 'react-redux';
import { getInitialData } from './Redux/Actions';
import { AboutPage } from './pages/AboutPage';

function App() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getInitialData())
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/'>
            <Navbar />
            <Route exact path='/home' component={HomePage}/>
            <Route exact path='/dogs/:id' component={DogDetailsPage}/>
            <Route exact path='/create' component={CreateDogPage}/>
            <Route exact path='/about' component={AboutPage} />
          </Route> 
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
