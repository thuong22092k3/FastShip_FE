import React, { useState } from "react";
import {
  Table,
  ScrollArea,
  Badge,
  Checkbox,
  Group,
  ActionIcon,
} from "@mantine/core";
import { Order } from "../../api/type/OrderType";
import CheckboxComponent from "../CheckBox/CheckBoxComponent";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";

type Props = {
  data: Order[];
  loading?: boolean;
  error?: string;
  onViewDetail: (order: Order) => void;
  onDelete: (donHangId: string) => void;
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
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
  donHangId: "120px",
  nhanVienId: "120px",
  nguoiGui: "150px",
  nguoiNhan: "150px",
  sdt: "120px",
  diaChiLayHang: "200px",
  diaChiGiaoHang: "200px",
  cuocPhi: "100px",
  trangThai: "100px",
  ngayTao: "160px",
  ngayCapNhat: "160px",
  ghiChu: "200px",
  hanhDong: "100px",
};

export const OrderTable: React.FC<Props> = ({
  data,
  loading,
  error,
  onViewDetail,
  onDelete,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [detailModalOpened, setDetailModalOpened] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
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

  const rows = data.map((order) => {
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
        <Table.Td style={cellStyle}>{order.DonHangId}</Table.Td>
        <Table.Td style={cellStyle}>{order.NhanVienId}</Table.Td>
        <Table.Td style={cellStyle}>{order.NguoiGui}</Table.Td>
        <Table.Td style={cellStyle}>{order.NguoiNhan}</Table.Td>
        <Table.Td style={cellStyle}>{order.SDT}</Table.Td>
        <Table.Td style={cellStyle}>{order.DiaChiLayHang}</Table.Td>
        <Table.Td style={cellStyle}>{order.DiaChiGiaoHang}</Table.Td>
        <Table.Td style={cellStyle}>{order.CuocPhi.toLocaleString()}₫</Table.Td>
        <Table.Td style={cellStyle}>
          <Badge color={getStatusColor(order.TrangThai)} variant="light">
            {order.TrangThai}
          </Badge>
        </Table.Td>
        <Table.Td style={cellStyle}>
          {new Date(order.CreatedAt).toLocaleString()}
        </Table.Td>
        <Table.Td style={cellStyle}>
          {new Date(order.UpdatedAt).toLocaleString()}
        </Table.Td>
        <Table.Td style={cellStyle}>{order.GhiChu}</Table.Td>
        <Table.Td style={cellStyle}>
          <Group gap="xs">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={() => onViewDetail(order)}
            >
              <IconEye size={18} />{" "}
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="blue"
              onClick={() => console.log("Edit", order.DonHangId)}
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => onDelete(order.DonHangId)}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea style={{ width: "500px", overflowX: "auto" }}>
      <Table
        striped
        highlightOnHover
        withTableBorder
        style={{
          // minWidth: "1300px",
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
              style={{ ...headerStyle, minWidth: columnWidths.donHangId }}
            >
              Đơn hàng ID
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.nhanVienId }}
            >
              Nhân viên ID
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.nguoiGui }}
            >
              Người gửi
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.nguoiNhan }}
            >
              Người nhận
            </Table.Th>
            <Table.Th style={{ ...headerStyle, minWidth: columnWidths.sdt }}>
              SĐT
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.diaChiLayHang }}
            >
              Địa chỉ lấy
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.diaChiGiaoHang }}
            >
              Địa chỉ giao
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.cuocPhi }}
            >
              Cước phí
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.trangThai }}
            >
              Trạng thái
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.ngayTao }}
            >
              Ngày tạo
            </Table.Th>
            <Table.Th
              style={{ ...headerStyle, minWidth: columnWidths.ngayCapNhat }}
            >
              Ngày cập nhật
            </Table.Th>
            <Table.Th style={{ ...headerStyle, minWidth: columnWidths.ghiChu }}>
              Ghi chú
            </Table.Th>
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
  );
};
