import type { IconType } from "react-icons";
import { LuKeyRound, LuLaptop, LuMoon, LuShieldCheck, LuSun } from "react-icons/lu";

import { Theme } from "@/components/theme";
import type { NavItem } from "@/components/ui/sidebar-nav-builder";

export interface ThemeOption {
  value: Theme;
  Icon: IconType;
}

export const themeOptions: readonly ThemeOption[] = [
  { value: "system", Icon: LuLaptop },
  { value: "light", Icon: LuSun },
  { value: "dark", Icon: LuMoon },
];

export const navigation: readonly NavItem[] = [
  {
    type: "group",
    name: "navigation.playground",
    items: [
      {
        type: "menu",
        name: "navigation.auth",
        icon: LuKeyRound,
        items: [
          {
            type: "link",
            name: "navigation.sign-in",
            link: "/santin/login",
          },
        ],
      },

      {
        type: "menu",
        name: "navigation.admin",
        icon: LuShieldCheck,
        items: [
          {
            type: "link",
            name: "navigation.dashboard",
            link: "/admin/dashboard",
          },
        ],
      },
    ],
  },
];
