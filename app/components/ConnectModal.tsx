import { Dialog } from "@headlessui/react";
import { Add } from "@mui/icons-material";
import {
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
} from "@mui/joy";
import React, { useState } from "react";
import { AuthType, createClient } from "webdav";

function ConnectModal() {
  // const client = createClient("https://dav.jianguoyun.com/dav/", {
  //     authType: AuthType.Password,
  //     username: "zhaotianxion@qq.com",
  //     password: "accgityf8g8r8juf",
  //   });
  //   const getDirectoryItems = async () => {
  //     const directoryItems = await client.getDirectoryContents("/");
  //     console.log(directoryItems, "directoryItems");
  //   };
  //   const dItems = getDirectoryItems();
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div>
      <React.Fragment>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >
          New project
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} disablePortal>
          <ModalDialog>
            <DialogTitle>Create new project</DialogTitle>
            <DialogContent>
              Fill in the information of the project.
            </DialogContent>
            <form
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input autoFocus required />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input required />
                </FormControl>
                <Button variant="outlined" color="primary" type="submit">
                  Submit
                </Button>
                {/* <Button>Submit</Button> */}
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </div>
  );
}

export default ConnectModal;
