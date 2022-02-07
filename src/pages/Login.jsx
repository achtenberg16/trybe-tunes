import React, { Component } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../components/Loading";
import { createUser } from "../services/userAPI";
import "../styles/login.css";
import logo from "../images/logo.svg";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      iSbuttonDisabled: true,
      messageLoading: false,
      redirectCondition: false,
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    const VALUE_MIN_BUTTON = 3;
    // esta linha faz a comparação se o texto no input é menor que 3, retornando true ou false
    const buttonDisabled = value.length < VALUE_MIN_BUTTON;
    this.setState({
      [name]: value,
      // caso button disabled seja menor que três o valor setado é true e o botão segue dabilitado
      iSbuttonDisabled: buttonDisabled,
    });
  };

  fetchCreateUSer = async () => {
    const { name } = this.state;
    // esta linha serve para atualizar o state e renderizar o loading na tela enquanto
    // a requisição é feita
    this.setState({ messageLoading: true });
    await createUser({ name });

    this.setState({ messageLoading: false, redirectCondition: true });
  };

  render() {
    const { name, iSbuttonDisabled, messageLoading, redirectCondition } =
      this.state;
    return (
      <div data-testid='page-login' className='login-container'>
        {redirectCondition && <Redirect to='/search' />}
        {messageLoading ? (
          <Loading />
        ) : (
          <>
            {" "}
            <img src={logo} className='logo-image' alt='logo.svg' />
            <form>
              <label>
                Usuário
                <input
                  type='text'
                  value={name}
                  name='name'
                  data-testid='login-name-input'
                  onChange={this.handleInputChange}
                  placeholder='Ex pedro'
                  className='input-user'
                />
              </label>
              <button
                type='button'
                disabled={iSbuttonDisabled}
                onClick={this.fetchCreateUSer}
                data-testid='login-submit-button'
                className='login-btn'
              >
                Entrar
              </button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default Login;
