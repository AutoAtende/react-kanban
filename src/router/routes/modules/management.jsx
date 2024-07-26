import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

const UserPage = lazy(() => import(`@/pages/management/system/user`));
const RolePage = lazy(() => import(`@/pages/management/role`));

const management = {
  order: 2,
  path: "management",
  roles: ["ADMIN"],
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "sys.menu.management",
    icon: (
      <SvgIcon icon="ic-management" className="ant-menu-item-icon" size="24" />
    ),
    key: "/management",
  },
  children: [
    {
      index: true,
      roles: ["ADMIN", "USER"],
      element: <Navigate to="user" replace />,
    },
    {
      path: "role",
      element: <RolePage />,
      roles: ["ADMIN"],
      meta: {
        label: "sys.menu.system.role",
        key: "/management/role",
      },
    },
    {
      path: "user",
      element: <UserPage />,
      roles: ["ADMIN"],
      meta: { label: "sys.menu.system.user", key: "/management/user" },
    },
  ],
};

export default management;
