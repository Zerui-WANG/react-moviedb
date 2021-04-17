import React, {useState, useEffect} from 'react';
import { 
    fetchGenre, 
    fetchMovieByGenre, 
    fetchMovies, 
    fetchPersons, 
    fetchTopRatedMovie
} from '../../service';
import './../../public/assets/styles/home.css'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'
import RBCarousel from 'react-bootstrap-carousel';
import { Link } from 'react-router-dom';
import { FaPlay, FaArrowCircleRight } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';
import { SiLinkedin, SiFacebook } from 'react-icons/si';

export function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);
    const [persons, setPersons] = useState([]);
    const [topRated, setTopRated] = useState([]);

    useEffect(() => {
        const fectchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre(28));
            setPersons(await fetchPersons());
            setTopRated(await fetchTopRatedMovie());
        };

        fectchAPI();
    }, []);

    const movies = nowPlaying.slice(0, 5).map((item, index) => {
        return (
            <div class="header-slides" key={index}>
                <div className="carousel-center">
                    <img class="header-slides-img" src={item.backPoster} alt={item.title} />
                </div>
                <div className="carousel-center">
                    <i class="faplay"><FaPlay/></i>
                </div>
                <div className="carousel-caption" class="header-slides-title">{item.title}</div>
            </div>
        );
    })

    const genreList = genres.map((item, index) => {
        return (
            <li className="list-inline-item" key={index}>
                <button type="button" className="btn btn-outline-info">
                    {item.name}
                </button>
            </li>
        );
    })

    const movieList = movieByGenre.slice(0, 4).map((item, index) => {
        return (
            <div className="col-md-3 col-sm-6" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title}/>
                        
                    </Link>
                </div>
                <div className="mt-3">
                    <p class="movieList-title">{item.title}</p>
                    <p>Notée : {item.rating}</p>
                </div>
            </div>
        );
    });

    const trendingPersons = persons.slice(0, 4).map((p, i) => {
        return (
            <div className="col-md-3 col-sm-6 text-center" key={i}>
                <img
                    className="img-fluid rounded-circle mx-auto d-block"
                    src={p.profileImg}
                    alt={p.name}
                />
                <p className="font-weight-bold text-center">{p.name}</p>
                <p className="font-weight-light text-center">{p.known}</p>
            </div>
        );
    });

    const topRatedList = topRated.slice(0, 4).map((item, index) => {
        return (
            <div className="col-md-3 text-center" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid" src={item.poster} alt={item.title}/>
                    </Link>
                </div>
                <div className="mt-3">
                    <p class="movieList-title">{item.title}</p>
                    <p>Notée : {item.rating}</p>
                </div>
            </div>
        );
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slideShowSpeed={5000}
                        version={4}
                        indicator={false}
                    >
                        {movies}
                    </RBCarousel>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <FaArrowCircleRight class="arrow_circle"/>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{movieList}</div>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold text-center">
                        PERSONALITE DE LA SEMAINE
                    </p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <FaArrowCircleRight class="arrow_circle"/>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{trendingPersons}</div>

            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold text-center">
                        LES MIEUX NOTES
                    </p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <FaArrowCircleRight class="arrow_circle"/>
                    </div>
                </div>
            </div>
            <div className="row mt-3">{topRatedList}</div>

            {/* Footer */}

            <hr className="mt-5" class="footer"/>

            <div className="row mt-3 mb-5">
                <div className="col-md-8 col-sm-6">
                    <h3>QUI SUIS JE</h3>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing 
                        elit. Sit ad dolorem non! Quibusdam quae, magni 
                        deserunt sed tempora sit sapiente voluptatibus 
                        aliquid delectus magnam exercitationem asperiores 
                        libero ipsam dolore ea!
                    </p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing 
                        elit. Sit ad dolorem non! Quibusdam quae, magni 
                        deserunt sed tempora sit sapiente voluptatibus 
                        aliquid delectus magnam exercitationem asperiores 
                        libero ipsam dolore ea!
                    </p>

                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="/" class="social-media">
                                <SiFacebook/>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" class="social-media">
                                <SiLinkedin/>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="col-md-4 col-sm-6">
                    <h3>CONTACT</h3>
                    <ul className="list-unstyled">
                        <li>
                            <p>
                                <strong>
                                    <FiPhone/> Téléphone : 
                                </strong> 
                                 +33 12 13 45 78
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>
                                    <HiOutlineMail/> Email : 
                                </strong> 
                                 myemail@email.com
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}