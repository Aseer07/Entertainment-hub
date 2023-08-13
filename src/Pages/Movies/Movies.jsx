import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";
import CustomPagination from "../../Pagination/CustomPagination";
import Genres from "../../components/Genres/Genres";

const Movies = () => {
    
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const genreforURL = useGenre(selectedGenres);
    console.log('gen', genres)
    console.log('movie content', content)


    const fetchMovies = async() => {
        
        //const page = 1;
        const API_KEY = 'f15f6430693b25e68f216435896bfff7';
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${genreforURL}`);
        console.log('movie data', data);
        setContent(data.results);
        setNumOfPages(data.total_pages);
      }

      useEffect(() => {
        fetchMovies();
         // eslint-disable-next-lines
      },[page, genreforURL])
  return (
    <div>
        <span className="pageTitle">Discover Movies</span>
        <Genres type='movie' selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} setPage={setPage} />
        <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
          {numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages} />)}
          
        </div>
    </div>
  )
}

export default Movies