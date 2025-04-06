import mongoose from 'mongoose';
import app from './app';
import config from '../config';

const seedAdmin = () => {};

async function main() {
  try {
    const connection = await mongoose.connect(config.database_url!);
    if (connection) {
      console.info('Database connection established');
    } else {
      console.error('DB connection failed');
    }
    seedAdmin();

    app.listen(config.port, () => {
      console.info(`app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
