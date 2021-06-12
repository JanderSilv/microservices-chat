import UsersService from '#root/adapters/UsersService';

interface Args {
  username: string;
}

const showUserResolver = async (obj: any, args: Args) => {
  const { username } = args;
  const user = await UsersService.show({
    username,
  });
  return user;
};

export default showUserResolver;
