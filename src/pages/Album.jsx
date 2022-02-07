import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import getMusics from "../services/musicsAPI";
import MusicCard from "../components/MusicCard";
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from "../services/favoriteSongsAPI";
import Loading from "../components/Loading";
import "../styles/album.css";

// está lógica foi desenvolvida em conjunto com Rafael França
class Album extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      artistName: "",
      collectionName: "",
      artworkUrl100: "",
      loading: false,
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    this.fetchALbumMusics();
  }

  // esta função é chamada sempre que é clicado no checkbox se ele foi marcado ela adiciona uma musica no local storage,
  // se foi desmarcado ela removclassName='album-musicse da localstorage, esta verificação através do value do input checked que é recebido como segundo parametro nesta func
  handleFavorite = async (objMusic, checked) => {
    // mostra a msg de loading
    this.setState({ loading: true });
    // se checkbox é marcado ele adiciona uma musica na localstorage
    if (checked) await addSong(objMusic);
    // se é desmarcado ele remove uma msc da localstorage
    if (!checked) await removeSong(objMusic);
    // após adicionar ou remover ele pega o array de músicas favoritas atualizado e seta no state
    const favoritesSongs = await getFavoriteSongs();
    // remove o loading e seta as novas músicas
    this.setState({ loading: false, favoritesSongs });
  };

  fetchALbumMusics = async () => {
    const { id } = this.props;
    // ele busca as musicas de acordo com o id recebido por parametro via url, o id do album
    const musics = await getMusics(id);
    // esta linha desestrutra o nome do artista, do album, e a imagem.  todos estão no index 0 do retorno da props
    const { artistName, collectionName, artworkUrl100 } = musics[0];
    // após buscar as músicas esta função pega todas as musicas da localstorage para poder validar depois se ela é favorita ou não
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      // como a primeira posição não é uma musica eu quero os elementos a partir do index 1
      songs: musics.slice(1),
      artistName,
      collectionName,
      artworkUrl100,
      favoritesSongs,
    });
  };

  // esta função verifica se uma musica é favorita, ela recebe o id da musica e percorre o array de musicas do state, se algum elemento tiver o mesmo id ela retorna true
  // este valor true ou false é passado para o campo da checkbox do cardalbum. se for true o checkbox será marcado se for false ele ficara desmarcado
  isFavorite = (id) => {
    const { favoritesSongs } = this.state;
    return favoritesSongs.some(({ trackId }) => trackId === id);
  };

  render() {
    const { artistName, collectionName, artworkUrl100, songs, loading } =
      this.state;
    return (
      <div data-testid='page-album'>
        <Header />
        <main className='album-musics'>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className='album-image'>
                <img src={artworkUrl100} alt={collectionName} />
                <p data-testid='artist-name'>{artistName}</p>
                <p data-testid='album-name'>{collectionName}</p>
              </div>
              <div className='tracks-container'>
                {songs.map((track) => (
                  // chama o componente que cria a musica
                  <MusicCard
                    key={track.trackId}
                    // esta função vai ser executada no onchange do evento
                    handleFavorite={this.handleFavorite}
                    // passa o obj inteiro da música para ser desestruturado la no componente
                    track={track}
                    // executa a função que verifica se o elemento esta contido no array de favoritos, está função sempre retorna o bool
                    favorite={this.isFavorite(track.trackId)}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Album;
