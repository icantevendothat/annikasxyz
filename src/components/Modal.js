import React, { useState, useEffect, useRef } from 'react';
import './../styles/Modal.css';

const Modal = ({ content, closeModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [content]);

  useEffect(() => {
    if (modalRef.current && contentRef.current) {
      if (content) {
        modalRef.current.classList.add('open');
        contentRef.current.classList.add('modal-content-transition');

        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.classList.add('modal-content-animate');
          }
        }, 50);
      } else {
        modalRef.current.classList.remove('open');
        contentRef.current.classList.remove('modal-content-transition');
        contentRef.current.classList.remove('modal-content-animate');
      }
    }
  }, [content]);
  
  const handleCloseModal = () => {
    if (modalRef.current && contentRef.current) {
      contentRef.current.classList.add('modal-content-slide-down');
      modalRef.current.style.opacity = '1';

      setTimeout(() => {
        closeModal();
      }, 300); // Match the transition duration
    }
  };

  const handleOverlayClick = (e) => {
    const isOnImage = imageRef.current && imageRef.current.contains(e.target);
    const isOnText = textRef.current && textRef.current.contains(e.target);
    const isOnPrevButton = prevButtonRef.current && prevButtonRef.current.contains(e.target);
    const isOnNextButton = nextButtonRef.current && nextButtonRef.current.contains(e.target);

    if (!(isOnImage || isOnText || isOnPrevButton || isOnNextButton)) {
      handleCloseModal();
    }
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === content.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? content.images.length - 1 : prevIndex - 1
    );
  };

  if (!content) { // Only render if content is not null
    return null;
  }

  return (
    <div 
      ref={modalRef}
      className="modal"
      onClick={handleOverlayClick}
    >
      <div 
        ref={contentRef}
        className="modal-content"
      >
        <div className="modal-right">
          <div 
            ref={textRef}
            className="text-content" 
            dangerouslySetInnerHTML={{ __html: content.text }} 
          />
        </div>
        <div className="modal-left">
          {content.carousel && content.images && content.images.length > 0 ? (
            <div className="carousel-container">
              {content.images.map((image, index) => (
                <div
                  ref={index === currentImageIndex ? imageRef : null}
                  className={`carousel-slide ${
                    index === currentImageIndex ? 'active' : ''
                  }`}
                  key={index}
                >
                  <img src={image} alt={`Slide ${index + 1}`} />
                </div>
              ))}
              {content.images.length > 1 && (
                <>
                  <button 
                    ref={prevButtonRef}
                    className="prev" 
                    onClick={goToPrevSlide}
                  >
                    <img src="/media/left.webp" alt="Previous" />
                  </button>
                  <button 
                    ref={nextButtonRef}
                    className="next" 
                    onClick={goToNextSlide}
                  >
                    <img src="/media/right.webp" alt="Next" />
                  </button>
                </>
              )}
            </div>
          ) : (
            content.image && (
              <img 
                ref={imageRef}
                id="modalImg" 
                src={content.image} 
                alt="Modal" 
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;