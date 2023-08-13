//import React from 'react'

import axios from "axios"
import { useEffect, useState } from "react"
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";
import CustomPagination from "../../Pagination/CustomPagination";


const Trending = () => {
  const[page, setPage] = useState(1)
  const[content, setContent] = useState([])
  console.log('content trending', content)

  const fetchTrending = async() => {
    //const page = 1;
    const API_KEY = 'f15f6430693b25e68f216435896bfff7';
    //const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`)
    console.log('datassss', data);
    setContent(data.results)
  }

  useEffect(() => {
    fetchTrending();
  },[page])
  return (
    <div>
      <span className="pageTitle">Trending Today</span>
      <div className="trending">
        {
          content && content.map((c) => (
            <SingleContent key={c.id}  id={c.id} poster={c.backdrop_path
} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={c.media_type} vote_average={c.vote_average} />
          ))
        }
      </div>
      <CustomPagination setPage ={setPage} />
    </div>
  )
}

export default Trending