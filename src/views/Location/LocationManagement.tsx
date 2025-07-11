import { Box, Button, Flex, Pagination, TextInput, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import { showNotification } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocationService } from "../../api/service/LocationService";
import { Location } from "../../api/type/LocationType";
import LocationTable from "../../components/Table/LocationTable";
import { DELETE_LOCATION } from "../../state_management/actions/actions";
import { RootState } from "../../state_management/reducers/rootReducer";
import { uploadLocations } from "../../state_management/slices/locationSlice";
import AddLocationModal from "./components/AddModal";
import { DeleteLocationModal } from "./components/DeleteModal";
import UpdateLocationModal from "./components/UpdateModal";

export default function LocationManagement() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const dispatch = useDispatch();
  const locations = useSelector((state: RootState) => state.locationSlice);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const locations = await LocationService.getAll();
      dispatch(uploadLocations(locations));
    } catch (err) {
      setError("Không thể tải dữ liệu bưu cục");
      dispatch(uploadLocations([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [refreshKey]);

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLocationCreated = () => {
    setRefreshKey((prev) => prev + 1);
    setOpenCreateModal(false);
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (locationId: string) => {
    setLocationToDelete(locationId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!locationToDelete) return;
    console.log("111");
    setIsDeleting(true);
    try {
      await LocationService.delete(locationToDelete);
      dispatch(DELETE_LOCATION({ DiaDiemId: locationToDelete }));
      showNotification({
        title: "Thành công",
        message: "Đã xóa bưu cục thành công",
        color: "green",
      });
      setDeleteModalOpen(false);
    } catch (error) {
      showNotification({
        title: "Lỗi",
        message: "Không thể xóa bưu cục",
        color: "red",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [locationToUpdate, setLocationToUpdate] = useState<Location | null>(
    null
  );

  const handleEditClick = (location: Location) => {
    setLocationToUpdate(location);
    setUpdateModalOpen(true);
  };

  return (
    <Box style={{ padding: 0, margin: 0 }}>
      <Title order={2}>Quản lý bưu cục</Title>

      {/* <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <CardComponent
          title="Tổng bưu cục"
          value={locations.length}
          icon={<IconMapPin size={24} />}
        />
        <CardComponent
          title="bưu cục đang hoạt động"
          value={locations.length}
          icon={<IconMapPin size={24} />}
        />
      </Box> */}

      <Flex justify="space-between" align="center" mt="md" mb="xl">
        <TextInput
          placeholder="Tìm kiếm bưu cục"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          style={{ width: 300 }}
        />
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => setOpenCreateModal(true)}
        >
          Thêm bưu cục mới
        </Button>
      </Flex>

      {loading ? (
        <Box py="xl">Đang tải dữ liệu...</Box>
      ) : error ? (
        <Box py="xl">{error}</Box>
      ) : locations.length === 0 ? (
        <Box py="xl">Không tìm thấy bưu cục nào</Box>
      ) : filteredLocations.length === 0 ? (
        <Box py="xl">Không tìm thấy bưu cục phù hợp với tìm kiếm</Box>
      ) : (
        <>
          <LocationTable
            data={filteredLocations}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
          />
          <Pagination
            total={Math.ceil(filteredLocations.length / 10)}
            value={page}
            onChange={setPage}
            mt="xl"
          />
        </>
      )}

      <AddLocationModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onLocationCreated={handleLocationCreated}
      />

      <UpdateLocationModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onLocationUpdated={() => setRefreshKey((prev) => prev + 1)}
        locationData={locationToUpdate}
      />

      <DeleteLocationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          console.log("11");
          handleConfirmDelete();
        }}
        isLoading={isDeleting}
      />
    </Box>
  );
}
