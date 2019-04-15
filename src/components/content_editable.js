import React from 'react';
import ClickOutside from './utilities/click_outside';
import styled from 'styled-components';

class ContentEditable extends React.Component {
  state = {
    showInput: false,
    text: this.props.text,
  };

  componentDidMount() {
    this.ref = React.createRef();
    this.editButton = React.createRef();
  }

  handleClick = e => {
    e.preventDefault();
    this.setState(
      {
        showInput: true,
      },
      () => {
        this.ref.current.focus();
      }
    );
  };

  handleSubmit = e => {
    this.setState(prevState => ({
      showInput: !prevState.showInput,
    }));

    this.props.handleSubmit(this.state.text);
  };

  handleChange = e => {
    this.setState({
      text: e.target.value,
    });
  };

  handleClickOutside = e => {
    this.handleSubmit();
  };

  render() {
    return (
      <h2>
        {this.state.showInput ? (
          <ClickOutside
            onClickOutside={this.handleSubmit}
            triggerElement={this.editButton.current}
          >
            <form onSubmit={this.handleSubmit}>
              <input type="text" ref={this.ref} onChange={this.handleChange} />
              <button hidden />
            </form>
          </ClickOutside>
        ) : (
          <EditableButton
            ref={this.editButton}
            type="button"
            onClick={this.handleClick}
          >
            {this.state.text}
          </EditableButton>
        )}
      </h2>
    );
  }
}

const EditableButton = styled.button`
  border: none;
  background-color: #fff;
  padding: 0;
`;

export default ContentEditable;
