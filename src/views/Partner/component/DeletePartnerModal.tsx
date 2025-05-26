import React from "react";
import { Text, Button, Group, Box } from "@mantine/core";
import "@mantine/core/styles.css";

interface DeletePartnerModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeletePartnerModal: React.FC<DeletePartnerModalProps> = ({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  if (!open) return null;

  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <Box
        p="lg"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <Text size="lg" mb="xl" fw={500}>
          Xác nhận xóa đối tác
        </Text>
        <Text mb="xl">
          Bạn có chắc chắn muốn xóa đối tác này? Hành động này không thể hoàn
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
      </Box>
    </Box>
  );
};

export default DeletePartnerModal;
