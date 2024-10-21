import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import {
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon,
    TwitterIcon,
} from 'react-share';

const NewsApp = () => {
    const [article, setArticles] = useState([]);
    const [bookmarked, setBookmarked] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("sport");
    const [searchInput, setSearchInput] = useState("");
    const [totalResults, setTotalResults] = useState(0);
    const [view, setView] = useState("news"); 

    const fetchNews = async (page, q) => {
        console.log(`Fetching news for ${q}, page number ${page}....`);
        const url = `https://newsapi.org/v2/everything?q=${q}&from=2024-10-19&pageSize=20&language=en&page=${page}&sortBy=popularity&apiKey=${process.env.REACT_APP_SECRET_KEY}`;

        const req = new Request(url);
        const response = await fetch(req);
        const data = await response.json();

        setArticles(data.articles || []); 
        setTotalResults(data.totalResults || 0);
    };

    useEffect(() => {
        if (view === "news") {
            fetchNews(currentPage, selectedCategory);
        }
    }, [currentPage, selectedCategory, view]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSelectedCategory(searchInput);
        setCurrentPage(1);
    };

    const handlePrev = (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        setCurrentPage(currentPage + 1);
    };

    const toggleBookmark = (article) => {
        const isBookmarked = bookmarked.some(item => item.url === article.url);
        if (isBookmarked) {
            setBookmarked(bookmarked.filter(item => item.url !== article.url));
        } else {
            setBookmarked([...bookmarked, article]);
        }
    };

    const isBookmarked = (url) => {
        return bookmarked.some(item => item.url === url);
    };

    const handleViewChange = (view) => {
        setView(view);
        setCurrentPage(1);
    };

    return (
        <div className="container">
            <h1>News App</h1>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={`nav-link ${view === "news" ? "active" : ""}`} onClick={() => handleViewChange("news")} href="#">News Feed</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${view === "bookmarked" ? "active" : ""}`} onClick={() => handleViewChange("bookmarked")} href="#">Bookmarked News</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {view === "news" ? (
                <>
                    <p>Total Results: {totalResults}</p>
                    <form onSubmit={handleSearch}>
                        <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search for news" className="form-control my-3"/>
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>

                    <div className="d-flex justify-content-between my-3">
                        <button onClick={handlePrev} className="btn btn-secondary">Previous</button>
                        <button onClick={handleNext} className="btn btn-secondary">Next</button>
                    </div>

                    <div className="content row">
                        {Array.isArray(article) && article.map((item, index) => (
                            <div key={index} className="card my-4 mx-2" style={{ width: '18rem', position: 'relative' }}>
                                <img height="184" src={item.urlToImage} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title.slice(0, 23)}</h5>
                                    <p className="card-text">{item.description.slice(0, 60)}...</p>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read Article</a>
                                    <div className="share-buttons my-2">
                                        <FacebookShareButton url={item.url} className="share-button">
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        <LinkedinShareButton url={item.url} className="share-button">
                                            <LinkedinIcon size={32} round />
                                        </LinkedinShareButton>
                                        <WhatsappShareButton url={item.url} className="share-button">
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                        <TwitterShareButton url={item.url} className="share-button">
                                            <TwitterIcon size={32} round />
                                        </TwitterShareButton>
                                    </div>
                                    <div className="bookmark-icon" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                        {isBookmarked(item.url) ? (
                                            <FaStar onClick={() => toggleBookmark(item)} size={24} color="gold" />
                                        ) : (
                                            <FaRegStar onClick={() => toggleBookmark(item)} size={24} color="red" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : view === "bookmarked" ? (
                <div className="content row">
                    {bookmarked.length === 0 ? (
                        <p>No bookmarked articles yet.</p>
                    ) : (
                        bookmarked.map((item, index) => (
                            <div key={index} className="card my-4 mx-2" style={{ width: '18rem', position: 'relative' }}>
                                <img height="184" src={item.urlToImage} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title.slice(0, 23)}</h5>
                                    <p className="card-text">{item.description.slice(0, 60)}...</p>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read Article</a>
                                    <div className="share-buttons my-2">
                                        <FacebookShareButton url={item.url} className="share-button">
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        <LinkedinShareButton url={item.url} className="share-button">
                                            <LinkedinIcon size={32} round />
                                        </LinkedinShareButton>
                                        <WhatsappShareButton url={item.url} className="share-button">
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                        <TwitterShareButton url={item.url} className="share-button">
                                            <TwitterIcon size={32} round />
                                        </TwitterShareButton>
                                    </div>
                                    <div className="bookmark-icon" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                        <FaStar size={24} color="gold" />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default NewsApp;
