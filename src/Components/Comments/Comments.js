/* eslint-disable */
import React, {useState, useEffect} from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import preloader from '../../assets/preloader.gif';
import {
  selectAllMovies,
  fetchMovies,
  postComment,
} from "../../redux/movies.redux";
import "./comments.css";

const Comments = () => {
  const [username, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [fetchedComments, setFetchedComments] = useState([]);
  const movies = useSelector(selectAllMovies);
  const dispatch = useDispatch();
  const { id } = useParams();
  const foundMovie = movies.find((movie) => Number(movie.id) === Number(id));

  useEffect(() => {
    dispatch(fetchMovies());
  }, [movies, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      item_id: foundMovie.id,
      username,
      comment,
    };
    dispatch(postComment(newComment));
    setUserName("");
    setComment("");
  };
  let commentsContainer;
  const fetchComments = async () => {
    await axios
      .get(
        `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/nWHbxSiuSFC7nMEf03JD/comments?item_id=${Number(
          foundMovie.id
        )}`
      )
      .then((res) => {commentsContainer = res
        setFetchedComments(commentsContainer)
      })
      .catch((err) => err);
  };

  useEffect(() => {
    fetchComments();
  }, [[], handleSubmit]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="movieComments">
      <NavLink to="/" className="closeButton">
        <AiOutlineClose className="close_me" />
      </NavLink>
      <h3 className="commentTitle">
        {foundMovie.title} {Number(foundMovie.id)}
      </h3>
      <img
        src={foundMovie.image}
        className="commentImage"
        alt={foundMovie.title}
      />
      <div className="contain">
        <table className="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th colSpan="2" scope="col">
                MOVIE DATA
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Rating:</th>
              <td>{foundMovie.rating} / 10</td>
            </tr>
            <tr>
              <th scope="row">Likes:</th>
              <td>{foundMovie.likes} Likes</td>
            </tr>
            <tr>
              <th scope="row">Release Date:</th>
              <td>{foundMovie.year}</td>
            </tr>
            <tr>
              <th scope="row">Genres:</th>
              <td>{foundMovie.genres}</td>
            </tr>
            <tr>
              <th scope="row">URL:</th>
              <td>{foundMovie.url}</td>
            </tr>
            <tr>
              <th scope="row">Summary:</th>
              <td>{foundMovie.summary}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="comments_record">
        {/* display comments from the api */}
        <h3 className="commentTitle mainT">Comments for {foundMovie.title}</h3>
        <div className="comments">
          {(fetchedComments.status === 200) ? fetchedComments.data.map((comment) => (
            <div className="comment" key={comment.item_id}>
              <h4 className="commentTitle">{comment.username}</h4>
              <p className="creationDate">{comment.creation_date}</p>
              <p className="commentText">{comment.comment}</p>
            </div>
          )) : <img className="preloader" src={preloader} alt="preloader" /> }
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name: "
            value={username}
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <textarea
            type="text"
            rows="4"
            cols="50"
            placeholder="Your insights: "
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="submit" type="submit">
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
