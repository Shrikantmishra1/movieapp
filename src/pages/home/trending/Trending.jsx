import React, { useState } from 'react'
import './style.scss';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchtabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
const Trending = () => {
  
  const [endpoints,setEndpoint]=useState("day");
  const {data,loading}=useFetch(`/trending/all/${endpoints}`);

   const onTabChange=(tab)=>{
            setEndpoint(tab==="Day"? "day":"week");   
         
   };

  return (

    <div className='carousalSection'>
<ContentWrapper>
       <span className='carousalTitle'>
         Trending
       </span>
       <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>
</ContentWrapper>
   <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending