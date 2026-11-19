import { createRemoteJWKSet, jwtVerify, importJWK } from "jose";
import { getDB } from "../config/db.js";

let JWKS = null;
let currentClientUrl = null;

function getJWKS() {
  const rawClientUrl = process.env.CLIENT_URL || "http://localhost:3000";
  const clientUrl = rawClientUrl.replace(/\/+$/, "");

  if (!JWKS || currentClientUrl !== clientUrl) {
    currentClientUrl = clientUrl;
    const jwksUrl = `${clientUrl}/api/auth/jwks`;
    JWKS = createRemoteJWKSet(new URL(jwksUrl));
  }
  return JWKS;
}

function formatPayload(payload) {
  return {
    id: payload.id || payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role || "Customer",
    ...payload,
  };
}

/**
 * Challenge 2 Requirement: verifyToken middleware
 * Verifies JWT token from Authorization: Bearer <token> using JOSE against Next.js Better Auth JWKS endpoint.
 * Features triple-layer fallback:
 * 1. Strict issuer & audience check against remote JWKS
 * 2. Permissive signature check against remote JWKS
 * 3. Local database fallback directly reading Better Auth's "jwks" collection from MongoDB (zero 504 timeouts)
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
  const rawClientUrl = process.env.CLIENT_URL || "http://localhost:3000";
  const clientUrl = rawClientUrl.replace(/\/+$/, "");

  // Layer 1: Strict verification with issuer & audience
  try {
    const { payload } = await jwtVerify(token, getJWKS(), {
      issuer: clientUrl,
      audience: clientUrl,
    });
    req.user = formatPayload(payload);
    return next();
  } catch (strictErr) {
    // Layer 2: Permissive verification without issuer/audience constraints
    try {
      const { payload } = await jwtVerify(token, getJWKS());
      req.user = formatPayload(payload);
      return next();
    } catch (fallbackRemoteErr) {
      // Layer 3: Database direct JWKS fallback (critical for Vercel cold starts / network limits)
      try {
        const db = getDB();
        const jwksRecord = await db.collection("jwks").findOne({}, { sort: { createdAt: -1 } });
        if (jwksRecord?.publicKey) {
          const keyData =
            typeof jwksRecord.publicKey === "string"
              ? JSON.parse(jwksRecord.publicKey)
              : jwksRecord.publicKey;
          const publicKey = await importJWK(keyData, keyData.alg || "RS256");
          const { payload } = await jwtVerify(token, publicKey);
          req.user = formatPayload(payload);
          return next();
        }
      } catch (dbFallbackErr) {
        console.warn("[Auth Middleware] Database JWKS fallback notice:", dbFallbackErr.message);
      }

      // Reset cached JWKS instance in case client endpoint changed or was temporarily unreachable
      JWKS = null;

      console.error("[Auth Middleware] JWT verification failed:", fallbackRemoteErr.message);
      return res.status(401).json({
        success: false,
        message: "Invalid, expired, or unverified JWT token",
        error: fallbackRemoteErr.message,
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
