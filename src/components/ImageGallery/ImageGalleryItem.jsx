import React from 'react';

export const ImageGalleryItem = ({ image, onClick }) => {
    return (
        <li className="gallery-item" onClick={() => onClick(image.largeImageURL)}>
            <img src={image.webformatURL} alt="" />
        </li>
    );
};
