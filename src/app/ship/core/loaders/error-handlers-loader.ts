import type { Express, Request, Response, NextFunction } from 'express';
import { APP_ENV } from '@configs/app';
import CoreError from '@ship/core/errors/core-error';
import HttpError from '@ship/core/errors/http-error';

function isApiRequest(req: Request): boolean {
  const accept = req.headers.accept ?? '';

  return accept.toLowerCase().includes('application/json');
}

function commonErrorHandler(err: CoreError | Error, req: Request, res: Response, next: NextFunction) {
 
  if (res.headersSent) {
    return next(err);
  }

  const status = (err instanceof CoreError && err.statusCode) ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  if (!(err instanceof HttpError)) {
    console.error('❌ [Error Handler]', {
      path: req.path,
      method: req.method,
      status,
      message,
      stack: APP_ENV !== 'production' ? err.stack : undefined,
    });
  }

  if (isApiRequest(req)) {
    return res.status(status).json({
        statusCode: status,
        message,
        ...(
            APP_ENV !== 'production'
              ? { stack: err.stack?.split('\n').slice(0, 5) }
              : {}
        ),
    });
  }

  const html = `
    <html>
      <head><title>${status} ${message}</title></head>
      <body style="font-family: sans-serif; padding: 40px;">
        <h1>${status} - ${message}</h1>
        ${
          process.env.NODE_ENV !== 'production' && err.stack
            ? `<pre style="background:#eee; padding:10px; border-radius:8px;">${err.stack}</pre>`
            : ''
        }
      </body>
    </html>
  `;
  res.status(status).send(html);
}

export function errorHandlersLoader(app: Express) {
    app.use(commonErrorHandler);
}