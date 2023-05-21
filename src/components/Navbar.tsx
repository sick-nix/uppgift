import { Loader, Navbar as MantineNavbar, NavLink } from "@mantine/core";
import { IconCircleFilled, IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";
import { ReactNode } from "react";
import { api } from "~/utils/api";
import AddList from "./Navbar/AddList";

interface MenuItemProps {
  href: string;
  icon: ReactNode;
  label: string;
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <Link href={props.href}>
      <NavLink label={props.label} icon={props.icon} />
    </Link>
  );
};

export default function Navbar() {
  const { data: lists, isLoading } = api.list.getAll.useQuery();

  return (
    <MantineNavbar width={{ base: 300 }} p="xs">
      <MenuItem
        href="/list/starred"
        icon={<IconStarFilled size={20} />}
        label="Starred"
      />
      {isLoading ? (
        <div className="px-3 pb-2 pt-4">
          <Loader size="sm" className="" />
        </div>
      ) : (
        lists?.map((list) => (
          <MenuItem
            label={list.name}
            icon={<IconCircleFilled />}
            key={list.id}
            href={`/list/${list.id}`}
          />
        ))
      )}
      <AddList />
    </MantineNavbar>
  );
}
