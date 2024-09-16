import React from "react";
import useRole from "../../hooks/useRole";

export default function PermissionsGate({
    children,
    allowedRoles = []
}) {
    const role = useRole();

    if (!allowedRoles.includes(role)) return <>Forbidden. Access denied.</>;

    return <>{children}</>;
}
