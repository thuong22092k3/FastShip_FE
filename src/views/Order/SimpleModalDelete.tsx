import { Button, Text, Group, LoadingOverlay } from "@mantine/core";
import "@mantine/core/styles.css";
import { useState, useEffect } from "react";
import { DELETE_ORDER } from "../../state_management/actions/actions";

interface SimpleDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

interface SimpleDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const SimpleDeleteModal = ({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}: SimpleDeleteModalProps) => {
  console.log("Modal received props:", { open, onClose, onConfirm, isLoading });

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
          padding: "20px",
          borderRadius: "8px",
          width: "500px",
        }}
      >
        <Text size="lg" fw={500} mb="md">
          Xác nhận xóa
        </Text>
        <Text mb="xl">Bạn có chắc chắn muốn xóa đơn hàng này?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose}>
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
