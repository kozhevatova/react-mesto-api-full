import FormValidator from '../components/FormValidator';
import { validationConfig } from './constants';

// включить валидацию формы
const validateForm = (form) => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
  return formValidator;
};

export { validateForm };