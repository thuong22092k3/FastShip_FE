import React from "react";
import { Table, ScrollArea, Badge } from "@mantine/core";
import { Order } from "../../api/type/OrderType";

type Props = {
  data: Order[];
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

export const OrderTable: React.FC<Props> = ({ data }) => {
  const rows = data.map((order) => (
    <Table.Tr key={order.DonHangId}>
      <Table.Td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {order.DonHangId}
      </Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {order.NhanVienId}
      </Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {order.NguoiGui}
      </Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {order.NguoiNhan}
      </Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {order.SDT}
      </Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {order.DiaChiLayHang}
      </Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {order.DiaChiGiaoHang}
      </Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {order.CuocPhi.toLocaleString()}₫
      </Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", padding: "8px" }}>
        <Badge color={getStatusColor(order.TrangThai)} variant="light">
          {order.TrangThai}
        </Badge>
      </Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {new Date(order.CreatedAt).toLocaleString()}
      </Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {new Date(order.UpdatedAt).toLocaleString()}
      </Table.Td>
      <Table.Td style={{ border: "1px solid #ccc", padding: "8px" }}>
        {order.GhiChu}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea style={{ width: "100%", overflowX: "auto" }}>
      {/* Ensures horizontal scroll */}
      <Table
        striped
        withTableBorder
        highlightOnHover
        style={{ minWidth: "1300px", border: "1px solid #ccc" }} // Ensure enough width for scrolling
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Đơn hàng ID
            </Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Nhân viên ID
            </Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Người gửi
            </Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Người nhận
            </Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", padding: "8px" }}>
              SĐT
            </Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Địa chỉ lấy
            </Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Địa chỉ giao
            </Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Cước phí
            </Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Trạng thái
            </Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Ngày tạo
            </Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Ngày cập nhật
            </Table.Th>
            <Table.Th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Ghi chú
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
