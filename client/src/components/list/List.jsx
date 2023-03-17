import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
  } from "@material-ui/icons";
  import { useRef, useState } from "react";
  import ListItem from "../listItem/ListItem";
  import "./list.scss";
  
  export default function List() {
    const [isMoved, setIsMoved] = useState(false); //hook useState lưu trữ giá trị hai biến isMoved (đã di chuyển list chưa?) và slideNumber(số slide hiện tại)
    const [slideNumber, setSlideNumber] = useState(0);
  
    const listRef = useRef();
  
    const handleClick = (direction) => {
      setIsMoved(true);
      let distance = listRef.current.getBoundingClientRect().x - 50; //Khoảng cách từ lề trái đến hết 1 item là 280px( 50px của button left + 225px của item + 5px khoảng cách giữa 2 items)
      
      if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
      }

      //vì một list sẽ chứa 10 items => sau khi bấm đủ 5 right click (arrow) sẽ ko cho phép bấm tiếp
      if (direction === "right" && slideNumber < 5) {
        setSlideNumber(slideNumber + 1);
        listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      }
    };


    return (
      <div className="list">
        <span className="listTitle">Tiếp tục xem</span>
        <div className="wrapper">
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            style={{ display: !isMoved && "none" }}
          />
          <div className="container" ref={listRef}>
            <ListItem index={0} />
            <ListItem index={1} />
            <ListItem index={2} />
            <ListItem index={3} />
            <ListItem index={4} />
            <ListItem index={5} />
            <ListItem index={6} />
            <ListItem index={7} />
            <ListItem index={8} />
            <ListItem index={9} />
          </div>
          <ArrowForwardIosOutlined
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    );
  }