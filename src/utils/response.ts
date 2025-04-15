import { Response } from 'express';

interface BaseResponse {
  code: number;
  data: any;
  message: string;
  error?: string;
}

export const jsonResponse = (
  res: Response,
  code: number,
  data: any,
  message: string,
  err?: Error
) => {
  const response: BaseResponse = {
    code,
    data,
    message: err ? `${message} | ${err.message}` : message
  };

  if (err) {
    response.error = err.message;
    // Log error jika diperlukan
    console.error(`[ERROR] ${message}`, err);
  }

  res.status(code).json(response);
};

// Predefined responses
export const Responses = {
  // Success Responses
  SuccessCreate: (res: Response, data: any) => 
    jsonResponse(res, 201, data, 'Data created successfully'),
  
  SuccessRead: (res: Response, data: any) => 
    jsonResponse(res, 200, data, 'Data retrieved successfully'),
  
  SuccessUpdate: (res: Response, data: any) => 
    jsonResponse(res, 200, data, 'Data updated successfully'),
  
  SuccessDelete: (res: Response, data: any) => 
    jsonResponse(res, 200, data, 'Data deleted successfully'),

  // Error Responses
  ErrorBadRequest: (res: Response, err: Error) => 
    jsonResponse(res, 400, null, 'Bad request', err),
  
  ErrorUnauthorized: (res: Response, err: Error) => 
    jsonResponse(res, 401, null, 'Unauthorized', err),
  
  ErrorNotFound: (res: Response, err: Error) => 
    jsonResponse(res, 404, null, 'Data not found', err),
  
  ErrorConflict: (res: Response, err: Error) => 
    jsonResponse(res, 409, null, 'Data conflict', err),
  
  ErrorInternal: (res: Response, err: Error) => 
    jsonResponse(res, 500, null, 'Internal server error', err)
};