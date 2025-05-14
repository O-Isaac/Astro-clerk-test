import IconMenuDeep from "@/icons/react/menu";
import { navigation } from "@/consts";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type React from "react";

interface NavbarDropdownProps {
  className?: string;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ className }) => {
  return (
    <Menu>
      <MenuButton>
        <IconMenuDeep className={className} />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 z-50 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
        {navigation.map((item) => (
          <MenuItem key={item.name}>
            <a href={item.href} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              {item.name}
            </a>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default NavbarDropdown;
