import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const Grid = () => {
    const [gridData, setGridData] = useState([]);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        fetch('/gridData.json')
            .then((response) => response.json())
            .then((data) => {
                setGridData(data);
            })
            .catch((error) => console.error('Error fetching grid data:', error));
    }, []);

    const handleGridItemClick = (item) => {
        setModalContent(item);
    };

    const handleCloseModal = () => {
        setTimeout(() => {
            setModalContent(null);
        }, 350); // Match the duration of your CSS transition
    };


    return (
        <section className="image-grid">
            {gridData.map((item, index) => {
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
                            style={{ backgroundImage: imageSource ? `url(${imageSource})` : null }}
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