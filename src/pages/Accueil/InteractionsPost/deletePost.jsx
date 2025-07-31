import { apiBackend } from '../../../utils/api';

////  suppréssion d'un post  //
function DeletePost(props) {
  const profil = JSON.parse(sessionStorage.getItem('profil'));

  ////  Envoi de la demande suppréssion  //
  const supprim = () => {
    fetch(`${apiBackend}/api/posts/${props.post._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${profil.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ admin: profil.admin }),
    })
      .then((res) => res.json())

      .then((resJson) => {
        alert(resJson.message);
        window.location.reload();
      })

      .catch((error) => {
        console.log(error);
      });
  };

  ////  Génération du bouton 'supprimer'  //
  return (
    <button
      onClick={() => {
        supprim();
      }}
    >
      Supprimer
    </button>
  );
}

export default DeletePost;
