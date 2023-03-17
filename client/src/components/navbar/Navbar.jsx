import { ArrowDropDown, Notifications, Search } from "@material-ui/icons"
import { useState } from "react";
import "./navbar.scss"

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false); //fix transparent cua navbar; top = false (trans), scroll = true
  
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true); //Toa do Y = 0 = false
      return () => (window.onscroll = null);
    };
    return (
      <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt="" />
                    <span>Trang chủ</span>
                    <span>Phim bộ</span>
                    <span>Phim điện ảnh</span>
                    <span>Phim mới & Phổ biến</span>
                    <span>Yêu thích</span>
                </div>

                <div className="right">
                    <Search className="icon"/>
                    <span>Trẻ em</span>
                    <Notifications className="icon"/>
                    <img src="https://img5.thuthuatphanmem.vn/uploads/2021/07/14/logo-hutech-tron_012635653.png" alt="" />

                    <div className="profile">
                    <ArrowDropDown className="icon"/>
                    <div className="options">
                        <span>
                            Settings
                        </span>
                        <span>
                            Logout
                        </span>
                    </div>

                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar
