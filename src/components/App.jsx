import css from './Styles.module.css';
import { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Serchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchData } from './servises/api';

// export class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     error: null,
//     isLoadMore: false,
//     isOpenModal: false,
//     modalData: [],
//     page: 1,
//     isEmpty: false,
//     isLoading: false,
//   };

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoadMore, setLoadMore] = useState(false);
  const [isOpenModal, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

   useEffect(() => {
    if (query === '') {
      return;
    }
    const addImages = async () => {
      try {
        const { hits, totalHits } = await fetchData(query, page);
        setImages(prevState => [...prevState, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    addImages();
    
  }, [page, query]);
 

  // async componentDidUpdate(_, prevState) {
  //   const { page, query } = this.state;
  //   if (page !== prevState.page || prevState.query !== query) {
  //     try {
  //       const { hits, totalHits } = await fetchData(query, page);
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...hits],
  //         isLoadMore: this.state.page < Math.ceil(totalHits / 12),
  //       }));
  //     } catch (error) {
  //       this.setState({ error: error.message });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  const handleSubmit = searchQuery => {
    if (query === searchQuery) {
      return;
    }
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleOpenModal = (largeImageURl, tags) => {
    setModalData({ largeImageURl, tags });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery
        images={images}
        onImageClick={handleOpenModal}
      />
      {isLoading && <Loader />}
      {isOpenModal && (
        <Modal
          isOpenModal={isOpenModal}
          onCloseModal={handleCloseModal}
          modalData={modalData}
        />
      )}

      {isLoadMore && <Button handleLoadMore={handleLoadMore} />}
    </div>
  );
};
