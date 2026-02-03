import React, { useState, useCallback, useEffect } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Button } from './components/Button/Button';
import { Loader } from './components/Loader/Loader';
import { Modal } from './components/Modal/Modal';
import './App.css';

const PER_PAGE = 12;
const API_KEY = '51401289-2bd7732f7134c90fec2a6586b';

function App() {
  const [query, setQuery] = useState('cat');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  const fetchImages = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      );
      const data = await response.json();
      setImages(prev => (page === 1 ? data.hits : [...prev, ...data.hits]));
      setTotalHits(data.totalHits);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSearch = useCallback(newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  }, []);

  const handleLoadMore = () => setPage(prev => prev + 1);
  const openModal = url => setLargeImageURL(url);
  const closeModal = () => setLargeImageURL(null);

  const noMoreImages = images.length >= totalHits;

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />
      {images.length === 0 && !loading && <p className="no-results">No results found</p>}
      <ImageGallery images={images} onClick={openModal} />
      {loading && <Loader />}
      {!noMoreImages && images.length > 0 && !loading && <Button onClick={handleLoadMore} />}
      {noMoreImages && images.length > 0 && <p className="no-more">No more images</p>}
      {largeImageURL && <Modal largeImageURL={largeImageURL} onClose={closeModal} />}
    </div>
  );
}

export default App;
