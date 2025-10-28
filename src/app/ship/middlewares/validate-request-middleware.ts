import type { ZodType } from 'zod';
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import AbstractMiddleware from '@ship/core/middlewares/middleware';

type SchemaConfig = {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
  files?: ZodType;
};

export default class ValidateRequestMiddleware extends AbstractMiddleware {
    
    handler(schemas: SchemaConfig) {
        return async (req: Request, res: Response, next: NextFunction) => {
            let errors: Record<string, any> = {};

            if (schemas.body) {
                const result = await schemas.body.safeParseAsync(req.body || {});
                if (!result.success) errors = {...errors, ...z.flattenError(result.error).fieldErrors};
                else req.body = result.data;
            }

            if (schemas.query) {
                const result = await schemas.query.safeParseAsync(req.query);
                if (!result.success) errors = z.flattenError(result.error).fieldErrors;
            }

            if (schemas.params) {
                const result = await schemas.params.safeParseAsync(req.params || {});
                if (!result.success) errors = {...errors, ...z.flattenError(result.error).fieldErrors};
            }

            if (schemas.files && (req as any).files) {
                const result = await schemas.files.safeParseAsync((req as any).files);
                if (!result.success) errors.files = z.flattenError(result.error).fieldErrors;
            }

            if (Object.keys(errors).length > 0) {
                return res.status(422).json({
                    message: 'Validation failed',
                    errors,
                });
            }
            
            next();
        };
    }
}