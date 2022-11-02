
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { userActions } from '_store';

export { SaveWord };

function SaveWord() {
  const dispatch = useDispatch();

  // form validation rules
  const validationSchema = Yup.object().shape({
      word: Yup.string().required('Text is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  function onSubmit({ word }) {
    return dispatch(userActions.saveWord({word}));
  }

  return (
      <div>
          <h1>Ingrese la palabra que desea guardar!</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <input type="text" name="word" {...register('word')}/>
            </label>
            <input type="submit" value="Submit" />
          </form>
      </div>
  );

}