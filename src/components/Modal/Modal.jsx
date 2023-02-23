import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    document.body.addEventListener('keydown', this.hendleClose);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.hendleClose);
  }

  hendleClose = e => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.hendleClose}>
        <div className="Modal">{children}</div>
      </div>,
      modalRoot
    );
  }
}
