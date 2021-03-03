import {useEffect} from 'react'
import './index.css'
import {Switch, Route, Redirect, useHistory} from 'react-router-dom'
import axios from 'axios'

import Navbar from './components/Layout/Navbar'
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'
import Posts from './pages/posts'
import {useAuth} from './contexts/authContext'
import {usePosts} from './contexts/postsContext'
import jwtDecode from 'jwt-decode'

axios.defaults.baseURL = 'https://agile-meadow-81447.herokuapp.com/api/v1'
 
function App() {
  const {auth, handleLogout, setAuth} = useAuth()
  const {getAllPosts} = usePosts()
  const token = localStorage.token;
  const history = useHistory()

  useEffect(() => {
    if(token) {
      const decoded = jwtDecode(token)
  
      if(new Date(decoded.exp * 1000) < new Date()) {
        // !EXPIRED
        handleLogout(history)
      } else {
        axios.defaults.headers.common['Authorization'] = `${token}`;
        setAuth(true)
        getAllPosts()
      }
    }
  }, [token, setAuth, handleLogout])

  let authBar = auth ? (
      <Switch>
        <Route exact path="/" component={Posts}/>
        <Redirect to="/posts"/>
      </Switch>
  ) : 
  (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>
    </Switch>)

  return (
    <>
      <Navbar />
      {authBar}
    </>
  )
}

export default App;
