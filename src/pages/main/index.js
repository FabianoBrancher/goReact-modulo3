import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as FavoriteActions from "../../store/actions/favorites";

class Main extends Component {
  static propTypes = {
    addFavorite: PropTypes.func.isRequired,
    favorites: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        destription: PropTypes.string,
        url: PropTypes.string
      })
    )
  };

  state = {
    repositoryInput: ""
  };

  handleAddRepository = event => {
    event.preventDefault();

    this.props.addFavorite();
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
        </form>
        <ul>
          {this.props.favorites.map(favorite => (
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
