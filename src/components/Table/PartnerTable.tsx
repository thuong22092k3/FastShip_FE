import React, { useState } from "react";
import {
  Table,
  ScrollArea,
  Badge,
  Checkbox,
  Group,
  ActionIcon,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DoiTac } from "../../api/type/PartnerType";
import CheckboxComponent from "../CheckBox/CheckBoxComponent";
import { showNotification } from "@mantine/notifications";

type Props = {
  data: DoiTac[];
  loading?: boolean;
  error?: string;
  onEdit: (partner: DoiTac) => void;
  onDelete: (doiTacId: string) => void;
};

const getPartnerTypeColor = (type: string) => {
  switch (type) {
    case "NhaCungCap":
      return "blue";
    case "NhaPhanPhoi":
      return "green";
    case "CongTyVanChuyen":
      return "orange";
    case "TrungTamBaoHanh":
      return "red";
    default:
      return "gray";
  }
};

const columnWidths: { [key: string]: string } = {
  checkbox: "50px",
  DoiTacId: "120px",
  TenDoiTac: "180px",
  KieuDoiTac: "150px",
  NguoiLienLac: "150px",
  SDT: "120px",
  Email: "200px",
  DiaChi: "200px",
  SoGiayPhep: "150px",
  SucChua: "100px",
  KhuVucHoatDong: "180px",
  actions: "120px",
};

export const PartnerTable: React.FC<Props> = ({
  data,
  loading,
  error,
  onEdit,
  onDelete,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(data.map((partner) => partner.DoiTacId));
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

  const rows = data.map((partner) => {
    const isSelected = selectedRows.includes(partner.DoiTacId);
    return (
      <Table.Tr
        key={partner.DoiTacId}
        style={{ borderBottom: "1px solid #ccc" }}
      >
        <Table.Td style={cellStyle}>
          <Checkbox
            checked={isSelected}
            onChange={(event) =>
              handleRowSelect(partner.DoiTacId, event.currentTarget.checked)
            }
          />
        </Table.Td>
        <Table.Td style={cellStyle}>{partner.DoiTacId}</Table.Td>
        <Table.Td style={cellStyle}>{partner.TenDoiTac}</Table.Td>
        <Table.Td style={cellStyle}>
          <Badge color={getPartnerTypeColor(partner.KieuDoiTac)}>
            {partner.KieuDoiTac}
          </Badge>
        </Table.Td>
        <Table.Td style={cellStyle}>{partner.NguoiLienLac}</Table.Td>
        <Table.Td style={cellStyle}>{partner.SDT}</Table.Td>
        <Table.Td style={cellStyle}>{partner.Email}</Table.Td>
        <Table.Td style={cellStyle}>{partner.DiaChi}</Table.Td>
        <Table.Td style={cellStyle}>{partner.SoGiayPhep}</Table.Td>
        <Table.Td style={cellStyle}>{partner.SucChua}</Table.Td>
        <Table.Td style={cellStyle}>{partner.KhuVucHoatDong}</Table.Td>
        <Table.Td style={cellStyle}>
          <Group gap="xs">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(partner);
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
                onDelete(partner.DoiTacId);
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
    <ScrollArea style={{ width: "550px", overflowX: "auto" }}>
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <Table
          striped
          highlightOnHover
          withTableBorder
          style={{
            border: "1px solid #ccc",
            borderCollapse: "collapse",
          }}
        >
          <Table.Thead>
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
                style={{ ...headerStyle, minWidth: columnWidths.DoiTacId }}
              >
                ID Đối tác
              </Table.Th>
              <Table.Th
                style={{ ...headerStyle, minWidth: columnWidths.TenDoiTac }}
              >
                Tên đối tác
              </Table.Th>
              <Table.Th
                style={{ ...headerStyle, minWidth: columnWidths.KieuDoiTac }}
              >
                Loại đối tác
              </Table.Th>
              <Table.Th
                style={{ ...headerStyle, minWidth: columnWidths.NguoiLienLac }}
              >
                Người liên lạc
              </Table.Th>
              <Table.Th style={{ ...headerStyle, minWidth: columnWidths.SDT }}>
                SĐT
              </Table.Th>
              <Table.Th
                style={{ ...headerStyle, minWidth: columnWidths.Email }}
              >
                Email
              </Table.Th>
              <Table.Th
                style={{ ...headerStyle, minWidth: columnWidths.DiaChi }}
              >
                Địa chỉ
              </Table.Th>
              <Table.Th
                style={{ ...headerStyle, minWidth: columnWidths.SoGiayPhep }}
              >
                Số giấy phép
              </Table.Th>
              <Table.Th
                style={{ ...headerStyle, minWidth: columnWidths.SucChua }}
              >
                Sức chứa
              </Table.Th>
              <Table.Th
                style={{
                  ...headerStyle,
                  minWidth: columnWidths.KhuVucHoatDong,
                }}
              >
                Khu vực hoạt động
              </Table.Th>
              <Table.Th
                style={{ ...headerStyle, minWidth: columnWidths.actions }}
              >
                Thao tác
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {error ? (
              <Table.Tr>
                <Table.Td colSpan={Object.keys(columnWidths).length}>
                  <Text color="red">{error}</Text>
                </Table.Td>
              </Table.Tr>
            ) : data?.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={Object.keys(columnWidths).length}>
                  <Text>Không có dữ liệu đối tác</Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              rows
            )}
          </Table.Tbody>
        </Table>
      </div>
    </ScrollArea>
  );
};
