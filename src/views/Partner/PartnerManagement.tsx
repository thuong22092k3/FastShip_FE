import { Box, Button, Group, Text, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import { showNotification } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { partnerService } from "../../api/service/PartnerService";
import { DoiTac } from "../../api/type/PartnerType";
import { PartnerTable } from "../../components/Table/PartnerTable";
import {
  ADD_PARTNER,
  DELETE_PARTNER,
  UPDATE_PARTNER,
} from "../../state_management/actions/actions";
import { RootState } from "../../state_management/reducers/rootReducer";
import { uploadPartners } from "../../state_management/slices/partnerSlice";
import AddPartnerModal from "./component/AddPartnerModal";
import DeletePartnerModal from "./component/DeletePartnerModal";
import EditPartnerModal from "./component/EditPartnerModal";

const PartnerManagementScreen = () => {
  // const [partners, setPartners] = useState<DoiTac[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<DoiTac | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const partners = useSelector((state: RootState) => state.partnerSlice);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await partnerService.getAllPartners();
      console.log("API Data:", response.data);

      if (response && response.data && Array.isArray(response.data)) {
        dispatch(uploadPartners(response.data));
      } else {
        dispatch(uploadPartners([]));
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Không thể tải danh sách đối tác");
      dispatch(uploadPartners([]));
    } finally {
      setLoading(false);
    }
  };

  console.log("Partners:", partners);

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleAddPartner = async (
    partnerData: Omit<DoiTac, "DoiTacId">,
    resetForm: () => void
  ) => {
    try {
      const newPartner = await partnerService.createPartner(partnerData);
      console.log("New partner:", newPartner);
      dispatch(ADD_PARTNER(newPartner));
      showNotification({
        title: "Thành công",
        message: "Đã thêm đối tác mới",
        color: "green",
      });
      setAddModalOpen(false);
      resetForm();
    } catch (error) {
      showNotification({
        title: "Lỗi",
        message: "Không thể thêm đối tác mới",
        color: "red",
      });
    }
  };

  const handleUpdatePartner = async (
    DoiTacId: string,
    updateData: Partial<DoiTac>
  ) => {
    try {
      const updatedPartner = await partnerService.updatePartner(
        DoiTacId,
        updateData
      );
      // setPartners(
      //   partners.map((partner) =>
      //     partner.DoiTacId === DoiTacId ? updatedPartner : partner
      //   )
      // );
      dispatch(UPDATE_PARTNER(updatedPartner));
      showNotification({
        title: "Thành công",
        message: "Đã cập nhật đối tác",
        color: "green",
      });
      setEditModalOpen(false);
    } catch (error) {
      showNotification({
        title: "Lỗi",
        message: "Không thể cập nhật đối tác",
        color: "red",
      });
    }
  };

  const handleDeletePartner = async (DoiTacId: string) => {
    setIsDeleting(true);
    try {
      await partnerService.deletePartner(DoiTacId);
      dispatch(DELETE_PARTNER({ doiTacId: DoiTacId }));
      showNotification({
        title: "Thành công",
        message: "Đã xóa đối tác",
        color: "green",
      });
    } catch (error) {
      showNotification({
        title: "Lỗi",
        message: "Không thể xóa đối tác",
        color: "red",
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
    }
  };

  // Partner type badge color
  const getPartnerTypeColor = (type: string) => {
    switch (type) {
      case "NhaCungCap":
        return "blue";
      case "NhaPhanPhoi":
        return "green";
      case "CongTyVanChuyen":
        return "orange";
      case "TrungTamBaoHanh":
        return "red";
      default:
        return "gray";
    }
  };
  console.log("Addmodal:", addModalOpen);
  return (
    <Box style={{ padding: 0, margin: 0, maxWidth: "82vw" }}>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Quản lý Đối tác</Title>
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => {
            console.log("Button clicked");
            setAddModalOpen(true);
          }}
        >
          Thêm đối tác
        </Button>
      </Group>

      {error && (
        <Text color="red" mb="md">
          {error}
        </Text>
      )}

      <PartnerTable
        data={partners}
        loading={loading}
        // error={error}
        onEdit={(partner: DoiTac) => {
          setSelectedPartner(partner);
          setEditModalOpen(true);
        }}
        onDelete={(doiTacId: string) => {
          const partnerToDelete = partners.find((p) => p.DoiTacId === doiTacId);
          if (partnerToDelete) {
            setSelectedPartner(partnerToDelete);
            setDeleteModalOpen(true);
          }
        }}
      />
      {/* Add Partner Modal */}
      <AddPartnerModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddPartner}
      />

      {/* Edit Partner Modal */}
      {selectedPartner && (
        <EditPartnerModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onUpdate={handleUpdatePartner}
          partnerData={selectedPartner}
        />
      )}

      {/* Delete Partner Modal */}
      {selectedPartner && (
        <DeletePartnerModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDeletePartner(selectedPartner.DoiTacId)}
          isLoading={isDeleting}
        />
      )}
    </Box>
  );
};

export default PartnerManagementScreen;
