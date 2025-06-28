import {
  ActionIcon,
  Badge,
  Checkbox,
  Group,
  ScrollArea,
  Select,
  Table,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { showNotification } from "@mantine/notifications";
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { vehicleService } from "../../api/service/VehicleService";
import { Vehicle } from "../../api/type/VehicleType";
import CheckboxComponent from "../CheckBox/CheckBoxComponent";

type Props = {
  data: Vehicle[];
  loading?: boolean;
  error?: string;
  onViewDetail: (vehicle: Vehicle) => void;
  onDelete: (phuongTienId: string) => void;
  onEdit: (vehicle: Vehicle) => void;
};

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "đang hoạt động":
      return "green";
    case "đang bảo dưỡng":
      return "yellow";
    case "ngừng hoạt động":
      return "red";
    default:
      return "gray";
  }
};

const getMaintenanceColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "đã bảo dưỡng":
      return "green";
    case "đang bảo dưỡng":
      return "blue";
    case "chờ bảo dưỡng":
      return "orange";
    default:
      return "gray";
  }
};

const columnWidths: { [key: string]: string } = {
  checkbox: "50px",
  phuongTienId: "120px",
  hangXe: "150px",
  TaiXeID: "120px",
  bienSo: "120px",
  loaiXe: "150px",
  sucChua: "100px",
  trangThai: "150px",
  baoDuong: "150px",
  hanhDong: "120px",
};

export const VehicleTable: React.FC<Props> = ({
  data,
  loading,
  error,
  onViewDetail,
  onDelete,
  onEdit,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [sortBy, setSortBy] = useState<keyof Vehicle | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const statusOptions = [
    { value: "Đang hoạt động", label: "Đang hoạt động" },
    { value: "Đang bảo dưỡng", label: "Đang bảo dưỡng" },
    { value: "Ngừng hoạt động", label: "Ngừng hoạt động" },
  ];

  const maintenanceOptions = [
    { value: "Đã bảo dưỡng", label: "Đã bảo dưỡng" },
    { value: "Đang bảo dưỡng", label: "Đang bảo dưỡng" },
    { value: "Chờ bảo dưỡng", label: "Chờ bảo dưỡng" },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(data.map((vehicle) => vehicle.PhuongTienId));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  };

  const handleSort = (column: keyof Vehicle) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && !allSelected;

  const cellStyle = {
    borderRight: "1px solid #ccc",
    padding: "8px",
  };

  const headerStyle = {
    borderRight: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#f8f8f8",
  };

  const handleUpdateStatus = async (
    phuongTienId: string,
    newStatus: string
  ) => {
    try {
      await vehicleService.updateVehicle(phuongTienId, {
        TrangThai: newStatus,
      });
      showNotification({
        title: "Cập nhật thành công",
        message: "Trạng thái phương tiện đã được cập nhật",
        color: "green",
      });
    } catch (error) {
      showNotification({
        title: "Lỗi",
        message: "Không thể cập nhật trạng thái phương tiện",
        color: "red",
      });
    }
  };

  const handleUpdateMaintenance = async (
    phuongTienId: string,
    newMaintenanceStatus: string
  ) => {
    try {
      await vehicleService.updateVehicle(phuongTienId, {
        BaoDuong: newMaintenanceStatus,
      });
      showNotification({
        title: "Cập nhật thành công",
        message: "Trạng thái bảo dưỡng đã được cập nhật",
        color: "green",
      });
    } catch (error) {
      showNotification({
        title: "Lỗi",
        message: "Không thể cập nhật trạng thái bảo dưỡng",
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

  const rows = sortedData.map((vehicle) => {
    const isSelected = selectedRows.includes(vehicle.PhuongTienId);
    return (
      <Table.Tr
        key={vehicle.PhuongTienId}
        style={{ borderBottom: "1px solid #ccc" }}
      >
        <Table.Td style={cellStyle}>
          <Checkbox
            checked={isSelected}
            onChange={(event) =>
              handleRowSelect(vehicle.PhuongTienId, event.currentTarget.checked)
            }
          />
        </Table.Td>
        <Table.Td style={cellStyle}>{vehicle.PhuongTienId}</Table.Td>
        <Table.Td style={cellStyle}>{vehicle.HangXe}</Table.Td>
        <Table.Td style={cellStyle}>{vehicle.TaiXeID}</Table.Td>
        <Table.Td style={cellStyle}>{vehicle.BienSo}</Table.Td>
        <Table.Td style={cellStyle}>{vehicle.LoaiXe}</Table.Td>
        <Table.Td style={cellStyle}>{vehicle.SucChua}</Table.Td>
        <Table.Td style={cellStyle}>
          <div style={{ position: "relative" }}>
            <Badge
              color={getStatusColor(vehicle.TrangThai)}
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
              value={vehicle.TrangThai}
              onChange={(value) => {
                if (value && value !== vehicle.TrangThai) {
                  handleUpdateStatus(vehicle.PhuongTienId, value);
                }
              }}
              data={statusOptions}
              size="xs"
              style={{ width: "100%", minWidth: "120px", paddingLeft: "30px" }}
            />
          </div>
        </Table.Td>
        <Table.Td style={cellStyle}>
          <div style={{ position: "relative" }}>
            <Badge
              color={getMaintenanceColor(vehicle.BaoDuong)}
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
              value={vehicle.BaoDuong}
              onChange={(value) => {
                if (value && value !== vehicle.BaoDuong) {
                  handleUpdateMaintenance(vehicle.PhuongTienId, value);
                }
              }}
              data={maintenanceOptions}
              size="xs"
              style={{ width: "100%", minWidth: "120px", paddingLeft: "30px" }}
            />
          </div>
        </Table.Td>
        <Table.Td style={cellStyle}>
          <Group gap="xs">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(vehicle);
                console.log("Edit", vehicle.PhuongTienId);
              }}
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="red"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(vehicle.PhuongTienId);
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
    <ScrollArea
      type="scroll"
      scrollbars="x"
      offsetScrollbars
      style={{
        width: "100%",
        maxWidth: "85vw",
        position: "relative",
      }}
    >
      <Table
        striped
        highlightOnHover
        withTableBorder
        style={{
          border: "1px solid #ccc",
          borderCollapse: "collapse",
        }}
      >
        {/* <Table.Thead>
          <Table.Tr style={{ borderBottom: "1px solid #ccc" }}>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.checkbox }}
            >
              <CheckboxComponent
                isChecked={isChecked}
                setIsChecked={setIsChecked}
              />
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.phuongTienId }}
            >
              ID Phương tiện
            </Table.Th>
            <Table.Th style={{ ...headerStyle, minWidth: columnWidths.hangXe }}>
              Hãng xe
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.TaiXeID }}
            >
              Tài xế ID
            </Table.Th>
            <Table.Th style={{ ...headerStyle, minWidth: columnWidths.bienSo }}>
              Biển số
            </Table.Th>
            <Table.Th style={{ ...headerStyle, minWidth: columnWidths.loaiXe }}>
              Loại xe
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.sucChua }}
            >
              Sức chứa
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.trangThai }}
            >
              Trạng thái
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.baoDuong }}
            >
              Bảo dưỡng
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.hanhDong }}
            >
              Hành động
            </Table.Th>
          </Table.Tr>
        </Table.Thead> */}
        <Table.Th style={{ ...headerStyle, minWidth: columnWidths.checkbox }}>
          <CheckboxComponent
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </Table.Th>
        {[
          { key: "PhuongTienId", label: "ID Phương tiện" },
          { key: "HangXe", label: "Hãng xe" },
          { key: "TaiXeID", label: "Tài xế ID" },
          { key: "BienSo", label: "Biển số" },
          { key: "LoaiXe", label: "Loại xe" },
          { key: "SucChua", label: "Sức chứa" },
          { key: "trangThai", label: "Trạng thái" },
          { key: "baoDuong", label: "Bảo dưỡng" },
        ].map(({ key, label }) => (
          <Table.Th
            key={key}
            style={{
              ...headerStyle,
              minWidth: columnWidths[key],
              cursor: "pointer",
            }}
            onClick={() => handleSort(key as keyof Vehicle)}
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
        <Table.Th style={{ ...headerStyle, minWidth: columnWidths.hanhDong }}>
          Hành động
        </Table.Th>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
