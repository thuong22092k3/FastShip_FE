import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Pagination,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";

import { RootState } from "../../state_management/reducers/rootReducer";
import { TaiXe } from "../../api/type/EmployeeType";
import { employeeService } from "../../api/service/EmployeeService";
import { uploadDrivers } from "../../state_management/slices/driveSlice";
import { TaiXeTable } from "../../components/Table/DriverTable";
import { DeleteEmployeeModal } from "./DeleteEployeeModal";
import AddEmployeeModal from "./CreateEmployee";
import UpdateEmployeeModal from "./UpdateEmployee";
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

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      console.log("Fetching drivers..."); // Debug log
      const response = await employeeService.getAllDrivers();
      console.log("Drivers data:", response); // Debug log
      dispatch(uploadDrivers(response));
    } catch (err) {
      console.error("Error in fetchDrivers:", err); // Detailed error log
      setError("Không thể tải dữ liệu tài xế");
      dispatch(uploadDrivers([]));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDrivers();
  }, [refreshKey]);

  const filteredDrivers = drivers.filter(
    (d) =>
      d.HoTen.toLowerCase().includes(search.toLowerCase()) ||
      d.Email.toLowerCase().includes(search.toLowerCase()) ||
      d.UserName.toLowerCase().includes(search.toLowerCase())
  );

  const taiXeList: TaiXe[] = filteredDrivers.map((emp) => ({
    TaiXeID: emp.TaiXeID,
    HoTen: emp.HoTen,
    UserName: emp.UserName,
    Password: emp.Password,
    Email: emp.Email,
    HieuSuat: emp.HieuSuat,
    CongViec: emp.CongViec || 0,
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
          placeholder="Tìm theo tên, email hoặc tài khoản"
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Group>

      <TaiXeTable
        data={taiXeList}
        loading={loading}
        error={error}
        onEdit={handleUpdate}
        onDelete={(id) => handleDelete(id)}
      />

      <Pagination total={1} value={page} onChange={setPage} mt="md" />

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
