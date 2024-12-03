import { Response } from "express";
import { ServiceResponse } from "./serviceResponse.service";

export const handleServiceResponse = (
  serviceResponse: ServiceResponse<any>,
  response: Response
) => {
  return response.status(serviceResponse.code).send(serviceResponse);
};
