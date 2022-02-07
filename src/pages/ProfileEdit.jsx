import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/Header";
import { getUser, updateUser } from "../services/userAPI";
import Input from "../components/Input";
import Loading from "../components/Loading";
import "../styles/editprofile.css";

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: false,
      buttonDisabled: true,
      redirect: false,
    };
  }

  componentDidMount() {
    this.GetUserStorage();
  }

  // esta função pega as informações do usuario e cria um objeto no state ao componente ser montado
  GetUserStorage = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState(
      {
        loading: false,
        user,
      },
      () =>
        this.setState({
          // esta linha é para após carregar a pagina validar se o button inicialmente começa habilitado ou desabilitado
          buttonDisabled: this.veryfyInputs(),
        })
    );
  };

  // esta função lida com alterações no input setando o novo state de infos
  handleInputChange = ({ target }) => {
    const { user } = this.state;
    const { name, value } = target;
    user[name] = value;
    const buttonDisabled = this.veryfyInputs();
    this.setState({ user, buttonDisabled });
  };

  // esta função roda quando o botão de salvar é clicado, ela chama a função que atualiza o user no storage
  onUpdtateClick = async (event) => {
    const { history } = this.props;
    // esta linha é para tirar  o comportamento padrao do browser
    event.preventDefault();
    const { user } = this.state;
    // essa linha atualiza o localstorage
    await updateUser(user);
    // esta linha seta um push no history o que faz com que a pagina seja redirecionada automaticamente
    // foi feito com ajuda de Bruno Alves
    history.push("/profile");
  };

  veryfyInputs = () => {
    const {
      user: { name, email, description, image },
    } = this.state;
    let atendidas = 0;
    const array = [name, email, description, image];
    if (array.every((element) => element.length > 1)) atendidas += 1;
    // Regex from https://stackoverflow.com/questions/4964691/super-simple-email-validation-with-javascript
    if (/^\S+@\S+\.\S+$/.test(email)) atendidas += 1;
    // o valor minimo é 2 pois dois ifs precisam ser atendidos pro button ser desabilitado
    const MINIMUM_FOR_VALIDATION = 2;
    // se os ifs atendidos forem diferentes de 2 true e o button segue desabilitado se for igual a dois ela retorna false  e ativa o button
    return atendidas !== MINIMUM_FOR_VALIDATION;
  };

  render() {
    const {
      user: { name, email, image, description },
      loading,
      buttonDisabled,
      redirect,
    } = this.state;
    return (
      <>
        {redirect && <Redirect to='/profile' />}
        <div data-testid='page-profile-edit'>
          <Header />
          <main>
            {loading ? (
              <Loading />
            ) : (
              <form className='edit-infos'>
                <Input
                  name='name'
                  type='text'
                  testid='edit-input-name'
                  value={name}
                  callback={this.handleInputChange}
                  dica='ex Pedro'
                />

                <Input
                  name='email'
                  type='text'
                  testid='edit-input-email'
                  value={email}
                  callback={this.handleInputChange}
                  dica='ex Pedro@gmail.com'
                />
                <Input
                  name='description'
                  type='text'
                  testid='edit-input-description'
                  value={description}
                  callback={this.handleInputChange}
                  dica='Tenho 25 anos, adoro pagode...'
                />
                <Input
                  name='image'
                  type='text'
                  testid='edit-input-image'
                  value={image}
                  callback={this.handleInputChange}
                  dica='insira uma url de imagem'
                />
                <button
                  type='submit'
                  data-testid='edit-button-save'
                  disabled={buttonDisabled}
                  onClick={this.onUpdtateClick}
                >
                  Editar perfil
                </button>
              </form>
            )}
          </main>
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
