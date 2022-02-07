import PropTypes from "prop-types";
import React, { Component } from "react";
import "../styles/musicsCard.css";

class MusicCard extends Component {
  render() {
    const {
      track: { trackId, trackName, previewUrl },
      track,
      handleFavorite,
      favorite,
    } = this.props;
    return (
      <div className='card-container'>
        <span>{trackName}</span>
        <audio data-testid='audio-component' src={previewUrl} controls>
          <track kind='captions' />O seu navegador não suporta o elemento
          <code>audio</code>.
        </audio>
        <label htmlFor={trackId}>
          <input
            data-testid={`checkbox-music-${trackId}`}
            type='checkbox'
            id={trackId}
            // no evento ela chama uma calback para poder passar parametros pra handle, a handle recebe o value do checked após o evento e o objeto inteiro da música
            onChange={({ target: { checked } }) =>
              handleFavorite(track, checked)
            }
            checked={favorite}
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  favorite: PropTypes.bool.isRequired,
  handleFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
