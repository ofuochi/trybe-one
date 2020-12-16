import React from "react";
import { DrawerHeader } from "../DrawerHeader";
import { SideNavbar } from "../SideNavbar";

export const Menu = () => {
  return (
    <aside className="mdc-drawer mdc-drawer--dismissible mdc-drawer--open">
      <DrawerHeader />
      <SideNavbar />
    </aside>
  );
};
