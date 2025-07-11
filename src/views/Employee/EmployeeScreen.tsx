import {
  Button,
  Container,
  Flex,
  Group,
  Pagination,
  TextInput,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { employeeService } from "../../api/service/EmployeeService";
import { LocationService } from "../../api/service/LocationService";
import { NhanVien } from "../../api/type/EmployeeType";
import { NhanVienTable } from "../../components/Table/EmployeeTable";
import { RootState } from "../../state_management/reducers/rootReducer";
import { uploadEmployees } from "../../state_management/slices/employeeSlice";
import AddEmployeeModal from "./CreateEmployee";
import { DeleteEmployeeModal } from "./DeleteEployeeModal";
import UpdateEmployeeModal from "./UpdateEmployee";

export default function EmployeeManagementScreen() {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employeeSlice);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<NhanVien | null>(
    null
  );
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [locations, setLocations] = useState<TLocation[]>([]);

  // const fetchEmployees = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await employeeService.getAllUsers();
  //     if (response?.data && Array.isArray(response.data)) {
  //       dispatch(uploadEmployees(response.data));
  //     } else {
  //       dispatch(uploadEmployees([]));
  //     }
  //   } catch (err) {
  //     setError("Không thể tải dữ liệu nhân viên");
  //     dispatch(uploadEmployees([]));
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeService.getAllEmployees();
      dispatch(uploadEmployees(response));
    } catch (err) {
      setError("Không thể tải dữ liệu nhân viên");
      dispatch(uploadEmployees([]));
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

  useEffect(() => {
    fetchEmployees();
    fetchLocations();
  }, [refreshKey]);

  const filteredEmployees = employees?.filter(
    (e) =>
      e.HoTen?.toLowerCase().includes(search?.toLowerCase()) ||
      e.Email?.toLowerCase().includes(search?.toLowerCase()) ||
      e.UserName?.toLowerCase().includes(search?.toLowerCase())
  );

  const handleAddSuccess = () => {
    setOpenCreateModal(false);
    setRefreshKey((prev) => prev + 1);
  };

  const handleUpdate = (employee: NhanVien) => {
    setSelectedEmployee(employee);
    setOpenUpdateModal(true);
  };

  const handleDelete = (UserName: string) => {
    setSelectedEmployee({ ...selectedEmployee!, UserName: UserName });
    setOpenDeleteModal(true);
  };

  const handleDeleteSuccess = async () => {
    // showNotification({ message: "Xóa nhân viên thành công", color: "green" });
    // setRefreshKey((prev) => prev + 1);
    // setOpenDeleteModal(false);

    if (!selectedEmployee) return;

    try {
      await employeeService.deleteUser(selectedEmployee.UserName);
      showNotification({ message: "Xóa tài xế thành công", color: "green" });
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      showNotification({ message: "Xóa tài xế thất bại", color: "red" });
      console.error(error);
    } finally {
      setOpenDeleteModal(false);
      setSelectedEmployee(null);
    }
  };
  const nhanVienList: NhanVien[] = filteredEmployees.map((emp) => ({
    NhanVienID: emp.NhanVienID,
    HoTen: emp.HoTen,
    UserName: emp.UserName,
    Password: emp.Password,
    Email: emp.Email,
    HieuSuat: emp.HieuSuat,
    DiaDiemId: emp.DiaDiemId,
    role: "NhanVien",
  }));

  return (
    <Container size="xl" p="md">
      <Flex justify="space-between" align="center" mb="md">
        <Title order={3}>Quản lý nhân viên</Title>
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => setOpenCreateModal(true)}
        >
          Thêm nhân viên
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

      <NhanVienTable
        data={nhanVienList}
        loading={loading}
        error={error}
        onEdit={handleUpdate}
        onDelete={handleDelete}
        locations={locations}
      />

      <Pagination total={1} value={page} onChange={setPage} mt="md" />

      <AddEmployeeModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onEmployeeCreated={handleAddSuccess}
      />

      <UpdateEmployeeModal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        employeeData={selectedEmployee}
        onEmployeeUpdated={() => {
          setRefreshKey((prev) => prev + 1);
          setOpenUpdateModal(false);
          showNotification({
            message: "Cập nhật nhân viên thành công",
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
