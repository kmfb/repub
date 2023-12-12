import React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { IconButton } from "@mui/joy";

export default function AlertDialogModal(props: { onConfirm: () => void }) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <IconButton variant="plain" color="danger" onClick={() => setOpen(true)}>
        <DeleteForever />
      </IconButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            确认
          </DialogTitle>
          <Divider />
          <DialogContent>确定要删除吗？</DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                props.onConfirm();
                setOpen(false);
              }}
            >
              确定
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              取消
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
