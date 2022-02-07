import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import searchAlbumsAPI from "../services/searchAlbumsAPI";
import "../styles/search.css";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: "",
      iSbuttonDisabled: true,
      albuns: [],
      loading: false,
      // este campo é para controlar se a busca de albuns está concluida, se estiver ela mostrará na tela a msg solicitada
      SearchEnd: false,
      // este atributo controla o ultimo  nome pesquisado mesmo depois de resetar o input
      SearchName: "",
    };
  }

  // esta função é chamada a cada alteração no input, ela também altera o Search end para false para poder remover a msg de resulto da tela
  handleInputChange = ({ target }) => {
    const { name, value } = target;
    const VALUE_MIN_BUTTON = 2;

    const buttonDisabled = value.length < VALUE_MIN_BUTTON;
    this.setState({
      [name]: value,
      // caso button disabled seja menor que três o valor setado é true e o botão segue dabilitado
      iSbuttonDisabled: buttonDisabled,
      SearchEnd: false,
    });
  };

  handleSubmit = async () => {
    const { artistName } = this.state;
    // name search serve para ter o antigo nome buscado pelo value do input, mesmo após o input ser limpo
    const NameSearch = artistName;
    // aqui o state é alterado para exibir a msg de loading
    this.setState({ loading: true });
    // esta linha faz a busca dos albuns a partir do valor que está no state
    const albuns = await searchAlbumsAPI(artistName);
    // aqui após a busca altero o state, inserindo todos os albuns encontrados, limpando o artistname, dizendo que a serach terminou
    // e tirando a msg de loading
    this.setState({
      SearchName: NameSearch,
      SearchEnd: true,
      artistName: "",
      albuns,
      loading: false,
    });
  };

  render() {
    const {
      iSbuttonDisabled,
      artistName,
      albuns,
      loading,
      SearchEnd,
      SearchName,
    } = this.state;
    return (
      <div data-testid='page-search'>
        <Header />
        <div className='search-container'>
          <input
            name='artistName'
            type='text'
            data-testid='search-artist-input'
            value={artistName}
            onChange={this.handleInputChange}
            placeholder='Digite o nome De um cantor ex: Thiaguinho'
          />
          <button
            data-testid='search-artist-button'
            type='submit'
            disabled={iSbuttonDisabled}
            onClick={this.handleSubmit}
          >
            Procurar
          </button>
        </div>
        <div>
          {/* esta render condicional se o search tiver sido concluido e tiver encontrado albuns mostra a msg abaixo */}
          {SearchEnd && albuns.length > 0 && (
            <p className='text-result'>
              Resultado de álbuns de:{" "}
              <span className='search-Name'>{SearchName}</span>
            </p>
          )}
          {/* esta renderização ocorre se tiver sido feito uma busca e não encontrar albuns */}
          {SearchEnd && albuns.length < 1 && (
            <p className='text-result'>Nenhum álbum foi encontrado</p>
          )}
          {/* esta msg de loading é controla através do state, quando deve e não deve aparecer */}
          {loading ? (
            <Loading />
          ) : (
            <ul className='album-container'>
              {albuns.map(({ collectionId, collectionName, artworkUrl100 }) => (
                // aqui renderizamos todos os nomes de albuns como link na tela
                <li key={collectionId}>
                  <Link
                    data-testid={`link-to-album-${collectionId}`}
                    to={`/album/${collectionId}`}
                  >
                    <img src={artworkUrl100} alt={collectionName} />
                    <p className='album-name'>{collectionName}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
