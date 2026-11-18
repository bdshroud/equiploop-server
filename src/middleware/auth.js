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

/**
 * Challenge 2 Requirement: verifyToken middleware
 * Verifies JWT token from Authorization: Bearer <token> using JOSE against Next.js Better Auth JWKS endpoint
 */
export async function verifyToken(req, res, next) {
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

// Alias for verifyToken
export const verifyAuth = verifyToken;

/**
 * Challenge 2: verifyRenter (Customer or higher)
 */
export function verifyRenter(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }
  const role = req.user.role || "Customer";
  if (!["Customer", "Owner", "Admin"].includes(role)) {
    return res.status(403).json({ success: false, message: "Renter/Customer access required" });
  }
  next();
}

/**
 * Challenge 2: verifyOwner (Owner or Admin)
 */
export function verifyOwner(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }
  const role = req.user.role || "Customer";
  if (!["Owner", "Admin"].includes(role)) {
    return res.status(403).json({ success: false, message: "Owner role required for this action" });
  }
  next();
}

/**
 * Challenge 2: verifyAdmin (Admin only)
 */
export function verifyAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }
  const role = req.user.role || "Customer";
  if (role !== "Admin") {
    return res.status(403).json({ success: false, message: "Admin privileges required" });
  }
  next();
}

/**
 * Optional authentication middleware for public routes with personalized data
 */
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
