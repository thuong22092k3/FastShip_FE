import { Modal, Text, Button, Group } from "@mantine/core";

interface DeleteConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  opened,
  onClose,
  onConfirm,
  title = "Xác nhận xóa",
  message = "Bạn có chắc chắn muốn xóa đơn hàng này?",
  isLoading = false,
}: DeleteConfirmationModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Text>{message}</Text>
      <Group mt="xl" justify="flex-end">
        <Button variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button
          color="red"
          onClick={async () => {
            await onConfirm();
          }}
          loading={isLoading}
        >
          Xác nhận xóa
        </Button>
      </Group>
    </Modal>
  );
}
