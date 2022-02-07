import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { getUser } from "../services/userAPI";
import "../styles/profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.getInfos();
  }

  getInfos = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      loading: false,
      user,
    });
  };

  render() {
    const {
      loading,
      user: { description, email, image, name },
    } = this.state;
    return (
      <div data-testid='page-profile'>
        <Header />
        <main>
          {loading ? (
            <Loading />
          ) : (
            <div className='div-container'>
              <img src={image} alt={name} data-testid='profile-image' />
              <div className='text-container'>
                <p>
                  Nome:<span>{name}</span>
                </p>
                <p>
                  Email: <span>{email}</span>
                </p>
                <p>
                  Descrição: <span>{description}</span>
                </p>
              </div>
              <Link to='/profile/edit' className='profile-edit'>
                Profile Edit
              </Link>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default Profile;
