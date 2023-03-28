import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./featured.scss";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  console.log(content);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Thể loại</option>
            <option value="adventure">Phiêu lưu</option>
            <option value="comedy">Hài kịch</option>
            <option value="crime">Tâm lý tội phạm</option>
            <option value="fantasy">Viễn Tưởng</option>
            <option value="historical">Lịch sử</option>
            <option value="horror">Kinh dị</option>
            <option value="romance">Lãng mạn</option>
            <option value="sci-fi">Khoa học - Viễn tưởng</option>
            <option value="thriller">Kinh dị</option>
            <option value="western">Châu Âu</option>
            <option value="animation">Hoạt hình</option>
            <option value="drama">Chính kịch</option>
            <option value="documentary">Tài liệu</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}