import React, { memo } from "react";
import { NavLink } from "react-router-dom";

export default memo(function CmsNavbarItem({ title, to }) {
    return (
        <li>
            <NavLink to={to} className="admin-panel__navbar-link">
                {title}
            </NavLink>
        </li>
    );
});
