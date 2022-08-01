import { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.css';
import { BrowserRouter as Router, Route, Routes,useParams} from 'react-router-dom'
import Movies from './components/Movies'
import React from "react";
import MoviePage from './components/MoviePage'



const App = () => {
  const [topMovies, setTopMovie] = useState([])
  const [upcomingMovies, setUpcoming] = useState([])
  let { id } = useParams();
  useEffect(() => {
    fetchPopular()
    fetchUpcoming()
  }, [])
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

  return (
    <Router>
      <div className='container'>
      <Header></Header>
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
              <MoviePage ida={{id}}/>
              </>
            }
            
            // children={<Child />}
          />
        </Routes>
        
      </div>
    </Router>
  )
  
}

export default App