// infrastructure/http/middlewares/validate.middleware.ts
import { ZodSchema } from "zod";
import { Req ,Res,Next} from "../../../types/http";
import { ValidationError } from "../../../utils/error";

export const validate =
  (schema: ZodSchema) =>
  (req:Req, res:Res, next:Next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new ValidationError(result.error.issues.map((issue:any) => issue.message).join(", ")));
    }
    req.body = result.data;
    next();
  };