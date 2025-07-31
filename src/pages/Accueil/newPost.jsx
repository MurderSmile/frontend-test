import { useState } from 'react';
import { apiBackend } from '../../utils/api';

////  Création et envoi d'un post  //
function NewPost() {
  /////  Récupération du profil   //
  const profil = JSON.parse(sessionStorage.getItem('profil'));

  /////  Gestion text  //
  const [text, setText] = useState();

  ////   Gestion fichier image //
  const [file, setFile] = useState();

  ////   Gestion Date  //
  const date = new Date().toLocaleDateString();

  ////   Gestion Heure  //
  const time = new Date().toLocaleTimeString();

  ////   Création du FormData  //
  const data = new FormData();
  data.append('author', profil.name);
  data.append('text', text);
  data.append('fileImage', file);
  data.append('date', date);
  data.append('time', time);

  ////  Envoi du post  //
  const CreatePost = () => {
    fetch(`${apiBackend}/api/posts/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${profil.token}` },
      body: data,
    })
      .then((res) => res.json())

      .then((resJson) => window.location.reload())

      .catch((error) => console.log(error));
  };

  ////  Réinitialisation du Formulaire d'envoi  //
  const Reinitialiser = () => {
    setFile(undefined);
    document.getElementById('createPostPicture').value = null;

    setText(undefined);
    document.getElementById('createPostContenu').value = null;
  };

  ////  Formulaire d'ajout' du post  //
  return (
    <form id="createPost">
      <label htmlFor="createPostPicture">Ajouter une Image</label>
      <br />
      <input
        type="file"
        accept="image/*"
        name="createPostPicture"
        id="createPostPicture"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />

      <label htmlFor="createPostContenu">Contenu*</label>
      <br />
      <textarea
        name="createPostContenu"
        id="createPostContenu"
        placeholder="écrivez votre message"
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <br />

      <div id="createPostInteractions">
        {text === '' || text === undefined ? (
          <button id="createPostInteractionsSubmitInvalid" type="button">
            Envoyer le post
          </button>
        ) : (
          <button
            id="createPostInteractionsSubmit"
            type="button"
            onClick={() => {
              CreatePost();
            }}
          >
            Envoyer le post
          </button>
        )}
        <button
          id="createPostInteractionsNull"
          type="button"
          onClick={() => {
            Reinitialiser();
          }}
        >
          Réinitialiser
        </button>
      </div>
    </form>
  );
}

export default NewPost;
