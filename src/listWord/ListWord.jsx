
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


import { userActions } from '_store';

export { ListWord };

function ListWord() {
  const dispatch = useDispatch();


  useEffect(() => {
        dispatch(userActions.getWords());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
      <div>
          <h1>Lista de palabras guardadas!</h1>
      </div>
  );

}