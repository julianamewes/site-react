import { useEffect, useState, useCallback } from "react";

import "../../styles/global-styles.css";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../util/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState("");

  // useEffect tem o mesmo papel do componentDidMount, componentDidUpdate e componentWillMount

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    //não precisa ser async pois não vai buscar nada da API
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts); //spread operator (...): vai espelhar os posts aqui dentro sem criar um novo array

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    //handleChange recebe o evento 'e'
    const { value } = e.target;
    setSearchValue(value);
  };

  const noMorePosts = page + postsPerPage >= allPosts.length; // se a pg que eu quero ir for maior que a quantidade de posts existentes, então noMorePosts

  const filteredPosts = !!searchValue // se tiver algo na busca (searchValue), eu vou filtrar os posts
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(
          //retornando os títulos que contém o que foi escrito no 'searchValue'
          searchValue.toLowerCase()
        );
      })
    : posts; //se não tiver algo no searchValue, eu retorno os posts normal

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && ( //se 'searchValue' for verdadeiro, faça o que está a seguir do &&
          <h1>Busca: {searchValue}</h1>
        )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
        <br />
        <br />
        <br />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && (
        <p>Não há posts compatíveis com a busca.</p>
      )}

      <div className="button-container">
        {!searchValue && ( //se não tiver busca, eu quero exibir o botão
          <Button
            text="Load more posts"
            onClick={loadMorePosts} //isso não é evento, é um atributo que está sendo passado
            disabled={noMorePosts} //é um atributo que vai pra props
          />
        )}
      </div>
    </section>
  );
};

// export class Home2 extends Component {
//   state = {
//     // Esse é um componente de estado. Aqui são definidos o que eu quero no meu estado
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 2, // nesse exemplo, existem 100 posts disponíveis
//     searchValue: "",
//   };

//   // depois que o componente montar, preciso fazer uma chamada para uma API, encher dados (preencher os posts):
//   // usada para buscar dados sem ter que criar uma API: https://jsonplaceholder.typicode.com/

//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state; // aqui está usando o estado (sempre que estiver usando o setState)

//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   };

//   loadMorePosts = () => {
//     //não precisa ser async pois não vai buscar nada da API
//     const { page, postsPerPage, allPosts, posts } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts); //spread operator (...): vai espelhar os posts aqui dentro sem criar um novo array

//     this.setState({ posts, page: nextPage });
//   };

//   handleChange = (e) => {
//     //handleChange recebe o evento 'e'
//     const { value } = e.target;
//     this.setState({ searchValue: value });
//   };

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length; // se a pg que eu quero ir for maior que a quantidade de posts existentes, então noMorePosts

//     const filteredPosts = !!searchValue // se tiver algo na busca (searchValue), eu vou filtrar os posts
//       ? allPosts.filter((post) => {
//           return post.title.toLowerCase().includes(
//             //retornando os títulos que contém o que foi escrito no 'searchValue'
//             searchValue.toLowerCase()
//           );
//         })
//       : posts; //se não tiver algo no searchValue, eu retorno os posts normal

//     fetch(process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1")
//       .then(() => console.log("Deu certo"))
//       .catch(() => console.log("Deu erro"));

//     return (
//       <section className="container">
//         <div className="search-container">
//           {!!searchValue && ( //se 'searchValue' for verdadeiro, faça o que está a seguir do &&
//             <h1>Busca: {searchValue}</h1>
//           )}

//           <TextInput
//             searchValue={searchValue}
//             handleChange={this.handleChange}
//           />
//           <br />
//           <br />
//           <br />
//         </div>

//         {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

//         {filteredPosts.length === 0 && (
//           <p>Não há posts compatíveis com a busca.</p>
//         )}

//         <div className="button-container">
//           {!searchValue && ( //se não tiver busca, eu quero exibir o botão
//             <Button
//               text="Load more posts"
//               onClick={this.loadMorePosts} //isso não é evento, é um atributo que está sendo passado
//               disabled={noMorePosts} //é um atributo que vai pra props
//             />
//           )}
//         </div>
//       </section>
//     );

//o map deverá ser acompanhado pelo key
