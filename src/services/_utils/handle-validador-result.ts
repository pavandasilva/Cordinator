import Joi from 'joi';
import { Either, failure, success } from "../../core/either";

export default function <T>(result: Joi.ValidationResult<T>): Either<Error, T> {
  if(result.error){
    const error = new Error(result.error.message);
    return failure(error);
  }
  
  return success(result.value);
}


