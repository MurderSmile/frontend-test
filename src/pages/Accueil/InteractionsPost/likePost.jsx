import { useState } from 'react';
import { apiBackend } from '../../../utils/api';

////  Génération du système de like  //
function LikePost(props) {
  const profil = JSON.parse(sessionStorage.getItem('profil'));

  ////  Vérification que la personne à déja liker  //
  const userLiked = props.post.usersLiked.includes(profil.userId);

  const [likes, setLikes] = useState(props.post.likes);
  const [like, setLike] = useState(userLiked ? 0 : 1);

  ////  Envoi de la demande de like pour le post  //
  const likeOnePost = () => {
    return fetch(`${apiBackend}/api/posts/${props.post._id}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${profil.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ like }),
    })
      .then((res) => res.json())

      .then((resJson) => {
        setLike(like === 1 ? 0 : 1);
        setLikes(like === 1 ? likes + 1 : likes - 1);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  ////  Génération du bouton 'Like'  //
  return (
    <button
      onClick={() => {
        likeOnePost();
      }}
    >
      {likes}{' '}
      {like === 1 ? (
        <i className="far fa-heart"></i>
      ) : (
        <i className="fas fa-heart"></i>
      )}
    </button>
  );
}

export default LikePost;
