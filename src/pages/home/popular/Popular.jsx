import React, { useState } from 'react'
import './style.scss';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchtabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
const Popular = () => {
  
  const [endpoints,setEndpoint]=useState("movie");
  const {data,loading}=useFetch(`/${endpoints}/popular`);

   const onTabChange=(tab)=>{
            setEndpoint(tab==="Movies"? "movie":"tv");   
         
   };

  return (

    <div className='carousalSection'>
<ContentWrapper>
       <span className='carousalTitle'>
         What's Popular
       </span>
       <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
</ContentWrapper>
   <Carousel data={data?.results} loading={loading} endpoint={endpoints}/>
    </div>
  )
}

export default Popular