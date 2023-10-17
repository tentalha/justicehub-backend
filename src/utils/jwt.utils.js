import jwt from "jsonwebtoken";
import { ACCESS_PRIVATE_KEY, ACCESS_PUB_KEY } from "../configs";

// ------------------------------------------------------------------>>
export const issueJWT = (data, expiresIn, priv_key) => {
  expiresIn = expiresIn ? expiresIn : "1h";

  const payload = {
    sub: data?._id,
    role: data?.role,
  };

  let accessToken = jwt.sign(
    payload,
    priv_key ? priv_key : ACCESS_PRIVATE_KEY,
    {
      expiresIn,
      algorithm: "RS256",
    }
  );

  return {
    jwtToken: accessToken,
    expiresIn,
  };
};

// -------------------------------------------------------------------->>

export const verifyToken = (token, ) => {
  return jwt.verify(
    token,
    ACCESS_PUB_KEY,
    { algorithms: ["RS256"] },
    (err, decoded) => {
      if (!err) {
        return decoded;
      }
      throw err;
    }
  );
};

// -------------------------------------------------------------------->>
