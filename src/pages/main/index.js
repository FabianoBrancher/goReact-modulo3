import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as FavoriteActions from "../../store/actions/favorites";

class Main extends Component {
  static propTypes = {
    addFavoriteRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      destription: PropTypes.string,
      url: PropTypes.string
    })),
    error: PropTypes.oneOfType([null, PropTypes.string])
  }.isRequired;


  state = {
    repositoryInput: ""
  };

  handleAddRepository = event => {
    event.preventDefault();

    this.props.addFavoriteRequest(this.state.repositoryInput);
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleAddRepository}>
          <input
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">Adicionar</button>

          {this.props.favorites.loading && <span>Carregando...</span>}
          {!!this.props.favorites.error && <span style={{ color: '#F00' }}>{this.props.favorites.error}</span>}
        </form>
        <ul>
          {this.props.favorites.data.map(favorite => (
            <Fragment>
              <li key={favorite.id}>
                <p>
                  <strong>{favorite.name}</strong> ({favorite.description})
                </p>
              </li>
              <a href={favorite.url}>{favorite.url}</a>
            </Fragment>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoriteActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
