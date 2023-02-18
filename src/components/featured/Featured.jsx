import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";

export default function Featured({ type }) {
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
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
      <img
        src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <div className="info">
        <img
          src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
          alt=""
        />
        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          adipisci repellendus eum quasi illo, velit numquam, maxime tempora
          sint deleniti, aliquid qui? Facilis, adipisci! Ratione hic repudiandae
          temporibus eum earum?
        </span>
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