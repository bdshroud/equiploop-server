export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required before checking permissions",
      });
    }

    const userRole = req.user.role || "Customer";
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires one of role(s): [${allowedRoles.join(", ")}]. Current role: "${userRole}"`,
      });
    }

    next();
  };
}
