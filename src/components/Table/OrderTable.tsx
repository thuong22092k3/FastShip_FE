import {
  ActionIcon,
  Badge,
  Button,
  Checkbox,
  Group,
  Menu,
  Pagination,
  ScrollArea,
  Select,
  Table,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { showNotification } from "@mantine/notifications";
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconColumns,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeService } from "../../api/service/EmployeeService";
import { orderService } from "../../api/service/OrderService";
import { Order } from "../../api/type/OrderType";
import { UPDATE_ORDER } from "../../state_management/actions/actions";
import { RootState } from "../../state_management/reducers/rootReducer";
import { uploadDrivers } from "../../state_management/slices/driveSlice";
import { PAGE_SIZE_OPTIONS, PageSize } from "../../utils/constants/enum";
import CheckboxComponent from "../CheckBox/CheckBoxComponent";
import TextComponent from "../Text/TextComponent";

type Props = {
  data: Order[];
  loading?: boolean;
  error?: string;
  onViewDetail: (order: Order) => void;
  onDelete: (donHangId: string) => void;
  page?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  total?: number;
  limit?: number;
};

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "đang giao":
      return "blue";
    case "đã giao":
      return "green";
    case "hủy":
      return "red";
    default:
      return "gray";
  }
};

const columnWidths: { [key: string]: string } = {
  checkbox: "50px",
  DonHangId: "120px",
  NhanVienID: "120px",
  NguoiGui: "150px",
  NguoiNhan: "150px",
  SDT: "120px",
  DiaChiLayHang: "200px",
  DiaChiGiaoHang: "200px",
  CuocPhi: "100px",
  TrangThai: "100px",
  CreatedAt: "160px",
  UpdatedAt: "160px",
  GhiChu: "200px",
  hanhDong: "100px",
  deliveryMethod: "150px",
  payer: "120px",

  additionalServices: "120px",

  packageType: "120px",
  TaiXeID: "200px",
};

const allColumns = [
  { key: "DonHangId", label: "ID Đơn hàng", visible: true },
  { key: "NhanVienID", label: "ID Nhân viên", visible: true },
  { key: "NguoiGui", label: "Người gửi", visible: true },
  { key: "NguoiNhan", label: "Người nhận", visible: true },
  { key: "SDT", label: "SĐT", visible: true },
  { key: "DiaChiLayHang", label: "Địa chỉ lấy", visible: true },
  { key: "DiaChiGiaoHang", label: "Địa chỉ giao", visible: true },
  { key: "CuocPhi", label: "Cước phí", visible: true },
  { key: "TrangThai", label: "Trạng thái", visible: true },
  { key: "CreatedAt", label: "Ngày tạo", visible: true },
  { key: "UpdatedAt", label: "Ngày cập nhật", visible: true },
  { key: "GhiChu", label: "Ghi chú", visible: true },
  { key: "deliveryMethod", label: "Phương thức giao", visible: true },
  { key: "payer", label: "Người trả phí", visible: true },
  { key: "additionalServices", label: "Dịch vụ thêm", visible: true },
  { key: "TaiXeID", label: "Tài xế", visible: true },
  { key: "packageType", label: "Loại bưu kiện", visible: true },
];

export const OrderTable: React.FC<Props> = ({
  data,
  loading,
  error,
  onViewDetail,
  onDelete,
  page = 1,
  onPageChange,
  total = 0,
  limit = 10,
  onLimitChange,
}) => {
  const { currentUser } = useSelector((state: RootState) => state.authSlice);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<keyof Order | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [columns, setColumns] = useState(allColumns.map((col) => ({ ...col })));
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orderSlice);
  const pageSizeOptions = PAGE_SIZE_OPTIONS;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(data.map((order) => order.DonHangId));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  };

  const handleSort = (column: keyof Order) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && !allSelected;
  const [isChecked, setIsChecked] = useState(false);

  const cellStyle = {
    borderRight: "1px solid #ccc",
    padding: "8px",
  };

  const headerStyle = {
    borderRight: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#f8f8f8",
  };
  const statusOptions = [
    { value: "Chờ xác nhận", label: "Chờ xác nhận" },
    { value: "Đang giao", label: "Đang giao" },
    { value: "Đã giao", label: "Đã giao" },
    { value: "Hủy", label: "Hủy" },
  ];
  useEffect(() => {
    const fetchDrivers = async (page: number = 1, limit: number = 10) => {
      try {
        let response;

        response = await employeeService.getAllDrivers(page, limit);
        console.log("response total", response.total);
        if (response && Array.isArray(response)) {
          dispatch(uploadDrivers(response));
        } else {
          dispatch(uploadDrivers([]));
        }
      } catch (err) {
        dispatch(uploadDrivers([]));
      } finally {
      }
    };
    fetchDrivers();
  }, []);
  useEffect(() => {
    if (!currentUser?.role) return;

    setColumns((prevColumns) =>
      prevColumns.map((col) => {
        if (currentUser.role === "Admin") {
          return { ...col, visible: true };
        }

        if (currentUser.role === "NhanVien") {
          if (col.key === "TaiXeID") return { ...col, visible: true };
          if (col.key === "NhanVienID") return { ...col, visible: false };
        }

        if (currentUser.role === "TaiXe") {
          if (col.key === "TaiXeID" || col.key === "NhanVienID") {
            return { ...col, visible: false };
          }
        }

        return col;
      })
    );
  }, [currentUser?.role]);
  const drivers = useSelector((state: RootState) => state.driverSlice);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const result = await orderService.updateStatusOrder(orderId, newStatus);

      if (result.success) {
        const order = data.find((o) => o.DonHangId === orderId);
        if (!order) return;

        const updatedOrder = {
          ...order,
          TrangThai: newStatus,
          UpdateAt: new Date().toISOString(),
          CreateAt: order.CreatedAt ?? order.CreatedAt,
        };

        dispatch(UPDATE_ORDER(updatedOrder));
        console.log("status: ", updatedOrder);
        showNotification({
          title: "Cập nhật thành công",
          message: "Trạng thái đơn hàng đã được cập nhật",
          color: "green",
        });
      }
    } catch (error) {
      showNotification({
        title: "Lỗi",
        message: "Không thể cập nhật trạng thái đơn hàng",
        color: "red",
      });
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortBy) return 0;

    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue === undefined || bValue === undefined) return 0;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortDirection === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const toggleColumnVisibility = (key: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const resetColumns = () => {
    setColumns(allColumns.map((col) => ({ ...col, visible: true })));
  };
  const handleCheckboxChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    toggleColumnVisibility(key);
  };
  const rows = sortedData.map((order) => {
    const isSelected = selectedRows.includes(order.DonHangId);

    return (
      <Table.Tr
        key={order.DonHangId}
        style={{ borderBottom: "1px solid #ccc" }}
      >
        <Table.Td style={cellStyle}>
          <Checkbox
            checked={isSelected}
            onChange={(event) =>
              handleRowSelect(order.DonHangId, event.currentTarget.checked)
            }
          />
        </Table.Td>
        {columns.find((c) => c.key === "DonHangId")?.visible && (
          <Table.Td style={cellStyle}>{order.DonHangId}</Table.Td>
        )}
        {columns.find((c) => c.key === "NhanVienID")?.visible && (
          <Table.Td style={cellStyle}>{order.NhanVienID}</Table.Td>
        )}
        {columns.find((c) => c.key === "NguoiGui")?.visible && (
          <Table.Td style={cellStyle}>{order.NguoiGui}</Table.Td>
        )}
        {columns.find((c) => c.key === "NguoiNhan")?.visible && (
          <Table.Td style={cellStyle}>{order.NguoiNhan}</Table.Td>
        )}
        {columns.find((c) => c.key === "SDT")?.visible && (
          <Table.Td style={cellStyle}>{order.SDT}</Table.Td>
        )}
        {columns.find((c) => c.key === "DiaChiLayHang")?.visible && (
          <Table.Td style={cellStyle}>{order.DiaChiLayHang}</Table.Td>
        )}
        {columns.find((c) => c.key === "DiaChiGiaoHang")?.visible && (
          <Table.Td style={cellStyle}>{order.DiaChiGiaoHang}</Table.Td>
        )}
        {columns.find((c) => c.key === "CuocPhi")?.visible && (
          <Table.Td style={cellStyle}>
            {order?.CuocPhi?.toLocaleString()}₫
          </Table.Td>
        )}
        {columns.find((c) => c.key === "TrangThai")?.visible && (
          <Table.Td style={cellStyle}>
            <div style={{ position: "relative" }}>
              <Badge
                color={getStatusColor(order.TrangThai)}
                size="xs"
                style={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />
              <Select
                value={order.TrangThai}
                onChange={(value) => {
                  if (value && value !== order.TrangThai) {
                    handleUpdateStatus(order.DonHangId, value);
                  }
                }}
                data={statusOptions}
                size="xs"
                style={{
                  width: "100%",
                  minWidth: "120px",
                  paddingLeft: "30px",
                }}
              />
            </div>
          </Table.Td>
        )}
        {columns.find((c) => c.key === "CreatedAt")?.visible && (
          <Table.Td style={cellStyle}>
            {new Date(order.CreatedAt)?.toLocaleString()}
          </Table.Td>
        )}
        {columns.find((c) => c.key === "UpdatedAt")?.visible && (
          <Table.Td style={cellStyle}>
            {new Date(order.UpdatedAt)?.toLocaleString()}
          </Table.Td>
        )}
        {columns.find((c) => c.key === "GhiChu")?.visible && (
          <Table.Td style={cellStyle}>{order.GhiChu}</Table.Td>
        )}
        {columns.find((c) => c.key === "deliveryMethod")?.visible && (
          <Table.Td style={cellStyle}>
            {order.deliveryMethod === "standard" ? "Tiêu chuẩn" : "Nhanh"}
          </Table.Td>
        )}
        {columns.find((c) => c.key === "payer")?.visible && (
          <Table.Td style={cellStyle}>
            {order.payer === "sender" ? "Người gửi" : "Người nhận"}
          </Table.Td>
        )}
        {columns.find((c) => c.key === "TaiXeID")?.visible && (
          // <Table.Td style={cellStyle}>
          //   {order?.CuocPhi?.toLocaleString()}₫
          // </Table.Td>
          <Table.Td style={cellStyle}>
            <Select
              placeholder="Chọn tài xế"
              value={order.TaiXeID || ""}
              onChange={async (value) => {
                if (!value || value === order.TaiXeID) return;
                try {
                  await orderService.assignDriver(order.DonHangId, value);
                  showNotification({
                    title: "Thành công",
                    message: "Đã gán tài xế cho đơn hàng",
                    color: "green",
                  });

                  const updatedOrder = {
                    ...order,
                    TaiXeID: value,
                    UpdatedAt: new Date().toISOString(),
                  };

                  dispatch(UPDATE_ORDER(updatedOrder));
                } catch (err) {
                  showNotification({
                    title: "Lỗi",
                    message: "Không thể gán tài xế",
                    color: "red",
                  });
                }
              }}
              data={drivers.map((d) => ({ label: d.HoTen, value: d.TaiXeID }))}
              size="xs"
              searchable
              clearable
            />
          </Table.Td>
        )}

        {columns.find((c) => c.key === "additionalServices")?.visible && (
          <Table.Td style={cellStyle}>
            {order.additionalServices
              ?.map((service) => {
                switch (service) {
                  case "viewBeforePay":
                    return "Xem hàng";
                  case "codCheck":
                    return "Đồng kiểm";
                  case "insurance":
                    return "Bảo hiểm";
                  default:
                    return service;
                }
              })
              .join(", ")}
          </Table.Td>
        )}
        {columns.find((c) => c.key === "packageType")?.visible && (
          <Table.Td style={cellStyle}>
            {order.packageType === "document"
              ? "Tài liệu"
              : order.packageType === "parcel"
              ? "Hàng thường"
              : order.packageType === "heavy_parcel"
              ? "Hàng nặng"
              : order.packageType === "fragile"
              ? "Dễ vỡ"
              : order.packageType}
          </Table.Td>
        )}

        <Table.Td style={cellStyle}>
          <Group gap="xs">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onViewDetail(order);
              }}
            >
              <IconEye size={18} />{" "}
            </ActionIcon>

            <ActionIcon
              variant="light"
              color="red"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(order.DonHangId);
              }}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Group justify="space-between" mb="md">
        <Group>
          <Menu position="bottom-start" shadow="md" width={200}>
            <Menu.Target>
              <Button
                leftSection={<IconColumns size={16} />}
                variant="outline"
                size="xs"
              >
                Columns
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>
                <Group justify="space-between">
                  <TextComponent fontSize="sm">Select columns</TextComponent>
                  <Button variant="subtle" size="xs" onClick={resetColumns}>
                    Reset
                  </Button>
                </Group>
              </Menu.Label>
              {columns.map((column) => (
                <Menu.Item key={column.key}>
                  <Checkbox
                    label={column.label}
                    checked={column.visible}
                    onChange={(e) => handleCheckboxChange(column.key, e)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Select
          value={limit?.toString()}
          onChange={(value) => onLimitChange?.(Number(value))}
          data={pageSizeOptions}
          style={{ width: 200 }}
          defaultValue={PageSize.TEN.toString()}
        />
      </Group>

      <ScrollArea
        type="scroll"
        scrollbars="x"
        offsetScrollbars
        style={{
          width: "100%",
          maxWidth: "80vw",
          position: "relative",
        }}
      >
        <Table
          striped
          highlightOnHover
          withTableBorder
          style={{ border: "1px solid #ccc", borderCollapse: "collapse" }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th
                style={{ ...headerStyle, minWidth: columnWidths.checkbox }}
              >
                <CheckboxComponent
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                />
              </Table.Th>
              {columns
                .filter((column) => column.visible)
                .map(({ key, label }) => (
                  <Table.Th
                    key={key}
                    style={{
                      ...headerStyle,
                      minWidth: columnWidths[key],
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort(key as keyof Order)}
                  >
                    {label}
                    {sortBy === key ? (
                      sortDirection === "asc" ? (
                        <IconCaretUpFilled size={14} />
                      ) : (
                        <IconCaretDownFilled size={14} />
                      )
                    ) : (
                      <IconCaretUpFilled size={14} color="gray" />
                    )}
                  </Table.Th>
                ))}
              <Table.Th
                style={{ ...headerStyle, minWidth: columnWidths.hanhDong }}
              >
                Hành động
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
      {total > 0 && (
        <Pagination
          total={Math.ceil(total / limit)}
          value={page}
          onChange={onPageChange}
          withEdges
          withControls
          mt="md"
        />
      )}
    </>
  );
};
