import React, { useRef, useEffect, useState } from 'react';
import Grid from './Grid';
import Game from './Game';

const Portfolio = ({ onGridItemClick }) => {
    const flipContainerRef = useRef(null);
    const nameFlipContainerRef = useRef(null);

    const headerRef = useRef(null);
    const socialLinksRef = useRef(null);
    const nameContainerRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameMode, setIsGameMode] = useState(true);

    const handleGameOver = (gameOver) => {
        setIsGameOver(gameOver);
        setIsGameMode(false); 
    };

    const handlePopupClose = () => {
        setIsGameOver(false);
    };

    const toggleGameMode = () => {
        setIsGameMode(!isGameMode);
    };

    useEffect(() => {
        const checkVisibility = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        };
    
        const observer = new IntersectionObserver(checkVisibility, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        });
    
        // Store current refs in local variables
        const currentHeaderRef = headerRef.current;
        const currentSocialLinksRef = socialLinksRef.current;
        const currentNameContainerRef = nameContainerRef.current;
    
        if (currentHeaderRef) observer.observe(currentHeaderRef);
        if (currentSocialLinksRef) observer.observe(currentSocialLinksRef);
        if (currentNameContainerRef) observer.observe(currentNameContainerRef);
    
        // Define gridItems inside useEffect
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(item => observer.observe(item));
    
        return () => {
            if (currentHeaderRef) observer.unobserve(currentHeaderRef);
            if (currentSocialLinksRef) observer.unobserve(currentSocialLinksRef);
            if (currentNameContainerRef) observer.unobserve(currentNameContainerRef);
            
            // Re-query gridItems for cleanup
            const gridItems = document.querySelectorAll('.grid-item');
            gridItems.forEach(item => observer.unobserve(item));
        };
    }, []);

    const toggleNameFlip = () => {
        if (nameFlipContainerRef.current) {
            nameFlipContainerRef.current.classList.toggle('flip');
        }
    };

    const toggleEmailFlip = () => {
        if (flipContainerRef.current) {
            flipContainerRef.current.classList.toggle('flip');
        }
    };

    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText('annikasanthanam@gmail.com')
            .then(() => {
                alert('Email copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
          <div className="portfolio-container">
            <header className="header" ref={headerRef}>
                <img src="/media/chookisauce.png" alt="Header" className="header-img" />
            </header>

            <div className="social-links" ref={socialLinksRef}>
                <a href="https://www.linkedin.com/in/annikasanthanam/" target="_blank" rel="noopener noreferrer">
                    <img src="/media/Linkedin.png" alt="LinkedIn" />
                </a>
                <a href="https://instagram.com/icantevendothat" target="_blank" rel="noopener noreferrer">
                    <img src="/media/Instagram.png" alt="Instagram" />
                </a>
            </div>

            <div
                className="name-flip-container"
                ref={(el) => {
                    nameFlipContainerRef.current = el;
                    nameContainerRef.current = el;
                }}
                onClick={toggleNameFlip}
            >
                <div className="flipper">
                    <div className="front">
                        <p className="name">ANNIKA SANTHANAM</p>
                    </div>
                    <div className="back">
                        <p>VISUAL MEDIA • CREATIVE TECHNOLOGY • SOUND DESIGN</p>
                    </div>
                </div>
            </div>

            <div className="image-grid-container">
                <Grid onGridItemClick={onGridItemClick} />
            </div>

            <div className="stop"></div>

            <section className="split-section">
                <div className="left-section">
                    <h1>Annika Santhanam is a Brooklyn-based technologist, artist, and designer. She is focused on creating unique and authentic projects that serve her community. Does not like citibikes or eggs. Enjoys working with her hands. Has a collection of collections and wants to collaborate!</h1>
                </div>
                <div className="right-section">
                    <p>
                        <strong>EDUCATION</strong><br />
                        Bachelor of Fine Arts in Film and Television from New York University<br />
                        Master of Arts in Interactive Media Arts from New York University and NYU Shanghai
                    </p>

                    <p>
                        <strong>CLIENTS</strong><br />
                        Mirasa Design<br />
                        EzeeBiz, UAE<br />
                        Terminal 5, NYC<br />
                        Cult Gaia<br />
                        Centro de Bellas Artes, Puerto Rico<br />
                        Fundación Ludwig, Cuba<br />
                        Hannah Jadagu, Sub Pop Records<br />
                        WNYU 89.1 FM<br />
                        Chinatown Youth Initiatives<br />
                        R-YOLO Yoga<br />
                        New York University
                    </p>

                    <p>
                    <strong>FILMOGRAPHY</strong>
                        <br />
                        Sound Mixer, <a href="https://www.instagram.com/mareasaladeriva/" style={{ color: "#82fb74" }}>&quot;Mareas a la Deriva&quot;</a> - Dir. Camila Rodriguez-Lopez, 2024
                        <br />
                        Sound Mixer, <a href="https://www.technoburgermovie.com/" style={{ color: "#82fb74" }}>&quot;Technoburger&quot;</a> - Dir. Andrew Edison, May 2023
                        <br />
                        Sound Mixer, <a href="https://www.imdb.com/title/tt27920538/" style={{ color: "#82fb74" }}>&quot;We Seem to Feel&quot;</a> - Dir. Izzy Perez, 2023
                        <br />
                        Sound Mixer, &quot;Diaspora Sisters&quot; - Dir. Camila Rodriguez-Lopez, 2023
                        <br />
                        Sound Mixer, <a href="https://independentshortsawards.com/2024/07/03/trust-me-bro/" style={{ color: "#82fb74" }}>&quot;Trust Me, Bro&quot;</a> - Dir. Milan Veissi, 2023
                        <br />
                        Sound Mixer, &quot;Te Quiero Mucho&quot; - Dir. Liz Koch, 2023
                        <br />
                        Sound Designer, <a href="https://vimeo.com/867368348" style={{ color: "#82fb74" }}>&quot;In Threes&quot;</a> - Dir. Nico Love, 2023
                        <br />
                        Sound Designer, <a href="https://www.instagram.com/mareasaladeriva/" style={{ color: "#82fb74" }}>&quot;Mareas a la Deriva&quot;</a> - Dir. Camila Rodriguez-Lopez, 2024
                        <br />
                        Dialogue Editor, <a href="https://www.youtube.com/watch?v=9rmyxcL0BDM" style={{ color: "#82fb74" }}>&quot;Acting Human&quot;</a> (TV Pilot) - Dir. J. Roche and A. Tyde G., 2023
                        <br />
                        ADR Engineer, <a href="https://writers.coverfly.com/projects/view/0504a527-eaed-4d02-b66c-568addd6f4f3/Carnitas" style={{ color: "#82fb74" }}>&quot;Carnitas&quot;</a> (TV Pilot) - Dir. Mariana Reider, 2023
                        <br />
                        Sound Designer, <a href="https://www.instagram.com/grandma.play/" style={{ color: "#82fb74" }}>&quot;Grandma&quot;</a> (Stageplay) - Dir. Ananda Long, 2023
                        <br />
                        Sound Designer, &quot;Brothers&quot; (Stageplay) - Dir. Roy Nathanson, 2023
                        <br />
                        Sound Designer, &quot;Heaven&apos;s Gate&quot; - Dir. Jaiden McCrann, 2024
                        <br />
                    </p>
                </div>
            </section>

            <footer className="footer">
                <div className="flip-container" id="flip-container" ref={flipContainerRef}>
                    <div className="flipper" onClick={toggleEmailFlip}>
                        <div className="front" id="front-content">
                            <h1>LET'S TALK</h1>
                        </div>
                        <div id="copyEmail" className="back" onClick={copyEmailToClipboard}>
                            <h1>COPY EMAIL TO CLIPBOARD</h1>
                        </div>
                    </div>
                </div>
                <img src="/media/meii.png" alt="Bottom" className="bottom-image" />
            </footer>

            {isGameOver && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h1 className="popup-header">GAME OVER!</h1>
                        <img src="/media/meii.png" alt="Meii" className="meii-over" />
                        <h3 className="popup-title">What just happened?</h3>
                        <p className="popup-message">
                            Welcome to my hidden game! <br /> Try your best to avoid the tip of the green line. If it touches your cursor, you lose!
                        </p>

                        <p className="popup-message">
                            Click here to turn off Game Mode and browse in peace. <br /> You can always turn it back on at the bottom of the page.
                        </p>
                        <div onClick={handlePopupClose} className="popup-image-container">
                        <img src="/media/off.png" alt="Turn Game Mode Off" className="popup-image" />
                        </div>
                    </div>
                </div>
            )}

            <Game onGameOver={handleGameOver} isGameMode={isGameMode} />

            <p className="copy">
                MADE WITH LOVE AND MY OWN TWO HANDS <br /> 2025 {' '}
            </p>

            <div className="game-mode-toggle" onClick={toggleGameMode}>
                <p>GAME MODE</p>
                <img src={isGameMode ? "/media/on.png" : "/media/off.png"} alt="Game Mode Toggle" className="game-mode-image" />
            </div>

        </div>
 )};

export default Portfolio;