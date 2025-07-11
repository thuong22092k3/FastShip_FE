import {
  Box,
  Button,
  Flex,
  Pagination,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import {
  IconPlus,
  IconSearch,
  IconSettings,
  IconTruck,
  IconTruckDelivery,
  IconTruckOff,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vehicleService } from "../../api/service/VehicleService";
import CardComponent from "../../components/Card/CardComponent";
import { VehicleTable } from "../../components/Table/VehicleTable";
import { DELETE_VEHICLE } from "../../state_management/actions/actions";
import { RootState } from "../../state_management/reducers/rootReducer";
import { uploadVehicles } from "../../state_management/slices/vehicleSlice";
// import NewVehicleModal from "./NewVehicleModal";
// import { VehicleDetailModal } from "./VehicleDetailModal";
// import { SimpleDeleteModal } from "./SimpleDeleteModal";
import "@mantine/core/styles.css";
import { showNotification } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { Vehicle } from "../../api/type/VehicleType";
import AddVehicleModal from "./AddVehicleModal";
import { DeleteVehicleModal } from "./DeleteVehicleModal";
import UpdateVehicleModal from "./UpdateVehicleModal";

interface VehicleStats {
  total: number;
  active: number;
  maintenance: number;
  inactive: number;
}

export default function VehicleManagementScreen() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  // const [stats, setStats] = useState<VehicleStats>({
  //   total: 0,
  //   active: 0,
  //   maintenance: 0,
  //   inactive: 0,
  // });

  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.vehicleSlice);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await vehicleService.getAllVehicles();
      if (response && response.data && Array.isArray(response.data)) {
        dispatch(uploadVehicles(response.data));
      } else {
        dispatch(uploadVehicles([]));
      }
    } catch (err) {
      setError("Không thể tải dữ liệu phương tiện");
      dispatch(uploadVehicles([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [refreshKey]);

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      (vehicle.BienSo?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
      (vehicle.TaiXeID?.toLowerCase() ?? "").includes(search.toLowerCase())
  );

  const handleVehicleCreated = () => {
    setRefreshKey((prev) => prev + 1);
    setOpenCreateModal(false);
  };

  const [detailModalOpened, setDetailModalOpened] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const handleViewDetail = async (vehicle: Vehicle) => {
    // try {
    //   setDetailLoading(true);
    //   const detailedVehicle = await vehicleService.getVehicleDetail(vehicle.id);
    //   setSelectedVehicle(detailedVehicle);
    //   setDetailModalOpened(true);
    // } catch (error) {
    //   console.error("Failed to fetch vehicle details:", error);
    // } finally {
    //   setDetailLoading(false);
    // }
    console.log("detail");
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (vehicleId: string) => {
    setVehicleToDelete(vehicleId);
    setDeleteModalOpen(true);
  };

  // const handleConfirmDelete = async () => {
  //   if (!vehicleToDelete) return;

  //   try {
  //     setIsDeleting(true);
  //     await vehicleService.deleteVehicle(vehicleToDelete);

  //     dispatch(DELETE_VEHICLE([vehicleToDelete]));
  //     showNotification({
  //       title: "Thành công",
  //       message: "Đã xóa phương tiện thành công",
  //       color: "green",
  //     });

  //     setRefreshKey((prev) => prev + 1);
  //     setDeleteModalOpen(false);
  //   } catch (error) {
  //     showNotification({
  //       title: "Lỗi",
  //       message: "Không thể xóa phương tiện",
  //       color: "red",
  //     });
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // };
  const handleConfirmDelete = async () => {
    if (!vehicleToDelete) return;

    setIsDeleting(true);
    try {
      await vehicleService.deleteVehicle(vehicleToDelete);
      dispatch(DELETE_VEHICLE({ phuongTienId: vehicleToDelete }));
      showNotification({
        title: "Thành công",
        message: "Đã xóa phương tiện thành công",
        color: "green",
      });
      setDeleteModalOpen(false);
    } catch (error) {
      showNotification({
        title: "Lỗi",
        message: "Không thể xóa phương tiện",
        color: "red",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [vehicleToUpdate, setVehicleToUpdate] = useState<Vehicle | null>(null);
  const handleEditClick = (vehicle: Vehicle) => {
    setVehicleToUpdate(vehicle);
    setUpdateModalOpen(true);
  };

  const calculateStats = (vehicles: Vehicle[]): VehicleStats => {
    return {
      total: vehicles.length,
      active: vehicles.filter(
        (vehicle) => vehicle.TrangThai === "Đang hoạt động"
      ).length,
      maintenance: vehicles.filter(
        (vehicle) => vehicle.TrangThai === "Đang bảo dưỡng"
      ).length,
      inactive: vehicles.filter(
        (vehicle) => vehicle.TrangThai === "Ngừng hoạt động"
      ).length,
    };
  };

  const stats = useMemo(() => {
    return calculateStats(vehicles);
  }, [vehicles]);

  return (
    <Box style={{ padding: 0, margin: 0 }}>
      <Title order={2}>Quản lý phương tiện</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" mb="xl">
        <CardComponent
          title="Tổng phương tiện"
          value={stats.total}
          icon={<IconTruckDelivery size={24} />}
          color="blue"
        />
        <CardComponent
          title="Đang hoạt động"
          value={stats.active}
          icon={<IconTruck size={24} />}
          color="green"
        />
        <CardComponent
          title="Đang bảo dưỡng"
          value={stats.maintenance}
          icon={<IconSettings size={24} />}
          color="orange"
        />
        <CardComponent
          title="Ngừng hoạt động"
          value={stats.inactive}
          icon={<IconTruckOff size={24} />}
          color="red"
        />
      </SimpleGrid>

      <Flex justify="space-between" align="center" mt="md" mb="xl">
        <TextInput
          placeholder="Tìm kiếm phương tiện"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          style={{ width: 300 }}
        />
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => setOpenCreateModal(true)}
        >
          Thêm phương tiện mới
        </Button>
      </Flex>

      {loading ? (
        <Box py="xl">Đang tải dữ liệu...</Box>
      ) : error ? (
        <Box py="xl">{error}</Box>
      ) : vehicles.length === 0 ? (
        <Box py="xl">Không tìm thấy phương tiện nào</Box>
      ) : filteredVehicles.length === 0 ? (
        <Box py="xl">Không tìm thấy phương tiện phù hợp với tìm kiếm</Box>
      ) : (
        <>
          <VehicleTable
            data={filteredVehicles}
            onViewDetail={handleViewDetail}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
          />
          <Pagination
            total={Math.ceil(filteredVehicles.length / 10)}
            value={page}
            onChange={setPage}
            mt="xl"
          />
        </>
      )}

      <AddVehicleModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onVehicleCreated={handleVehicleCreated}
      />
      {/* <VehicleDetailModal
          opened={detailModalOpened}
          onClose={() => setDetailModalOpened(false)}
          vehicle={selectedVehicle}
          loading={detailLoading}
        /> */}
      <UpdateVehicleModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onVehicleUpdated={() => setRefreshKey((prev) => prev + 1)}
        vehicleData={vehicleToUpdate}
      />
      <DeleteVehicleModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </Box>
  );
}
