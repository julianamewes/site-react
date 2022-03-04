import "../../styles/global-styles.css";

import { Component } from "react";

export class Button extends Component {
  render() {
    const { text, onClick, disabled } = this.props;

    return (
      <button
        className="button"
        onClick={onClick} // quando o botão for clicado, chama a função loadMoresPosts
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
}
