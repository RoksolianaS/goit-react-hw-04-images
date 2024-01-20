import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ onCloseModal, modalData }) => {
  useEffect(() => {
    const onClickESC = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    }; 
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onClickESC);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', onClickESC);
    };
  }, [onCloseModal]);

  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };
  const { largeImageURl, tags } = modalData;
  return (
    <div className={css.Overlay} onClick={handleCloseModal}>
      <div className={css.Modal}>
        <img src={largeImageURl} alt={tags} />
      </div>
    </div>
  );
};