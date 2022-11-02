import { history } from '_helpers';

export { Home };

function Home() {

  const redirect = () => { history.navigate('/saveWord') };
   const getWords = () => { history.navigate('/listWord') };
    return (
        <div>
            <h1>Hola!</h1>
            <p>Seleccione una de las siguientes acciones</p>

            <ul>
              <li key="translate" onClick={redirect} className='buttonList'>Guardar palabra</li>
              <li key="history" onClick={getWords} className='buttonList'>Historal de palabras</li>

            </ul>
        </div>
    );
}
