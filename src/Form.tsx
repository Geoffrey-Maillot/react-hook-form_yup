import { useState } from 'react';
import logo from './logo.svg';
import './Form.scss';

// Import MUI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// React icon
import { BiHide } from 'react-icons/bi';
import { BiShow } from 'react-icons/bi';

// Import hook form
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import YupPassword from 'yup-password';

YupPassword(yup);

interface Inputs {
  lastName: string;
  firstName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  adress: string;
  zipCode: number;
  city: string;
  termsOfUse: boolean;
}

const schema = yup.object({
  lastName: yup
    .string()
    .min(2, 'Il doit y avoir au moins deux lettres')
    .required('Ce champ est obligatoire'),
  firstName: yup
    .string()
    .min(2, 'Il doit y avoir au moins deux lettres')
    .required('Ce champ est obligatoire'),
  email: yup
    .string()
    .email('Veuillez rentrer une adresse email valide')
    .required('Ce champ est obligatoire'),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref('email')], 'Les emails doivent correspondrent ')
    .required('Ce champ est obligatoire'),
  password: yup
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractère')
    .minLowercase(1, 'Le mot de passe doit contenir au moins une minuscule') //yup-password
    .minUppercase(1, 'Le mot de passe doit contenir au moins une majuscule') //yup-password
    .minNumbers(1, 'Le mot de passe doit contenir au moins un nombre') //yup-password
    .minSymbols(
      1,
      'Le mot de passe doit contenir au moins un caractère spécial'
    ) //yup-password
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Les mots de passe doivent correcpondre')
    .required('Ce champ est obligatoire'),
  adress: yup.string().required('Ce champ est obligatoire'),
  zipCode: yup
    .string()
    .length(5, 'Le code postal doit contenir 5 chiffres')
    .matches(/^[0-9]+$/, 'Le code postal ne peu contenir que des chiffres')

    .required('Ce champ est obligatoire'),
  city: yup.string().required('Ce champ est obligatoire'),
  termsOfUse: yup
    .bool()
    .oneOf([true], "Veuillez accepter les conditions d'utilisation")
    .required('Ce champ est obligatoire'),
});

function App() {
  const [passwordIsVisible, togglePasswordIsVisible] = useState<boolean>(false);
  const [confirmPasswordIsVisible, toggleConfirmPasswordIsVisible] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const wait = function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Success'), 1000);
    });
  };

  const onSubmit = async (data: Inputs) => {
    console.log(data);
    console.log(formState);

    // On pourrais récupérer isSubmitSuccessful dans le .then() et faire une redirection si c'est true
    await wait();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          fullWidth
          label="Votre nom"
          {...register('lastName')}
        />
        <TextField
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          fullWidth
          label="Votre Prénom"
          {...register('firstName')}
        />
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          label="Votre Email"
          {...register('email')}
        />
        <TextField
          error={!!errors.confirmEmail}
          helperText={errors.confirmEmail?.message}
          fullWidth
          label="Confirmer l'email"
          {...register('confirmEmail')}
        />
        <span className="wrap-input">
          <TextField
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            label="Mot de passe"
            {...register('password')}
            type={passwordIsVisible ? 'text' : 'password'}
          />
          <button
            className="buttonPassword"
            type="button"
            onClick={() =>
              togglePasswordIsVisible((passwordIsVisible) => !passwordIsVisible)
            }
          >
            {passwordIsVisible ? (
              <BiHide size={'1.4rem'} />
            ) : (
              <BiShow size={'1.4rem'} />
            )}
          </button>
        </span>
        <span className="wrap-input">
          <TextField
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
            label="Confirmer le mot de passe"
            {...register('confirmPassword')}
            type={confirmPasswordIsVisible ? 'text' : 'password'}
          />
          <button
            className="buttonPassword"
            type="button"
            onClick={() =>
              toggleConfirmPasswordIsVisible(
                (confirmPasswordIsVisible) => !confirmPasswordIsVisible
              )
            }
          >
            {confirmPasswordIsVisible ? (
              <BiHide size={'1.4rem'} />
            ) : (
              <BiShow size={'1.4rem'} />
            )}
          </button>
        </span>
        <TextField
          error={!!errors.adress}
          helperText={errors.adress?.message}
          fullWidth
          label="Adresse"
          {...register('adress')}
        />
        <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          error={!!errors.zipCode}
          helperText={errors.zipCode?.message}
          fullWidth
          label="Code Postal"
          {...register('zipCode')}
        />
        <TextField
          error={!!errors.city}
          helperText={errors.city?.message}
          fullWidth
          label="Ville"
          {...register('city')}
        />

        <div className="checkbox">
          <FormControlLabel
            control={<Checkbox defaultChecked {...register('termsOfUse')} />}
            label="J'accepte les conditions d'utilisation"
          />

          {!!errors.termsOfUse && (
            <p style={{ color: 'red' }}>{errors.termsOfUse.message}</p>
          )}
        </div>

        <Button
          className="send"
          size="large"
          color="primary"
          variant="contained"
          type="submit"
          disabled={isSubmitting}
        >
          Envoyer
        </Button>
        {isSubmitSuccessful && (
          <p className="messageSuccess">Le formulaire a bien été soumis</p>
        )}
      </form>
    </div>
  );
}

export default App;
