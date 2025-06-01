import { Button, Text, Group, LoadingOverlay } from "@mantine/core";
import "@mantine/core/styles.css";

interface DeleteLocationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const DeleteLocationModal = ({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteLocationModalProps) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "8px",
          width: "500px",
          position: "relative",
        }}
      >
        <LoadingOverlay visible={isLoading} />

        <Text size="lg" fw={500} mb="md">
          Xác nhận xóa bưu cục
        </Text>

        <Text mb="xl">
          Bạn có chắc chắn muốn xóa bưu cục này? Hành động này không thể hoàn
          tác.
        </Text>

        <Group justify="flex-end">
          <Button variant="default" onClick={onClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button color="red" onClick={onConfirm} loading={isLoading}>
            Xác nhận xóa
          </Button>
        </Group>
      </div>
    </div>
  );
};
