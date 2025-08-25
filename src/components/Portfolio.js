import React, { useRef, useEffect, useState } from 'react';
import Grid from './Grid';
import Game from './Game';

const Portfolio = ({ onGridItemClick }) => {
    const flipContainerRef = useRef(null);
    const socialLinksRef = useRef(null);
    const imageGridContainerRef = useRef(null);
    const sentinelRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameMode, setIsGameMode] = useState(true);
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);
    const lastScrollY = useRef(0);

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
        // observer for `.show` class on elements
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

        // header observer
        const headerObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const currentScrollY = window.scrollY;
                    const isScrollingDown = currentScrollY > lastScrollY.current;

                    if (entry.isIntersecting) {
                        setIsHeaderFixed(false);
                    } else {
                        if (!isScrollingDown) {
                            setIsHeaderFixed(true);
                        } else {
                            setIsHeaderFixed(false);
                        }
                    }
                    lastScrollY.current = currentScrollY;
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0,
            }
        );

        const currentSocialLinksRef = socialLinksRef.current;
        const currentSentinelRef = sentinelRef.current;

        if (currentSocialLinksRef) observer.observe(currentSocialLinksRef);
        if (currentSentinelRef) {
            headerObserver.observe(currentSentinelRef);
        }

        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(item => observer.observe(item));

        const elementsToObserve = document.querySelectorAll('.split-section, .footer, .copy, .game-mode-toggle');
        elementsToObserve.forEach(item => observer.observe(item));

        return () => {
            if (currentSocialLinksRef) observer.unobserve(currentSocialLinksRef);
            if (currentSentinelRef) {
                headerObserver.unobserve(currentSentinelRef);
            }
            gridItems.forEach(item => observer.unobserve(item));
            elementsToObserve.forEach(item => observer.unobserve(item));
        };
    }, []);

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
            <div class="tagline">
                <a href="https://www.artrabbit.com/events/mutable-molds-the-clive-davis-institute-of-recorded-music-tisch-school-of-the-arts" style={{ color: '#FFFFFF' }} target="_blank" rel="noopener noreferrer">
                    check this out
                </a>
                <p>art, design, technology, misbehavior, etc.</p>
            </div>
            <div className="image-grid-container" ref={imageGridContainerRef}>
                <header className={isHeaderFixed ? "header fixed" : "header contained"}>
                    <img src="/media/chookisauce.png" alt="Header" className="header-img" />
                </header>
                <Grid onGridItemClick={onGridItemClick} />
                <div ref={sentinelRef} className="header-sentinel"></div>
            </div>

            <div className="stop"></div>

            <section className="split-section">
                <div className="left-section">
                    <h1>Annika Santhanam is a Brooklyn-based technologist, producer, and designer. She is focused on creating unique and authentic projects that serve her community. Does not like citibikes or eggs. Enjoys working with her hands. Has a collection of collections and wants to collaborate!</h1>
                </div>
                <div className="social-links" ref={socialLinksRef}>
                    <a href="https://www.linkedin.com/in/annikasanthanam/" style={{ color: '#FFFFFF' }} target="_blank" rel="noopener noreferrer">
                        linkedin
                    </a>
                    <a href="https://instagram.com/icantevendothat" style={{ color: '#FFFFFF' }} target="_blank" rel="noopener noreferrer">
                        instagram
                    </a>
                </div>
                <div className="right-section">
                    <p>
                        <strong>EDUCATION</strong><br />
                        Bachelor of Fine Arts in Film and Television from New York University<br />
                        Master of Arts in Interactive Media Arts from New York University and NYU Shanghai
                    </p>
                    <p>
                        <strong>CLIENTS</strong><br />
                        The Downtown Festival<br />
                        Sonic Liberation Devices<br />
                        Sub Pop Records<br />
                        Montana Cans<br />
                        City Limits<br />
                        LUmkA Gallery<br />
                        HOPE_16<br />
                        EzeeBiz, UAE<br />
                        Terminal 5<br />
                        Cult Gaia<br />
                        Centro de Bellas Artes, Puerto Rico<br />
                        FundaciÃ³n Ludwig, Cuba<br />
                        WNYU 89.1 FM<br />
                        Chinatown Youth Initiatives<br />
                        R-YOLO Yoga<br />
                    </p>
                    <p>
                        <strong>GRANTS & HONORARIUMS</strong><br />
                        <a href="https://error417.expectation.fail/406/tech-fascism-not-acceptable" style={{ color: '#82fb74' }}>Error 406: Tech Fascism Not Acceptable</a>, 2025<br />
                        <a href="https://thenetgala.com/artists" style={{ color: '#82fb74' }}>The Net Gala</a>, 2025<br />
                        <a href="https://pixelmouth.org/coc-salivation-1" style={{ color: '#82fb74' }}>Pixelmouth: Cult of Consumption</a>, 2025<br />
                    </p>
                    <p>
                        <strong>FILMOGRAPHY</strong><br />
                        Sound Designer, "Being Seen Makes Us Happy" - Dir. C. Levin and A. Newman, 2025<br />
                        Sound Designer, "we're thinking the same thing" - Dir. Irmak Akgur, 2025<br />
                        Sound Designer, "Heaven's Gate" - Dir. Jaiden McCrann, 2024<br />
                        Sound Designer, <a href="https://www.instagram.com/mareasaladeriva/" style={{ color: '#82fb74' }}>"Mareas a la Deriva"</a> - Dir. Camila Rodriguez-Lopez, 2024<br />
                        Sound Mixer, <a href="https://www.instagram.com/mareasaladeriva/" style={{ color: '#82fb74' }}>"Mareas a la Deriva"</a> - Dir. Camila Rodriguez-Lopez, 2024<br />
                        Sound Mixer, <a href="https://www.technoburgermovie.com/" style={{ color: '#82fb74' }}>"Technoburger"</a> - Dir. Andrew Edison, May 2023<br />
                        Sound Mixer, <a href="https://www.imdb.com/title/tt27920538/" style={{ color: '#82fb74' }}>"We Seem to Feel"</a> - Dir. Izzy Perez, 2023<br />
                        Sound Designer, <a href="https://vimeo.com/867368348" style={{ color: '#82fb74' }}>"In Threes"</a> - Dir. Nico Love, 2023<br />
                        Dialogue Editor, <a href="https://www.youtube.com/watch?v=9rmyxcL0BDM" style={{ color: '#82fb74' }}>"Acting Human"</a> (TV Pilot) - Dir. J. Roche and A. Tyde G., 2023<br />
                        ADR Engineer, <a href="https://writers.coverfly.com/projects/view/0504a527-eaed-4d02-b66c-568addd6f4f3/Carnitas" style={{ color: '#82fb74' }}>"Carnitas"</a> (TV Pilot) - Dir. Mariana Reider, 2023<br />
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
    );
};

export default Portfolio;