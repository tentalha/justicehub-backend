export const R4XX = (res, code, errType, message, payload) => {
  res.status(code).json({
    result: "ERROR",
    errType: errType || "4XX-TYPE",
    message: message || "4XX-MESSAGE",
    payload: payload || null,
  });
};
