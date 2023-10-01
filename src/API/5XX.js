export const R5XX = (res, code, errType, message, payload) => {
    res.status(code).json({
      result: "ERROR",
      errType: errType || "INTERNAL-SERVER-ERROR",
      message: message || "Something Went Wrong",
      payload: payload || null,
    });
  };