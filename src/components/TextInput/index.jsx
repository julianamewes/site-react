import "./styles.css";

export const TextInput = ({ handleChange, searchValue }) => {
  return (
    <input
      className="text-input"
      onChange={handleChange}
      value={searchValue} //no estado do elemento
      type="search"
      placeholder="Digite a sua busca aqui"
    />
  );
};
