import { atom } from 'recoil';

export type User = {
  username: string;
};
export type UserSession = {
  createdAt: Date;
  expiresAt: Date;
  user: User;
};

const userSessionAtom = atom<UserSession | null>({
  default: null,
  key: 'userSession',
});

export default userSessionAtom;
