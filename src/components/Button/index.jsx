import "../../styles/global-styles.css";

// import { Component } from "react";

export const Button = ({ text, onClick, disabled }) => (
  <button className="button" onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

// abaixo, é usando classes e estados. Acima, é usando Hooks
// export class Button extends Component {
//   render() {
//     const { text, onClick, disabled } = this.props;

//     return (
//       <button
//         className="button"
//         onClick={onClick} // quando o botão for clicado, chama a função loadMoresPosts
//         disabled={disabled}
//       >
//         {text}
//       </button>
//     );
//   }
// }
