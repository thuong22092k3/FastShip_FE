import { ActionIcon, Box, Group, ScrollArea, Table } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";
import { Location } from "../../api/type/LocationType"; // Giả sử bạn có kiểu này
import CheckboxComponent from "../CheckBox/CheckBoxComponent";

type Props = {
  data: Location[];
  loading?: boolean;
  error?: string;
  onViewDetail?: (location: Location) => void;
  onDelete: (DiaDiemId: string) => void;
  onEdit: (location: Location) => void;
};

const columnWidths: { [key: string]: string } = {
  checkbox: "50px",
  DiaDiemId: "120px",
  name: "200px",
  address: "250px",
  description: "250px",
  actions: "120px",
};

const cellStyle = {
  borderRight: "1px solid #ccc",
  padding: "8px",
};

const headerStyle = {
  borderRight: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#f8f8f8",
};

const LocationTable: React.FC<Props> = ({
  data,
  loading,
  error,
  onViewDetail,
  onDelete,
  onEdit,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(data.map((item) => item.DiaDiemId));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  };

  const allSelected = data.length > 0 && selectedRows.length === data.length;

  const rows = data.map((location) => {
    const isSelected = selectedRows.includes(location.DiaDiemId);
    return (
      <Table.Tr
        key={location.DiaDiemId}
        style={{ borderBottom: "1px solid #ccc" }}
      >
        <Table.Td style={cellStyle}>
          <CheckboxComponent
            isChecked={isSelected}
            setIsChecked={(checked) =>
              handleRowSelect(location.DiaDiemId, checked)
            }
          />
        </Table.Td>
        <Table.Td style={cellStyle}>{location.DiaDiemId}</Table.Td>
        <Table.Td style={cellStyle}>{location.name}</Table.Td>
        <Table.Td style={cellStyle}>
          <Group gap="xs">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={() => onEdit(location)}
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="green"
              onClick={() => {
                onViewDetail?.(location);
              }}
            >
              <IconEye size={18} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => onDelete(location.DiaDiemId)}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  if (loading) {
    return (
      <Box py="xl" ta="center">
        Đang tải dữ liệu...
      </Box>
    );
  }

  if (error) {
    return (
      <Box py="xl" c="red" ta="center">
        {error}
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box py="xl" ta="center">
        Không tìm thấy địa điểm nào
      </Box>
    );
  }

  return (
    <ScrollArea style={{ width: "100%", overflowX: "auto" }}>
      <Table
        striped
        highlightOnHover
        withTableBorder
        style={{ border: "1px solid #ccc", borderCollapse: "collapse" }}
      >
        <Table.Thead>
          <Table.Tr style={{ borderBottom: "1px solid #ccc" }}>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.checkbox }}
            >
              <CheckboxComponent
                isChecked={allSelected}
                setIsChecked={handleSelectAll}
              />
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.DiaDiemId }}
            >
              ID Địa điểm
            </Table.Th>
            <Table.Th style={{ ...headerStyle, minWidth: columnWidths.name }}>
              Tên địa điểm
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.actions }}
            >
              Hành động
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default LocationTable;
