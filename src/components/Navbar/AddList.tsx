import { Button, Modal, NavLink, Paper, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCirclePlus } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "~/utils/api";

export default function AddList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const utils = api.useContext();
  const { mutate } = api.list.createList.useMutation({
    onSuccess() {
      close();
      utils.list.getAll.invalidate();
      toast.success("List created");
    },
    onError() {
      toast.error("There was an error creating list");
    },
  });

  function createList() {
    mutate({
      name,
    });
  }

  return (
    <>
      <NavLink icon={<IconCirclePlus />} label="Create List" onClick={open} />
      <Modal opened={opened} onClose={close} title="Add List" centered>
        <Paper>
          <Stack>
            <TextInput
              placeholder="List Name"
              label="List Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button color="blue" onClick={() => createList()}>
              Create List
            </Button>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
}
