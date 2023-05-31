import './App.css';
import { useState, useRef, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './Components/SearchBar'
import Gallery from './Components/Gallery'
import { DataContext } from './Context/DataContext'
import { SearchContext } from './Context/SearchContext'
import AlbumView from './Components/AlbumView'
import ArtistView from './Components/ArtistView';

function App() {
  let [data, setData] = useState([])
  let [message, setMessage] = useState("Search for music!")
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  const handleSearch = (e, term) => {
    e.preventDefault()
    document.title = `${term} Music`
    fetch(API_URL + term)
    .then(res => res.json())
    .then(resData => {
      if (resData.results.length > 0) {
        setData(resData.results)
      } else {
        setMessage("No results found!")
      }
    }).catch(err => console.log(err))
  }

  return (
    <div className="App">
 
      {message}
      <Router>
        <Routes>
          <Route path='/'element={
            <Fragment>
                    <SearchContext.Provider value={{
        term: searchInput,
        handleSearch: handleSearch
      }}>
        <SearchBar />
      </SearchContext.Provider>
      </Fragment>
          }>

          </Route>
          <Route path='/album/:id' element={<AlbumView/>} />
          <Route path='/artist/:id' element={<ArtistView />} />
      {/* <DataContext.Provider value={data}> */}
        {/* <Gallery />
        <AlbumView/>
        <ArtistView/> */}
      {/* </DataContext.Provider> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
