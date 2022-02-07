import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userAPI";
import "../styles/header.css";
import logo from "../images/headerLogo.svg";
class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      Username: "",
      image: "",
    };
  }

  componentDidMount() {
    this.findName();
  }

  findName = async () => {
    this.setState({ loading: true });
    const name = await getUser();
    this.setState({
      Username: name.name,
      image: name.image,
      loading: false,
    });
  };

  render() {
    const { Username, image = {} } = this.state;
    return (
      <header data-testid='header-component'>
        <div className='first-header' data-testid='header-user-name'>
          <img src={logo} className='header-logo' alt='logo' />
          <div className='container-user'>
            <img src={image} className='img-perfil' alt='' />
            {Username}
          </div>
        </div>
        <nav>
          <ul className='header-link'>
            <li>
              <Link to='/favorites' data-testid='link-to-favorites'>
                {" "}
                Favorites
              </Link>
            </li>
            <li>
              <Link to='/search' data-testid='link-to-search'>
                {" "}
                Search
              </Link>
            </li>
            <li>
              <Link to='/profile' data-testid='link-to-profile'>
                {" "}
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
