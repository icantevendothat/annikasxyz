import React, { useState } from 'react';
import Modal from './Modal';
import gridData from '../../../gridData.json';

const Grid = () => {
    const [localGridData] = useState(gridData);
    const [modalContent, setModalContent] = useState(null);

    const handleGridItemClick = (item) => {
        setModalContent(item);
    };

    const handleCloseModal = () => {
        setTimeout(() => {
            setModalContent(null);
        }, 350);
    };

    return (
        <section className="image-grid">
            {localGridData.map((item, index) => {
                if (item.empty) {
                    return <div key={index} className="grid-item"></div>;
                } else {
                    let imageSource = null;

                    if (item.carousel && item.images && item.images.length > 0) {
                        imageSource = item.images[0]; 
                    } else if (item.image) {
                        imageSource = item.image;
                    }

                    return (
                        <div
                            key={index}
                            className="grid-item modal-trigger"
                            style={{ 
                                backgroundImage: imageSource ? `url(${imageSource})` : 'none',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center'
                            }}
                            onClick={() => handleGridItemClick(item)}
                        ></div>
                    );
                }
            })}
            <Modal content={modalContent} closeModal={handleCloseModal} />
        </section>
    );
};

export default Grid;