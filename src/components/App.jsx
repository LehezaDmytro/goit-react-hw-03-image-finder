import '../index.css';

import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ErrorMessage } from './Messages/ErrorMessage';
import { WarningMessage } from './Messages/WarningMessage';

import { getPost } from 'shared/api/posts';
import { Hearts } from 'react-loader-spinner';
export class App extends Component {
  state = {
    items: [],
    page: 1,
    loader: false,
    error: '',
    message: false,
    searchRequest: '',
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchRequest, page } = this.state;

    if (prevState.searchRequest !== searchRequest || prevState.page !== page) {
      this.featchPost();
    }
  }

  async featchPost() {
    const { searchRequest, page } = this.state;

    try {
      this.setState({ loader: true, message: false });
      const {
        data: { hits },
      } = await getPost(searchRequest, page);
      hits.length
        ? this.setState(prevState => ({
            items: [...prevState.items, ...hits],
          }))
        : this.setState({ items: [], message: true });
    } catch ({ response: { data } }) {
      this.setState({
        error:
          data || 'Error! Unable to load the image, please try again later!',
      });
    } finally {
      this.setState({ loader: false });
    }
  }

  onSubmit = inputValue => {
    this.setState({
      items: [],
      page: 1,
      searchRequest: inputValue,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  showModal = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      largeImageURL,
      tags,
    });
  };

  closeModal = e => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { items, loader, error, message, showModal, largeImageURL, tags } =
      this.state;
    return (
      <div className="App">
        {showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <Searchbar onSubmit={this.onSubmit} />
        {error && <ErrorMessage error={error} />}
        {message && <WarningMessage />}
        <ImageGallery items={items} showModal={this.showModal} />
        {loader && (
          <Hearts
            color="#4fa94d"
            ariaLabel="hearts-loading"
            wrapperClass="Loader"
          />
        )}
        {Boolean(items.length) && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}
