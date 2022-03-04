import { Component } from "react";

import "../../styles/global-styles.css";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../util/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export class Home extends Component {
  state = {
    // aqui são definidos o que eu quero no meu estado
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2, // nesse exemplo, existem 100 posts disponíveis
    searchValue: "",
  };

  // depois que o componente montar, preciso fazer uma chamada para uma API, encher dados (preencher os posts):
  // usada para buscar dados sem ter que criar uma API: https://jsonplaceholder.typicode.com/

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    //não precisa ser async pois não vai buscar nada da API
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts); //spread operator (...): vai espelhar os posts aqui dentro sem criar um novo array

    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    //handleChange recebe o evento 'e'
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
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

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
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
              onClick={this.loadMorePosts} //isso não é evento, é um atributo que está sendo passado
              disabled={noMorePosts} //é um atributo que vai pra props
            />
          )}
        </div>
      </section>
    );
  }
}

//o map deverá ser acompanhado pelo key
