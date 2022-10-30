import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri:
    process.env.NODE_ENV === 'development'
      ? process.env.MONGO_LOCAL
      : process.env.MONGO_REMOTE,
}));
