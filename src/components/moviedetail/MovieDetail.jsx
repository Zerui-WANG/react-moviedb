import React, {useState, useEffect} from 'react';
import { 
    fetchCasts,
    fetchMovieDetail,
    fetchMovieVideos,
    fetchSimilarMovie
} from '../../service';
import { FaPlay, FaArrowCircleLeft } from 'react-icons/fa';
import './../../public/assets/styles/home.css'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

export function MovieDetail({ match }) {
    let params = match.params;
    let genres = [];

    const [isOpen, setIsOpen] = useState(false);
    const [detail, setDetail] = useState([]);
    const [video, setVideo] = useState([]);
    const [casts, setCasts] = useState([]);
    const [similarMovie, setSimilarMovie] = useState([]);

    useEffect(() => {
        const fectchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id));
            setVideo(await fetchMovieVideos(params.id));
            setCasts(await fetchCasts(params.id));
            setSimilarMovie(await fetchSimilarMovie(params.id));
        };
        
        fectchAPI();
    }, [params.id]);

    genres = detail.genres;

    const MoviePlayerModal = (props) => {
        const youtubeUrl = 'https://www.youtube.com/watch?v=';
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        style={{color: "#000000", fontWeight: "bolder"}}
                    >
                        {detail.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#000000" }}>
                    <ReactPlayer
                        className="container-fluid"
                        url={youtubeUrl + video.key}
                        playing
                        width="100%"
                    ></ReactPlayer>
                </Modal.Body>
            </Modal>
        );
    };

    let genresList;
    if(genres) {
        genresList = genres.map((g, i) => {
            return (
                <li className="list-inline-item" key={i}>
                    <button className="btn btn-outline-info">
                        {g.name}
                    </button>
                </li>
            );       
        });
    }

    const castList = casts.slice(0, 4).map((c, i) => {
        return (
            <div className="col-md-3 text-center" key={i}>
                <img
                    className="img-fluid rounded-circle mx-auto d-block"
                    src={c.img}
                    alt={c.name}
                />
                <p className="font-weight-bold text-center">{c.name}</p>
                <p className="font-weight-light text-center">{c.character}</p>
            </div>
        );
    });

    const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
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

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col">
                    <div className="float-left">
                        <Link to={`/`} className="back">
                            <FaArrowCircleLeft class="arrow_circle"/> Retour à l'accueil
                        </Link>
                        
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <MoviePlayerModal
                    show={isOpen}
                    onHide={() => {
                        setIsOpen(false);
                    }}
                />
                <div className="col text-center">
                    <img
                        class="header_slides_img"
                        src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
                        alt={detail.title}
                    />
                    <div className="carousel-center">
                        <i class="faplay" onClick={() => setIsOpen(true)}><FaPlay/></i>
                    </div>
                    <div className="carousel-caption">{detail.title}</div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <p class="subtitle">GENRE</p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <ul className="list-inline">{genresList}</ul>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                <p class="subtitle">RESUME</p>
                    {detail.overview}
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-3">
                    <p className="subtitle_2">DATE DE SORTIE</p>
                    <p>{detail.release_date}</p>
                </div>
                <div className="col-md-3">
                    <p className="subtitle_2">DUREE</p>
                    <p>{detail.runtime} min</p>
                </div>
                <div className="col-md-3">
                    <p className="subtitle_2">BUDGET</p>
                    <p>{detail.budget} $</p>
                </div>
                <div className="col-md-3">
                    <p className="subtitle_2">PAGE D'ACCUEIL</p>
                    <p><a href={detail.homepage}>{detail.title}</a></p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                <p class="subtitle">DISTRIBUTION</p>
                </div>
            </div>
            <div className="row mt-3">{castList}</div>

            <div className="row mt-3">
                <p class="subtitle">FILM SIMILAIRE</p>
            </div>
            <div className="row mt-3">{similarMovieList}</div>
        </div>
    );
}