import { Chip } from "@material-ui/core";
import axios from "axios"
import { useEffect } from "react";
import PropTypes from 'prop-types';


const Genres = ({ selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,}) => {

        const handleAdd = (genre) => {
            setSelectedGenres([...selectedGenres, genre]);
            setGenres(genres.filter((g) => g.id !== genre.id));
            setPage(1);
          };

          const handleRemove = (genre) => {
            setSelectedGenres(
              selectedGenres.filter((selected) => selected.id !== genre.id)
            );
            setGenres([...genres, genre]);
            setPage(1);
          };
        // const handleAdd = (genre) => {
        //     selectedGenres([...selectedGenres, genre]);
        //     setGenres(genres.filter((g) => g.id !== genre.id));
        //     setPage(1)
        // }

        //   const handleRemove = (genre) => {
        //     setSelectedGenres(
        //       selectedGenres.filter((selected) => selected.id !== genre.id)
        //     );
        //     setGenres([...genres, genre]);
        //     setPage(1);
        //   };


        const fetchGenres = async() => {
            const API_KEY = 'f15f6430693b25e68f216435896bfff7';
            const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}`);
            setGenres(data.genres);
        }
        console.log('genres', genres);

        useEffect(() => {
            fetchGenres();
            // eslint-disable-next-line

            return () => {
                setGenres({});
            }
        },[])

  return (
    <>
        <div style={{padding: '6px 0'}}>
        {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}

        {Array.isArray(genres) && genres.map((genre) => (
          <Chip style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)} />
        ))}
        </div>
        {/* <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres && genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div> */}
    </>
  )
}

Genres.propTypes = { // Corrected to "propTypes" (with a lowercase "p")
    selectedGenres: PropTypes.array.isRequired,
    setSelectedGenres: PropTypes.func.isRequired,
    genres: PropTypes.array.isRequired,
    setGenres: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    setPage: PropTypes.func.isRequired,
  };

export default Genres