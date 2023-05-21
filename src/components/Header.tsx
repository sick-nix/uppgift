import { Avatar, Menu, UnstyledButton } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { getInitials } from "~/helper/util";
import { Header as MantineHeader } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { forwardRef } from "react";

const AvatarButton = forwardRef<HTMLButtonElement>((params, ref) => {
  const session = useSession();
  return (
    <UnstyledButton
      sx={() => ({
        display: "block",
        marginLeft: "auto",
      })}
      ref={ref}
      {...params}
    >
      {session.data?.user ? (
        <Avatar src={session.data.user.image} alt="it's me" />
      ) : (
        <Avatar>{getInitials(session.data?.user.name || "")}</Avatar>
      )}
    </UnstyledButton>
  );
});

export default function Header() {
  const session = useSession();
  return (
    <MantineHeader height={60} p="xs">
      <Menu shadow="md" width={200} withArrow>
        <Menu.Target>
          <AvatarButton />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{session.data?.user.name}</Menu.Label>
          <Menu.Label>{session.data?.user.email}</Menu.Label>
          <Menu.Item
            color="red"
            icon={<IconLogout size={14} />}
            onClick={() => signOut()}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </MantineHeader>
  );
}
