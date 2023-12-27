import  {useState ,useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {fetchDataFromApi} from "./utils/api";
import {getApiConfiguration,getGenres} from "./store/homeSlice";
import {BrowserRouter,Routes ,Route} from "react-router-dom"
import Header from "./components/header/Header";  
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import pageNotFound from "./pages/404/pageNotFound";
function App() {
  const dispatch=useDispatch();
  const {url} = useSelector((state)=>state.home);
  useEffect(()=>{
    genresCall();
    
    fetchApiConfig();
  },[]);
    
  const fetchApiConfig=()=>{
    fetchDataFromApi('/configuration').then((res)=>{
           console.log(res);
           
           const url={
                 backdrop:res.images.secure_base_url + "original",
                 poster:res.images.secure_base_url + "original",

                 profile:res.images.secure_base_url + "original",


           }
           dispatch(getApiConfiguration(url));
       })
  }
  const genresCall=async()=>{
        let promises=[]
        let endPoints=["tv","movie"];
        let AllGenres={}
        endPoints.forEach((url)=>{
          promises.push(fetchDataFromApi(`/genre/${url}/list`))
        })
        const data=await Promise.all(promises);
           data.map(({genres})=>{
               return genres.map((item)=>(AllGenres[item.id]=item))
           })
          // console.log(AllGenres);
          dispatch(getGenres(AllGenres));
  }
  return(
       <BrowserRouter>
       <Header/>
        <Routes>
          <Route  path ="/" element={<Home/>}/>
          <Route path ="/:mediaType/:id" element={<Details/>}/>
          <Route path ="/search/:query" element={<SearchResult/>}/>
          <Route path ="/explore/:mediaType" element={<Explore/>}/>
          <Route path="*" element={<pageNotFound/>}/>
        </Routes>
        <Footer/>
       </BrowserRouter>
  );
 
}

export default App;
