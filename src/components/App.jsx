import '../index.css';

import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

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
    curentImageId: '',
  };

  componentDidUpdate(_, prevState) {
    this.featchPost(prevState);
  }

  async featchPost(prevState) {
    const { searchRequest, page } = this.state;
    if (prevState.searchRequest !== searchRequest || prevState.page !== page) {
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

  showModal = id => {
    this.setState({
      showModal: true,
      curentImageId: id,
    });
  };

  closeModal = e => {
    this.setState({
      showModal: false,
    });
  };

  largeImage() {
    return this.state.items.find(
      element => element.id === this.state.curentImageId
    );
  }

  render() {
    const { items, loader, error, message, showModal } = this.state;
    return (
      <div className="App">
        {showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={this.largeImage().largeImageURL} alt=""></img>
          </Modal>
        )}
        <Searchbar onSubmit={this.onSubmit} />
        {error && <p className="Error">{error}</p>}
        {message && (
          <p className="Message">
            Sorry, but nothing was found for your request!
          </p>
        )}
        <ImageGallery>
          <ImageGalleryItem items={items} showModal={this.showModal} />
        </ImageGallery>
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
