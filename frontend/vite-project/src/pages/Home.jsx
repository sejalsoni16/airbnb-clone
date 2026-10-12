import { listingDataContext } from '../Context/ListingContext.jsx';
import Nav from '../Component/Nav';
import React, { useContext } from 'react'
import Card from '../Component/Card.jsx';

function Home() {
  let {listingData,setListingData}=useContext(listingDataContext)
  return (
    <div>
      <Nav/>
      <div className='w-[100vw] h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px]'>
    {listingData.map((list)=>(
      <Card title={list.title} landMark={list.landMark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} id={list._id}/>  
    ))}
      </div>
    </div>
  )
}

export default Home;