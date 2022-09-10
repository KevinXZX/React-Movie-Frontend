import MoviePage from './MoviePage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import Movies from './Movies'
import Header from './Header'
import { Route, Routes,useParams} from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router';
import React from "react";
import { useState, useEffect} from 'react'
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
const RouterHolder = () => {
  const [topMovies, setTopMovie] = useState([])
  const [upcomingMovies, setUpcoming] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)
  let { id } = useParams();
  let pathname = useLocation()
  const navigate = useNavigate();
  useEffect(() => {
    fetchPopular()
    fetchUpcoming()
  }, [])
  useEffect(() => {
    let username = getCookie("username");
    if(username!=""){
        let user = {}
        user.email = getCookie("email")
        user.authToken = getCookie("access_token")
        verifyToken(user)
    }else if(loggedInUser!==null){
        setLoggedInUser(null)
        navigate("/")
    }
  },[pathname])
  const fetchPopular = async () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=0cec67fe43f9191296e8cb82c2303e20&language=en-US')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTopMovie(data.results)
      })
  }
  const fetchUpcoming = async () => {
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=0cec67fe43f9191296e8cb82c2303e20&language=en-US')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUpcoming(data.results)
      })
  }
  const verifyToken = async (user) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    fetch('https://flickerx.herokuapp.com/api/v1/user/welcome',requestOptions)
    .then(response => {
      var reply = response.json()
      return reply
    })
    .then(data => {
      if(data.response != "authenticated"){
        setLoggedInUser(null)
        var cookies = document.cookie.split(";");
        //Clear all cookies
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        navigate("/")   
      }
      let userCurrent = {}
      userCurrent.email = getCookie("email")
      userCurrent.id = getCookie("id")
      userCurrent.authToken = getCookie("access_token")
      userCurrent.username = getCookie("username")
      setLoggedInUser(userCurrent)
      return data;
  })
}
    return (
        <div className='container'>
      <Header user={loggedInUser}></Header>
        <Routes>
          <Route
            path='/'
            element={
              <>
              
              <div>
              <Movies movies={topMovies}
              start={0} title={"Popular"}
              />
              </div>
              <div>
              <Movies movies={upcomingMovies}
              start={0} title={"Upcoming"}
              />
              </div>
              </>
            }
          />
          <Route
            path='/movies/:id'
            element={
              <>
              <MoviePage ida={{id}} user={loggedInUser}/>
              </>
            }
            
            // children={<Child />}
          />
          <Route
            path='/login'
            element={
              <>
              <LoginPage/>
              </>
            }
          />
          <Route
            path='/register'
            element={
              <>
              <RegisterPage/>
              </>
            }
          />
        </Routes>
        
      </div>
    )
  }
  
  export default RouterHolder