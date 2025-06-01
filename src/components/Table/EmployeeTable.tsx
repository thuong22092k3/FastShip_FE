import React, { useState } from "react";
import {
  Table,
  ScrollArea,
  Badge,
  Checkbox,
  Group,
  ActionIcon,
  Select,
} from "@mantine/core";
import "@mantine/core/styles.css";
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconEdit,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { NhanVien } from "../../api/type/EmployeeType";
import CheckboxComponent from "../CheckBox/CheckBoxComponent";

type Props = {
  data: NhanVien[];
  loading?: boolean;
  error?: string;
  onDelete: (UserName: string) => void;
  onEdit: (nhanVien: NhanVien) => void;
};

const columnWidths: { [key: string]: string } = {
  checkbox: "50px",
  NhanVienID: "120px",
  hoTen: "180px",
  userName: "150px",
  email: "200px",
  hieuSuat: "120px",
  hanhDong: "120px",
};

const getPerformanceColor = (hieuSuat: number) => {
  if (hieuSuat >= 80) return "green";
  if (hieuSuat >= 50) return "yellow";
  return "red";
};

export const NhanVienTable: React.FC<Props> = ({
  data,
  loading,
  error,
  onDelete,
  onEdit,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [sortBy, setSortBy] = useState<keyof NhanVien | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleRowSelect = (id: string, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  };
  const handleSort = (column: keyof NhanVien) => {
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
    borderRight: "1px solid #e0e0e0",
    padding: "12px",
  };

  const headerStyle = {
    borderRight: "1px solid #e0e0e0",
    padding: "12px",
    backgroundColor: "#f5f5f5",
    fontWeight: 600,
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

  const rows = sortedData.map((nhanVien) => {
    const isSelected = selectedRows.includes(nhanVien.NhanVienID);

    return (
      <Table.Tr
        key={nhanVien.NhanVienID}
        style={{ borderBottom: "1px solid #e0e0e0" }}
      >
        <Table.Td style={cellStyle}>
          <Checkbox
            checked={isSelected}
            onChange={(event) =>
              handleRowSelect(nhanVien.NhanVienID, event.currentTarget.checked)
            }
          />
        </Table.Td>
        <Table.Td style={cellStyle}>{nhanVien.NhanVienID}</Table.Td>
        <Table.Td style={cellStyle}>{nhanVien.HoTen}</Table.Td>
        <Table.Td style={cellStyle}>{nhanVien.UserName}</Table.Td>
        <Table.Td style={cellStyle}>{nhanVien.Email}</Table.Td>
        <Table.Td style={cellStyle}>
          <Badge color={getPerformanceColor(nhanVien.HieuSuat)}>
            {nhanVien.HieuSuat}%
          </Badge>
        </Table.Td>
        <Table.Td style={cellStyle}>
          <Group gap="xs">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={() => onEdit(nhanVien)}
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => onDelete(nhanVien.UserName)}
            >
              <IconTrash size={18} />
            </ActionIcon>
            <ActionIcon variant="light" color="teal">
              <IconUser size={18} />
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
        maxWidth: "80vw",
        position: "relative",
      }}
    >
      <Table
        striped
        highlightOnHover
        withTableBorder
        style={{
          border: "1px solid #e0e0e0",
          borderCollapse: "collapse",
        }}
      >
        {/* <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ ...headerStyle, width: columnWidths.checkbox }}>
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={() => handleRowSelect("", !allSelected)}
              />
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, width: columnWidths.NhanVienID }}
            >
              ID Nhân viên
            </Table.Th>
            <Table.Th style={{ ...headerStyle, width: columnWidths.hoTen }}>
              Họ tên
            </Table.Th>
            <Table.Th style={{ ...headerStyle, width: columnWidths.userName }}>
              Tài khoản
            </Table.Th>
            <Table.Th style={{ ...headerStyle, width: columnWidths.email }}>
              Email
            </Table.Th>
            <Table.Th style={{ ...headerStyle, width: columnWidths.hieuSuat }}>
              Hiệu suất
            </Table.Th>
            <Table.Th style={{ ...headerStyle, width: columnWidths.hanhDong }}>
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
          { key: "NhanVienID", label: "ID Nhân viên" },
          { key: "HoTen", label: "Họ tên" },
          { key: "UserName", label: "Tài khoản" },
          { key: "Email", label: "Email" },
          { key: "HieuSuat", label: "Hiệu suất" },
        ].map(({ key, label }) => (
          <Table.Th
            key={key}
            style={{
              ...headerStyle,
              minWidth: columnWidths[key],
              cursor: "pointer",
            }}
            onClick={() => handleSort(key as keyof NhanVien)}
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
