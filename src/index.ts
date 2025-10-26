require('dotenv').config();
require('module-alias/register');
import 'reflect-metadata';
import App from '@ship/core/foundation/app';

App.init().then((app) => {
  const port = process.env.APP_PORT || 8080;

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
