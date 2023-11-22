"use client";
import { Add, LockOpenOutlined, LockOutlined } from "@mui/icons-material";
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
  Switch,
  Typography,
} from "@mui/joy";
import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { AuthType, createClient } from "webdav";
import useAddServerModal from "../store/useAddServerModal";
import useServerViewerStore from "../store/useServerViewerStore";
import { IServerFormData } from "../interface";
import { isHttps } from "../utils";

function ConnectModal() {
  const { open, setOpen } = useAddServerModal();
  const { addServerConfig } = useServerViewerStore();
  const { register, handleSubmit, getValues, control } =
    useForm<IServerFormData>({
      defaultValues: {
        authType: AuthType.Password,
        protocol: "http",
        host: "",
        port: 80,
        username: "",
        password: "",
      },
    });

  const onSubmit = (data: IServerFormData) => {
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
            <DialogTitle>服务器配置</DialogTitle>
            {/* <DialogContent>
              Fill in the information of the project.
            </DialogContent> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>协议</FormLabel>
                  <Controller
                    control={control}
                    name={`protocol`}
                    render={({ field: { onChange, value } }) => (
                      <Switch
                        color={isHttps(value) ? "success" : "primary"}
                        endDecorator={
                          isHttps(value) ? (
                            <>
                              <LockOutlined />
                              <>https</>
                            </>
                          ) : (
                            <>
                              <LockOpenOutlined />
                              <>http</>
                            </>
                          )
                        }
                        checked={isHttps(value)}
                        onChange={(e) => {
                          debugger;
                          onChange(e.target.checked ? "https" : "http");
                        }}
                      />
                    )}
                  />
                  {/* <Switch
                    color={isHttps(formValues.protocol) ? "success" : "primary"}
                    startDecorator={<LockOpenOutlined />}
                    endDecorator={<LockOutlined />}
                    {...register("protocol")}
                  /> */}
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
