import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import {img} from "../Carousel/img/data"
import "react-responsive-Carousel/lib/styles/Carousel.min.css"
import classes from "../Header/Header.module.css"


function CarouselEffect() {
  return (
    <div>
       <Carousel
  autoPlay={true}
  infiniteLoop={true}
  showIndicators={true}
  showThumbs={false}
>

       {
        img.map((imageItemLink) =>{
            return <img key={imageItemLink}src ={imageItemLink}/>
        })
       }
       </Carousel>
       <div className={classes.hero_img}></div>

    </div>
  )
}

export default CarouselEffect
