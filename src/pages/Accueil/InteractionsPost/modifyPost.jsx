import { useState, useEffect, useContext } from 'react';
import { IdContext } from '../../../utils/context';
import { apiBackend } from '../../../utils/api';

////  Modification d'un Post  //
function ModifyPost() {
  /////  Récupération du profil  //
  const profil = JSON.parse(sessionStorage.getItem('profil'));

  /////  Récupération de l'Id du post  //
  const { idPost, setIdPost } = useContext(IdContext);

  /////  Gestion text  //
  const [text, setText] = useState();

  ////   Gestion fichier image  //
  const [file, setFile] = useState();

  ////   Création du FormData  //
  const data = new FormData();
  data.append('text', text);
  data.append('fileImage', file);
  data.append('admin', profil.admin);

  ////  Récupération de l'api du post cible  //
  useEffect(() => {
    fetch(`${apiBackend}/api/posts/${idPost}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${profil.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())

      .then((resJson) => setText(resJson.text))

      .catch((error) => console.log(error));
  }, [idPost, profil.token]);

  ////  Envoi de la demande de modification du post  //
  const ModifyOnePost = () => {
    fetch(`${apiBackend}/api/posts/${idPost}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${profil.token}` },
      body: data,
    })
      .then((res) => res.json())

      .then((resJson) => window.location.reload())

      .catch((error) => console.log(error));
  };

  ////  Formulaire de modification du post  //
  return (
    <form id="modifPost">
      <label htmlFor="modifPostPicture">Ajouter / Modifier l'image</label>
      <br />
      <input
        type="file"
        accept="image/*"
        name="modifPostPicture"
        id="modifPostPicture"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />

      <label htmlFor="modifPostContenu">Contenu*</label>
      <br />
      <textarea
        name="modifPostContenu"
        id="modifPostContenu"
        placeholder="écrivez votre message"
        onChange={(e) => setText(e.target.value)}
        value={text || ''}
      ></textarea>

      <br />

      <div id="modifPostInteractions">
        {text === '' || text === undefined ? (
          <button id="modifPostInteractionsSubmitInvalid" type="button">
            Modifier le post
          </button>
        ) : (
          <button
            id="modifPostInteractionsSubmit"
            type="button"
            onClick={() => {
              ModifyOnePost();
            }}
          >
            Modifier le post
          </button>
        )}
        <button
          id="modifPostInteractionsNull"
          type="button"
          onClick={() => {
            setIdPost(null);
          }}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

export default ModifyPost;
