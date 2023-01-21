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
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z
  .object({
    name: z.object({
      lastName: z
        .string()
        .min(1, { message: 'Le nom est obligatoire' })
        .min(2, { message: 'Le nom doit contenir au moins 2 letttres' }),
      firstName: z
        .string()
        .min(1, { message: 'Le prénom est obligatoire' })
        .min(2, { message: 'Le nom doit contenir au moins 2 letttres' }),
    }),
    email: z
      .string()
      .min(1, { message: "L'Email est obligatoire" })
      .email({ message: 'Veuillez rentrer un email valide' }),
    confirmEmail: z.string(),
    password: z.string().min(6, {
      message: 'Le mot de passe doit contenir au moins 6 caractère',
    }),
    confirmPassword: z.string(),
    adress: z.string().min(1, { message: 'Ce champ est obligatoire' }),
    zipCode: z.coerce
      .number({ errorMap: () => ({ message: 'Entrer un code postal valide' }) })
      .refine((n) => n.toString().length === 5, {
        message: 'Entrer un code postal valide',
      })
      .transform((zip) => Number(zip)),
    city: z.string().min(1, { message: 'Ce champ est obligatoire' }),
    termsOfUse: z.literal(true, {
      errorMap: () => ({
        message: 'Vous deveez accepter les termes avant de continuer',
      }),
    }),
  })
  .refine((form) => form.email === form.confirmEmail, {
    path: ['confirmEmail'],
    message: 'Les emails doivent correspondrent',
  })
  .refine((form) => form.password === form.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Les mots de passe doivent coorespondrent',
  });

interface Inputs {
  name: {
    lastName: string;
    firstName: string;
  };
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  adress: string;
  zipCode: number;
  city: string;
  termsOfUse: boolean;
}

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
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  const wait = function () {
    return new Promise((resolve) => {
      setTimeout(() => resolve('Success'), 1000);
    });
  };

  const onSubmit = async (data: Inputs) => {
    console.log(data);
    console.log(formState);
    await wait();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={!!errors.name?.lastName?.message}
          helperText={errors.name?.lastName?.message}
          fullWidth
          label="Votre nom"
          {...register('name.lastName')}
        />
        <TextField
          error={!!errors.name?.firstName?.message}
          helperText={errors.name?.firstName?.message}
          fullWidth
          label="Votre Prénom"
          {...register('name.firstName')}
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
