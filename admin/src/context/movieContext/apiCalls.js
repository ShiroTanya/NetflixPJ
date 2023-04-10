import axios from "axios";
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  updateMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
} from "./MovieActions";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get("/movies", {
      headers: {
        authorization:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

//create
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const res = await axios.post("/movies", movie, {
      headers: {
        authorization:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

//delete
export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axios.delete("/movies/" + id, {
      headers: {
        authorization:
        "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};

//update
export const updateMovies = async (values, item, dispatch) => {
  dispatch(updateMovieStart());
  try {
    const res = await axios.put(
      "/movies/" + item._id,
      {
        title: values.title,
        desc:values.desc,
        imgTitle:values.imgTitle,
        imgSm:values.imgSm,
        year: values.year,
        genre: values.genre,
        limit: values.limit,
        trailer: values.trailer,
        video: values.video,
        img: values.img,
      },
      {
        headers: {
          authorization:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(updateMovieSuccess(res.data));
  } catch (err) {
    dispatch(updateMovieFailure());
  }
};
