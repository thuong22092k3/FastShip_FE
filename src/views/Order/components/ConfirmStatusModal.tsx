import { Alert, Button, Group, Modal, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

interface ConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  warningMessage?: string;
}

export const ConfirmModal = ({
  opened,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy bỏ",
  loading = false,
  warningMessage,
}: ConfirmModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      {warningMessage && (
        <Alert icon={<IconAlertCircle size="1rem" />} color="red" mb="md">
          {warningMessage}
        </Alert>
      )}

      <Text mb="xl">{message}</Text>

      <Group justify="flex-end">
        <Button variant="outline" onClick={onClose}>
          {cancelText}
        </Button>
        <Button color="blue" onClick={onConfirm} loading={loading}>
          {confirmText}
        </Button>
      </Group>
    </Modal>
  );
};
