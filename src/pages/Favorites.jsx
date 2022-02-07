import React, { Component } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { getFavoriteSongs, removeSong } from "../services/favoriteSongsAPI";
import MusicCard from "../components/MusicCard";
import "../styles/favorites.css";

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoritesSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavoritesMusicsState();
  }

  // esta função executa quando o componente carrega, ela busca todas as musicas favoritas da localstorage e coloca no state
  getFavoritesMusicsState = async () => {
    this.setState({ loading: true });
    const getFavorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoritesSongs: getFavorites,
    });
  };

  // esta função é executada sempre que é clicado no checkbox, caso ele foi desmarcado remove a musica do localstorage e atualiza o state das músicas
  handleFavorite = async (track, checked) => {
    this.setState({ loading: true });
    if (!checked) await removeSong(track);
    const getFavorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoritesSongs: getFavorites,
    });
  };

  // esta função verifica se o elemento  esta com checkbox marcado  ou desmarcado
  isFavorite = (id) => {
    const { favoritesSongs } = this.state;
    return favoritesSongs.some(({ trackId }) => trackId === id);
  };

  render() {
    const { favoritesSongs, loading } = this.state;
    return (
      <div data-testid='page-favorites'>
        <Header />
        <main>
          <h2 className='favorites-title'>Músicas favoritas:</h2>
          {loading && <Loading />}
          <div className='card-musics'>
            {favoritesSongs.map((track) => (
              // chama o componente que cria a musica
              <MusicCard
                key={track.trackId}
                // esta função vai ser executada no onchange do evento
                handleFavorite={this.handleFavorite}
                // passa o obj inteiro da música para ser desestruturado la no componente
                track={track}
                // esta linha sempre retorna true ou false e define se o checkbox esta marcado ou desmarcado.
                favorite={this.isFavorite(track.trackId)}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }
}

export default Favorites;
