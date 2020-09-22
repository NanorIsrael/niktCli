import React , { useState } from 'react';
import {Jumbotron} from 'reactstrap';
import Loading from '../LoadingComponent'
import {baseUrl} from '../../shared/baseUrl';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  
} from 'reactstrap';




const Home = (props) =>{
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === props.products.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? props.products.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  
  const slides = props.products.map((item) => {
    return (
   
        <CarouselItem
       
        className="custom-tag"
        tag="div"
        key={item._id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
         <img  className='img d-block img-fluid' src={baseUrl + item.image} alt={item.name}/>
     <CarouselCaption className="text-primary" captionText={item.contact} captionHeader={
   <div>
     <p>{item.label} <em></em></p>
      <p>{(item.price/100).toFixed(2)} <em>Cedis</em></p>
   </div> 
   
        } />
      </CarouselItem>
   )
  })
   

  if(props.isLoading)
    { 
      return (<Loading/>)

    }

    else if(props.errMess)
    {
      return(
        <div className='container'>
    <div className='row'>
        <h4>{props.errMess}</h4>
        </div>
    </div>
        )   
    }

    else{
  return ( 
    
    <div>
      <Jumbotron className='botron'>
                <div className="container ml-0">
                    <div className="row ">
                        <div className="col mt-2 ">
                            <h1> Welcome to Nikt</h1>
                            <div >
                            <h4 >A platform to advertize your products to the world.</h4>
                            </div>
                            <p>Nikt gives you power over your digital marketing.</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <div className='container'>
      <div className='row'>
      <div className='col-12 mb-5'>
      <div>
      
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous} 
        className ='mt-5 '
      >
        <CarouselIndicators  className='corousel-indicators' items={props.products} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>
    
      </div>
     
      </div>
    
    </div>
    </div>
 
  
  )
       }
}
export default Home;