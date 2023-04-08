import { Link, useHistory, useLocation } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import { useContext, useState } from "react";
import storage from "../../firebase";
import { updateMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useEffect } from "react";

export default function Movie() {
  const location = useLocation();
  const { dispatch } = useContext(MovieContext);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const movie = location.movie;
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [updateMovie, setUpdateMovies] = useState(null);
  const [loading, setLoading] = useState(null);
  const history = useHistory();

  useEffect(()=>{
    if(!movie){
      history.push("/movies");
    }
    // eslint-disable-next-line
  },[])

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdateMovies({ ...updateMovie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is" + progress + " %done.");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUpdateMovies((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((pre) => pre + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    if (uploaded === 0) {
      setLoading(true);
      e.preventDefault();
      upload([
        { file: img, label: "img" },
        { file: imgTitle, label: "imgTitle" },
        { file: imgSm, label: "imgSm" },
        { file: trailer, label: "trailer" },
        { file: video, label: "video" },
      ]);
    } else setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovies(
      updateMovie,
      movie,
      dispatch
    );
    history.push("/");
  };


  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Phim</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Tạo</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie?movie.img:''} alt="" className="productInfoImg" />
            <span className="productName">{movie?movie.title:''}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie?movie._id:''}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Thể loại:</span>
              <span className="productInfoValue">{movie?movie.genre:''}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Năm xuất bản:</span>
              <span className="productInfoValue">{movie?movie.year:''}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Giới hạn độ tuổi:</span>
              <span className="productInfoValue">{movie?movie.limit:''}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Tựa đề</label>
            <input type="text" placeholder={movie?movie.title:''} onChange={handleChange} name="title" />
            <label>Mô tả</label>
            <input
              type="text"
              placeholder="Mô tả"
              name="desc"
              onChange={handleChange}
            />
            <label>Năm</label>
            <input type="text" placeholder={movie?movie.year:''} onChange={handleChange} name="year" />
            <label>Thể loại</label>
            <input type="text" placeholder={movie?movie.genre:''} onChange={handleChange} name="genre" />
            <label>Giới hạn độ tuổi</label>
            <input type="text" placeholder={movie?movie.limit:''} onChange={handleChange} name="limit" />

            <label>Ảnh Chính</label>
            <input
              type="file"
              id="imgTitle"
              name="imgTitle"
              onChange={(e) => setImgTitle(e.target.files[0])}
            />
            <label>Ảnh bìa</label>
            <input
              type="file"
              id="imgSm"
              name="imgSm"
              onChange={(e) => setImgSm(e.target.files[0])}
            />

            <label>Trailer</label>
            <input
              type="file"
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />
            <label>Video</label>
            <input
              type="file"
              name="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src="https://previews.123rf.com/images/sarahdesign/sarahdesign1509/sarahdesign150901050/44517597-upload-button-upload-icon.jpg"
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} name="img" onChange={(e) => setImg(e.target.files[0])} />
            </div>
            {uploaded === 5 ? (
              <button className="productButton" onClick={handleSubmit}>
                Cập nhật
              </button>
            ) : loading ? (
              <span>Đang tải...</span>
            ) : (
              <button className="productButton" onClick={handleUpload}>
                Tải file
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
