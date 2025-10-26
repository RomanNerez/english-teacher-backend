import type { Express } from 'express';
import glob from 'glob';
import path from 'path';
import { ROUTES_PATH } from '@configs/paths';

function parseRoutePath(filePath: string): {type: string, version: string} {
  const parts = filePath.split(path.sep);

  const containersIndex = parts.indexOf('containers');

  if (containersIndex === -1) throw new Error('Not a container route');

  const [,,, type] = parts.slice(containersIndex + 1);

  const filename = path.basename(filePath, path.extname(filePath));
  const [, version] = filename.split('.');

  return {
    type,
    version,
  };
}

export async function apiRoutesLoader(app: Express) {
    const routes = glob.sync(ROUTES_PATH);

    for (const file of routes) {
        const {type, version} = parseRoutePath(file);
        const routeModule = await require(file);
        
        const basePath = `/${type}/${version}`;
        app.use(basePath, routeModule);
    }
}