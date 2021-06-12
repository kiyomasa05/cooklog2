import { useContext } from 'react';

import {LoginUserContext} from './providers/LoginUserProvider'

export const useLoginUser = () =>
  useContext(LoginUserContext);
