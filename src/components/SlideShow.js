import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const SlideShow = ({ photos}) => {
    const images = photos;

    return (
        <Slide>
            {images?.map((row, index) => {
                return (
                    <div key={index} className="each-slide-effect">
                        <div style={{ 'backgroundImage': `url(${row})` }}>
                            
                        </div>
                    </div>
                );
            })}
        </Slide>
    );
};

export default SlideShow;