import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import MovieInfo from './MovieInfo/MovieInfo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movie/:id" element={<MovieInfo />} />
    </Routes>
  );
}

export default App;
