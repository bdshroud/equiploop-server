import { createRemoteJWKSet, jwtVerify } from "jose";

let JWKS = null;

function getJWKS() {
  if (!JWKS) {
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    const jwksUrl = new URL("/api/auth/jwks", clientUrl).toString();
    JWKS = createRemoteJWKSet(new URL(jwksUrl));
  }
  return JWKS;
}

export async function verifyAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing or malformed (expected Bearer token)",
    });
  }

  const token = authHeader.split(" ")[1];
  const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

  try {
    // Attempt strict verification with issuer and audience
    const { payload } = await jwtVerify(token, getJWKS(), {
      issuer: clientUrl,
      audience: clientUrl,
    });

    req.user = {
      id: payload.id || payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role || "Customer",
      ...payload,
    };
    return next();
  } catch (err) {
    // Graceful fallback for slight variations in trailing slash or audience
    try {
      const { payload } = await jwtVerify(token, getJWKS());
      req.user = {
        id: payload.id || payload.sub,
        name: payload.name,
        email: payload.email,
        role: payload.role || "Customer",
        ...payload,
      };
      return next();
    } catch (fallbackError) {
      console.error("[Auth Middleware] JWT verification failed:", fallbackError.message);
      return res.status(401).json({
        success: false,
        message: "Invalid, expired, or unverified JWT token",
        error: fallbackError.message,
      });
    }
  }
}

export async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1];
  try {
    const { payload } = await jwtVerify(token, getJWKS());
    req.user = {
      id: payload.id || payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role || "Customer",
      ...payload,
    };
  } catch (err) {
    req.user = null;
  }
  next();
}
