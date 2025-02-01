import { Link ,useRouteError} from 'react-router';


function ErrorElement() {
    const error = useRouteError();
    console.error(error);


  return (
    <div>
      <h1>Oups ! Quelque chose s'est mal passé.</h1>
      <p>{error?.message}</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}

export default ErrorElement;
