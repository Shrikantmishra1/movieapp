import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import  {useSelector} from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyloadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
const HeroBanner = () => {
  const {data,loading}=useFetch("/movie/upcoming");
  const [background,setbackground]=useState("");
  const [query,setQuery]=useState("");
  const navigate=useNavigate();
  const {url} =useSelector((state)=>state.home);
  const searchQueryHandler=(event)=>{
         if(event.key==="Enter" && query.length>0){
              navigate(`/search/${query}`);
         }
  }
  useEffect(()=>{
        const bg= url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
     setbackground(bg);
  
      },[data]);
    return (
    <div className='heroBanner'>

       {!loading &&<div className='backdrop-img'>  
             <Img src={background}/>
            
          </div>}
          <div className='opacity-layer'>

          </div>
          <ContentWrapper>
        
             <div className='heroBannerContent'>
                <span className="title">Welcome</span>
                <span className=' subTitile'>Millions of movies,TV shows and people to discover. 
                Explore now. </span>
                <div className='searchInput'>
                     <input type='text' 
                     onKeyUp={searchQueryHandler}
                     onChange={(e)=>setQuery(e.target.value)}
                      placeholder=' Search fora movie or tv show....'/>
                    <button>Search</button>
                </div>
               </div>
       
         </ContentWrapper>
    </div>
  )
}

export default HeroBanner