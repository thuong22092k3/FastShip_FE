import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Group,
  TextInput,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { employeeService } from "../../api/service/EmployeeService";
import { LocationService } from "../../api/service/LocationService";
import { TaiXe } from "../../api/type/EmployeeType";
import { TaiXeTable } from "../../components/Table/DriverTable";
import { RootState } from "../../state_management/reducers/rootReducer";
import { uploadDrivers } from "../../state_management/slices/driveSlice";
import AddEmployeeModal from "./CreateEmployee";
import { DeleteEmployeeModal } from "./DeleteEployeeModal";
import UpdateDriverModal from "./UpdateDriver";

export default function DriverScreen() {
  const dispatch = useDispatch();
  const drivers = useSelector((state: RootState) => state.driverSlice);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<TaiXe | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalDrivers, setTotalDrivers] = useState(0);

  const [locations, setLocations] = useState<TLocation[]>([]);
  // const fetchDrivers = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await employeeService.getAllUsers();
  //     if (response?.data && Array.isArray(response.data)) {
  //       dispatch(uploadDrivers(response.data));
  //     } else {
  //       dispatch(uploadDrivers([]));
  //     }
  //   } catch (err) {
  //     setError("Không thể tải dữ liệu tài xế");
  //     dispatch(uploadDrivers([]));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchDrivers = async () => {
  //   try {
  //     setLoading(true);
  //     console.log("Fetching drivers..."); // Debug log
  //     const response = await employeeService.getAllDrivers();
  //     console.log("Drivers data:", response); // Debug log
  //     dispatch(uploadDrivers(response));
  //   } catch (err) {
  //     console.error("Error in fetchDrivers:", err); // Detailed error log
  //     setError("Không thể tải dữ liệu tài xế");
  //     dispatch(uploadDrivers([]));
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchDrivers = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      let response;

      if (search) {
        response = await employeeService.searchUsers(search, page, limit);
      } else {
        response = await employeeService.getAllDrivers(page, limit);
      }
      console.log("response total", response.total);
      if (response && Array.isArray(response)) {
        dispatch(uploadDrivers(response));
        setTotalDrivers(response.total || 0);
      } else {
        dispatch(uploadDrivers([]));
      }
    } catch (err) {
      setError("Không thể tải dữ liệu đơn hàng");
      dispatch(uploadDrivers([]));
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await LocationService.getAll();
      setLocations(response);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    setRefreshKey((prev) => prev + 1);
  }, []);
  useEffect(() => {
    fetchDrivers(currentPage, itemsPerPage);
    fetchLocations();
  }, [refreshKey, currentPage, itemsPerPage, search]);
  const handleOrderCreated = () => {
    setRefreshKey((prev) => prev + 1);
    setOpenCreateModal(false);
  };
  const filteredDrivers = drivers.filter(
    (d) =>
      d.HoTen.toLowerCase().includes(search.toLowerCase()) ||
      d.Email.toLowerCase().includes(search.toLowerCase()) ||
      d.UserName.toLowerCase().includes(search.toLowerCase())
  );

  const taiXeList: TaiXe[] = drivers.map((emp) => ({
    TaiXeID: emp.TaiXeID,
    HoTen: emp.HoTen,
    UserName: emp.UserName,
    Password: emp.Password,
    Email: emp.Email,
    HieuSuat: emp.HieuSuat,
    CongViec: emp.CongViec || 0,
    DiaDiemId: emp.DiaDiemId,
    role: "TaiXe" as const,
  }));

  const handleAddSuccess = () => {
    setOpenCreateModal(false);
    setRefreshKey((prev) => prev + 1);
  };

  const handleUpdate = async (driver: TaiXe) => {
    try {
      setSelectedDriver(driver);
      setOpenUpdateModal(true);
    } catch (error) {
      console.error("Error preparing update:", error);
      showNotification({
        title: "Lỗi",
        message: "Không thể chuẩn bị dữ liệu cập nhật",
        color: "red",
      });
    }
  };

  const handleDelete = (UserName: string) => {
    setSelectedDriver({ ...selectedDriver!, UserName: UserName });
    setOpenDeleteModal(true);
  };

  const handleDeleteSuccess = async () => {
    if (!selectedDriver) return;

    try {
      await employeeService.deleteUser(selectedDriver.UserName);
      showNotification({ message: "Xóa tài xế thành công", color: "green" });
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      showNotification({ message: "Xóa tài xế thất bại", color: "red" });
      console.error(error);
    } finally {
      setOpenDeleteModal(false);
      setSelectedDriver(null);
    }
  };
  console.log("drivers", drivers);
  console.log("taiXeList", taiXeList);
  return (
    <Container size="xl" p="md">
      <Flex justify="space-between" align="center" mb="md">
        <Title order={3}>Quản lý tài xế</Title>
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => setOpenCreateModal(true)}
        >
          Thêm tài xế
        </Button>
      </Flex>

      <Group mb="md">
        <TextInput
          placeholder="Tìm kiếm đơn hàng"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          leftSection={<IconSearch size={16} />}
          rightSection={
            <ActionIcon onClick={handleSearch}>
              <IconSearch size={16} />
            </ActionIcon>
          }
          style={{ width: 300 }}
        />
      </Group>

      <TaiXeTable
        // data={taiXeList}
        // loading={loading}
        // error={error}
        // onEdit={handleUpdate}
        // onDelete={(id) => handleDelete(id)}
        data={taiXeList}
        onEdit={handleUpdate}
        onDelete={(id) => handleDelete(id)}
        page={currentPage}
        onPageChange={setCurrentPage}
        total={totalDrivers}
        limit={itemsPerPage}
        onLimitChange={(newLimit) => {
          setItemsPerPage(newLimit);
          setCurrentPage(1);
        }}
        locations={locations}
      />

      {/* <Pagination total={1} value={page} onChange={setPage} mt="md" /> */}

      <AddEmployeeModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onEmployeeCreated={handleAddSuccess}
      />

      <UpdateDriverModal
        open={openUpdateModal}
        onClose={() => {
          console.log("Đóng modal cập nhật"); // Debug 13
          setOpenUpdateModal(false);
          setSelectedDriver(null);
        }}
        driverData={selectedDriver}
        onDriverUpdated={() => {
          console.log("Callback onDriverUpdated được gọi"); // Debug 14
          setRefreshKey((prev) => prev + 1);
          showNotification({
            message: "Cập nhật tài xế thành công",
            color: "green",
          });
        }}
      />

      <DeleteEmployeeModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteSuccess}
      />
    </Container>
  );
}
