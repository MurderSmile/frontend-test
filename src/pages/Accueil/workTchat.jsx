/* eslint-disable jsx-a11y/img-redundant-alt */
import '../../utils/styles/css/index.css';
import { useState, useEffect, useContext } from 'react';
import { IdContext } from '../../utils/context';
import LikePost from './InteractionsPost/likePost';
import DeletePost from './InteractionsPost/deletePost';
import { apiBackend } from '../../utils/api';

////  Génération des posts  //
function WorkTchat() {
  const profil = JSON.parse(sessionStorage.getItem('profil'));
  const [posts, setPosts] = useState([]);
  const [wait, setWait] = useState(true);
  const { setIdPost } = useContext(IdContext);

  ////  Récupération des Posts  //
  useEffect(() => {
    setWait(true);

    fetch(`${apiBackend}/api/posts/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${profil.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        setPosts(resJson);
        localStorage.setItem('posts', JSON.stringify(resJson));
        setWait(false);
      })
      .catch((error) => console.log(error));
  }, [profil.token]);

  ////  Classement par ordre chronologique  //
  // eslint-disable-next-line array-callback-return
  posts.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    // eslint-disable-next-line no-cond-assign
    if ((a.date = b.date)) {
      if (a.time < b.time) return 1;
      if (a.time > b.time) return -1;
    }
  });

  ////  Message de chargement  //
  if (wait) {
    return <div id="download">Chargement en cours...</div>;
  }

  ////  Génération de chaque post  //
  else {
    return (
      <div id="postList">
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <span>{post.author}</span>
            {post.imageUrl && (
              <img
                className="postPicture"
                src={post.imageUrl}
                alt="image du post"
              />
            )}
            <div className="postContent">{post.text}</div>
            <div className="postDate">
              {' '}
              <span>
                Créer le {post.date} à {post.time}
              </span>{' '}
            </div>

            <div className="postInteraction">
              {profil.name === post.author || profil.admin ? (
                <button
                  onClick={() => {
                    setIdPost(post._id);
                  }}
                >
                  {' '}
                  <a href="#modifPost">Modifier</a>{' '}
                </button>
              ) : null}
              <LikePost post={post} />
              {profil.name === post.author || profil.admin ? (
                <DeletePost post={post} />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default WorkTchat;
