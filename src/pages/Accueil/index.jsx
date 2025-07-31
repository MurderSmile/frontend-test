import { useContext } from 'react';
import { IdContext } from '../../utils/context';
import '../../utils/styles/css/index.css';

import NewPost from './newPost'
import ModifyPost from './InteractionsPost/modifyPost';
import WorkTchat from './workTchat';

////  Génération de l'Accueil  //
function Accueil() {
  const {idPost} = useContext(IdContext)

  return (
    <section id="accueil">

      {idPost ? <ModifyPost /> : <NewPost />}
      <WorkTchat />
      
    </section>
  );
}

export default Accueil;