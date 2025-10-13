// errorMetadata.ts
export const ERROR_METADATA = {
  400: { def: "Bad Request", name: "BadRequestError" },
  401: { def: "Unauthorized", name: "UnauthorizedError" },
  403: { def: "Forbidden", name: "ForbiddenError" },
  404: { def: "Not Found", name: "NotFoundError" },
  409: { def: "Conflict", name: "ConflictError" },
  422: { def: "Unprocessable Entity", name: "UnprocessableContentError" },
};
