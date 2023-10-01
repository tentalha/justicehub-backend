export const R2XX = (res, code, result, message, payload) => {
  return res.status(code).json({
    result: result || "SUCCESS",
    message: message || "Successful Response",
    payload: payload || null,
  });
};
