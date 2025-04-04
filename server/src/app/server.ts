import mongoose from 'mongoose';
import app from './app';

const config={
    database_url:"",
    port:''
}

const seedAdmin=() =>{


  // import config from '../config';
// import { USER_ROLE, UserStatus } from '../constants';
// import { User } from '../modules/Customer/user.model';

// const superUser = {
//   // id: '0001',
//   email: config.super_admin_email,
//   password: config.super_admin_password,
//   role: USER_ROLE.superAdmin,
// };

// const seedSuperAdmin = async () => {
//   const isSuperAdminExists = await User.findOne({
//     role: USER_ROLE.superAdmin,
//   });

//   if (!isSuperAdminExists) {
//     await User.create(superUser);
//   }
// };



}

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
