export const loadPosts = async () => {
  const postResponse = fetch("https://jsonplaceholder.typicode.com/posts");
  const photoResponse = fetch("https://jsonplaceholder.typicode.com/photos");

  const [posts, photos] = await Promise.all([postResponse, photoResponse]);

  const postJson = await posts.json();
  const photoJson = await photos.json();

  const postsAndPhotos = postJson.map((posts, index) => {
    return { ...posts, cover: photoJson[index].url };
  });

  return postsAndPhotos;
};
