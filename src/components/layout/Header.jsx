import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { UserContext } from "../../context/UserProvider";
import { ROLES_ENUM } from "../../utils/enums";

import styles from "./header.module.scss";

const UserNav = ({ handleLinkClick, location }) => {
    const { user, setUser } = useContext(UserContext);
    const isAuthenticated = !!user.accessToken;
    const handleLogOut = () => {
        setUser({});
        localStorage.removeItem("user");
    };

    if (isAuthenticated) {
        return (
            <>
                <li>
                    <Link onClick={handleLinkClick} to="/profile" style={location.pathname === '/profile' ? {color: "#fff", background: "#3D52A0"} : {}}>
                        Profile
                    </Link>
                </li>
                <li>
                    <Link onClick={handleLogOut} to="/all-rent">
                        Sign Out
                    </Link>
                </li>
            </>
        );
    }

    return (
        <>
            <li>
                <Link onClick={handleLinkClick} to="/signin" style={location.pathname === '/signin' ? {color: "#fff", background: "#3D52A0"} : {}}>
                    Đăng nhập
                </Link>
            </li>
            <li>
                <Link onClick={handleLinkClick} to="/signup" style={location.pathname === '/signup' ? {color: "#fff", background: "#3D52A0"} : {}}>
                    Đăng ký
                </Link>
            </li>
        </>
        // {user.id && (
        //     <p>
        //         <Link style={{ textDecoration: 'none' }} to={'/list-meetings'}>
        //             <MdMeetingRoom size={25} />
        //         </Link>
        //     </p>
        // )}
        // {user.id && (
        //     <p>
        //         <Link style={{ textDecoration: 'none' }} to={'/chat-history'}>
        //             <BiMessageDetail size={25} />
        //         </Link>
        //     </p>
        // )
    );
};



export default function Header() {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    // const [activeHeader , setActiveHeader] = useState('');
    // useEffect(() => {
    //     setActiveHeader(location.pathname)
    // }, [location.pathname])

    const navBarClassName = isActive
        ? `${styles.navBar} ${styles.active}`
        : styles.navBar;

    const handleHamburgerClick = () => {
        setIsActive(!isActive);
    };

    const handleLinkClick = () => {
        setIsActive(false);
    };

    return (
        <header className={styles.header}>
            <article className={styles.siteName}>
                <Link to="/all-sell">batdongsanthainguyen</Link>
            </article>
            <article
                className={styles.hamburger}
                onClick={handleHamburgerClick}
            >
                <article className={styles.line}></article>
                <article className={styles.line}></article>
                <article className={styles.line}></article>
            </article>
            <nav className={navBarClassName}>
                <ul>
                    {/* <li>
                        <Link
                            onClick={handleLinkClick}
                            className={styles.active}
                            to="/all-homes"
                        >
                            Buy
                        </Link>
                    </li> */}
                    <li>
                    <Link
                        data-testid="sell-home-link"
                        to='/all-sell'
                        style={location.pathname === '/all-sell' ? {color: "#fff", background: "#3D52A0"} : {}}
                    >
                        Nhà đất bán
                    </Link>
                    </li>
                    <li>
                        <Link onClick={handleLinkClick} to="/all-rent" style={location.pathname === '/all-rent' ? {color: "#fff", background: "#3D52A0"} : {}}>
                        Nhà đất cho thuê
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleLinkClick} to="/news" style={location.pathname === '/news' ? {color: "#fff", background: "#3D52A0"} : {}}>
                            Tin tức
                        </Link>
                    </li>
                    <UserNav handleLinkClick={handleLinkClick} location={location}/>
                    <li>
                        <Link onClick={handleLinkClick} to="/post-listing" style={location.pathname === '/post-listing' ? {color: "#fff", background: "#3D52A0"} : {}}>
                            Đăng tin rao
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
