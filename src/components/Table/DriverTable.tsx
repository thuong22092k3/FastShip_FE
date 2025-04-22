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
import { IconEdit, IconTrash, IconUserCheck } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { TaiXe } from "../../api/type/EmployeeType";

type Props = {
  data: TaiXe[];
  loading?: boolean;
  error?: string;
  onDelete: (taiXeId: string) => void;
  onEdit: (taiXe: TaiXe) => void;
};

const columnWidths: { [key: string]: string } = {
  checkbox: "50px",
  taiXeId: "120px",
  hoTen: "180px",
  userName: "150px",
  email: "200px",
  hieuSuat: "120px",
  congViec: "150px",
  hanhDong: "120px",
};

const getPerformanceColor = (hieuSuat: number) => {
  if (hieuSuat >= 80) return "green";
  if (hieuSuat >= 50) return "yellow";
  return "red";
};

const getJobStatus = (congViec: number) => {
  switch (congViec) {
    case 0:
      return { label: "Rảnh", color: "green" };
    case 1:
      return { label: "Đang giao", color: "blue" };
    case 2:
      return { label: "Nghỉ phép", color: "orange" };
    default:
      return { label: "Không xác định", color: "gray" };
  }
};

export const TaiXeTable: React.FC<Props> = ({
  data,
  loading,
  error,
  onDelete,
  onEdit,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleRowSelect = (id: string, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
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

  const rows = data.map((taiXe) => {
    const isSelected = selectedRows.includes(taiXe.TaiXeID);
    const jobStatus = getJobStatus(taiXe.CongViec);

    return (
      <Table.Tr
        key={taiXe.TaiXeID}
        style={{ borderBottom: "1px solid #e0e0e0" }}
      >
        <Table.Td style={cellStyle}>
          <Checkbox
            checked={isSelected}
            onChange={(event) =>
              handleRowSelect(taiXe.TaiXeID, event.currentTarget.checked)
            }
          />
        </Table.Td>
        <Table.Td style={cellStyle}>{taiXe.TaiXeID}</Table.Td>
        <Table.Td style={cellStyle}>{taiXe.HoTen}</Table.Td>
        <Table.Td style={cellStyle}>{taiXe.UserName}</Table.Td>
        <Table.Td style={cellStyle}>{taiXe.Email}</Table.Td>
        <Table.Td style={cellStyle}>
          <Badge color={getPerformanceColor(taiXe.HieuSuat)}>
            {taiXe.HieuSuat}%
          </Badge>
        </Table.Td>
        <Table.Td style={cellStyle}>
          <Badge color={jobStatus.color}>{jobStatus.label}</Badge>
        </Table.Td>
        <Table.Td style={cellStyle}>
          <Group gap="xs">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={() => onEdit(taiXe)}
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => onDelete(taiXe.TaiXeID)}
            >
              <IconTrash size={18} />
            </ActionIcon>
            <ActionIcon variant="light" color="green">
              <IconUserCheck size={18} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea style={{ width: "100%", overflowX: "auto" }}>
      <Table
        striped
        highlightOnHover
        withTableBorder
        style={{
          border: "1px solid #e0e0e0",
          borderCollapse: "collapse",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ ...headerStyle, width: columnWidths.checkbox }}>
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={() => handleRowSelect("", !allSelected)}
              />
            </Table.Th>
            <Table.Th style={{ ...headerStyle, width: columnWidths.taiXeId }}>
              ID Tài xế
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
            <Table.Th style={{ ...headerStyle, width: columnWidths.congViec }}>
              Tình trạng
            </Table.Th>
            <Table.Th style={{ ...headerStyle, width: columnWidths.hanhDong }}>
              Hành động
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
