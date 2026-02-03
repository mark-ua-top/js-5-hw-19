import React from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => {
    return (
        <ul className="gallery">
            {images.map(img => (
                <ImageGalleryItem key={img.id} image={img} onClick={onClick} />
            ))}
        </ul>
    );
};
