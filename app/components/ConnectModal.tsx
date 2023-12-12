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
  Select,
  Stack,
  Switch,
  Typography,
  Option,
} from "@mui/joy";
import React, { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { AuthType, createClient } from "webdav";
import useAddServerModal from "../store/useAddServerModal";
import useServerViewerStore from "../store/useServerViewerStore";
import { IServerFormData } from "../interface";
import { isHttps } from "../utils";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import useServerActions from "../hook/actions/useServerActions";

function ConnectModal() {
  const { updateCurrentServerAndPushToPath } = useServerActions();
  const { open, setOpen, setCurrentEditServer, currentEditServer } =
    useAddServerModal();
  const isEdit = !_.isEmpty(currentEditServer);

  const { addServerConfig, updateServerConfig } = useServerViewerStore();
  const { register, handleSubmit, getValues, control, setValue } =
    useForm<IServerFormData>({
      values: isEdit
        ? currentEditServer
        : {
            authType: AuthType.Password,
            protocol: "http",
            port: 31580,
            host: "www.stardusted.top",
            username: "kmfb",
            password: "1q2w3e*",
          },
    });

  const onSubmit = (data: IServerFormData) => {
    if (isEdit) {
      updateServerConfig(data, currentEditServer.id as any);
      updateCurrentServerAndPushToPath(data);
    } else {
      addServerConfig({
        id: uuidv4(),
        ...data,
      });
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setCurrentEditServer({} as any);
    }
  }, [open]);

  return (
    <div>
      <React.Fragment>
        <Modal open={open} onClose={() => setOpen(false)} disablePortal>
          <ModalDialog>
            <DialogTitle>服务器配置</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>认证类型</FormLabel>
                    <Controller
                      control={control}
                      name={`authType`}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          placeholder="Choose one..."
                          onChange={(e, value) => {
                            onChange(value);
                          }}
                          value={value}
                          slotProps={{
                            listbox: {
                              sx: (theme) => ({
                                zIndex: theme.vars.zIndex.modal,
                              }),
                            },
                          }}
                        >
                          <Option value={AuthType.Digest}>Digest</Option>
                          <Option value={AuthType.None}>None</Option>
                          <Option value={AuthType.Password}>Password</Option>
                          <Option value={AuthType.Token}>Token</Option>
                        </Select>
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>协议</FormLabel>
                    <Controller
                      control={control}
                      name={`protocol`}
                      rules={{
                        required: true,
                      }}
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
                    <FormLabel>Host</FormLabel>
                    <Input required {...register("host")} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Port</FormLabel>
                    <Input required {...register("port")} />
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
            </DialogContent>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </div>
  );
}

export default ConnectModal;
