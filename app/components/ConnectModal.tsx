"use client";
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
import React from "react";
import { useForm } from "react-hook-form";
import { AuthType, createClient } from "webdav";
import useAddServerModal from "../store/useAddServerModal";
import useServerViewerStore from "../store/useServerViewerStore";
interface formData {
  url: string;
  username: string;
  password: string;
}
function ConnectModal() {
  const { open, setOpen } = useAddServerModal();
  const { addServerConfig } = useServerViewerStore();
  const { register, handleSubmit } = useForm<any>();

  const onSubmit = (data: formData) => {
    console.log(data);
    // const client = createClient(`https://${data.url}:80`, {
    //   authType: AuthType.Digest,
    //   username: data.username,
    //   password: data.password,
    // });
    // const getDirectoryItems = async () => {
    //   const directoryItems = await client.getDirectoryContents("/");
    //   console.log(directoryItems, "directoryItems");
    // };
    // const dItems = getDirectoryItems();
    // console.log(dItems, "dItems");
    addServerConfig({
      url: data.url,
      username: data.username,
      password: data.password,
    });
    setOpen(false);
  };

  // const client = createClient("https://dav.jianguoyun.com/dav/", {
  //   authType: AuthType.Password,
  //   username: "zhaotianxion@qq.com",
  //   password: "accgityf8g8r8juf",
  // });
  // const getDirectoryItems = async () => {
  //   const directoryItems = await client.getDirectoryContents("/");
  //   console.log(directoryItems, "directoryItems");
  // };
  // const dItems = getDirectoryItems();
  // console.log(dItems, "dItems");
  return (
    <div>
      <React.Fragment>
        <Modal open={open} onClose={() => setOpen(false)} disablePortal>
          <ModalDialog>
            <DialogTitle>Create new project</DialogTitle>
            <DialogContent>
              Fill in the information of the project.
            </DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>URL</FormLabel>
                  <Input autoFocus required {...register("url")} />
                </FormControl>

                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input required {...register("username")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" required {...register("password")} />
                </FormControl>
                <Button variant="outlined" color="primary" type="submit">
                  Submit
                </Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </div>
  );
}

export default ConnectModal;
