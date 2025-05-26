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
import { Order } from "../../api/type/OrderType";
import CheckboxComponent from "../CheckBox/CheckBoxComponent";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { orderService } from "../../api/service/OrderService";
import { showNotification } from "@mantine/notifications";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state_management/reducers/rootReducer";
import { UPDATE_ORDER } from "../../state_management/actions/actions";

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
  NhanVienID: "120px",
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
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orderSlice);
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
  const statusOptions = [
    { value: "Chờ xác nhận", label: "Chờ xác nhận" },
    { value: "Đang giao", label: "Đang giao" },
    { value: "Đã giao", label: "Đã giao" },
    { value: "Hủy", label: "Hủy" },
  ];
  // const handleUpdateStatus = async (orderId: string, newStatus: string) => {
  //   try {
  //     const result = await orderService.updateStatusOrder(orderId, newStatus);

  //     if (result.success) {
  //       setOrders((prevOrders) =>
  //         prevOrders.map((order) =>
  //           order.DonHangId === orderId
  //             ? {
  //                 ...order,
  //                 TrangThai: newStatus,
  //                 UpdateAt: new Date().toISOString(),
  //               }
  //             : order
  //         )
  //       );

  //       showNotification({
  //         title: "Cập nhật thành công",
  //         message: "Trạng thái đơn hàng đã được cập nhật",
  //         color: "green",
  //       });
  //     }
  //   } catch (error) {
  //     showNotification({
  //       title: "Lỗi",
  //       message: "Không thể cập nhật trạng thái đơn hàng",
  //       color: "red",
  //     });
  //   }
  // };
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
        <Table.Td style={cellStyle}>{order.NhanVienID}</Table.Td>
        <Table.Td style={cellStyle}>{order.NguoiGui}</Table.Td>
        <Table.Td style={cellStyle}>{order.NguoiNhan}</Table.Td>
        <Table.Td style={cellStyle}>{order.SDT}</Table.Td>
        <Table.Td style={cellStyle}>{order.DiaChiLayHang}</Table.Td>
        <Table.Td style={cellStyle}>{order.DiaChiGiaoHang}</Table.Td>
        <Table.Td style={cellStyle}>{order.CuocPhi.toLocaleString()}₫</Table.Td>
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
              style={{ width: "100%", minWidth: "120px", paddingLeft: "30px" }}
            />
          </div>
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
              color="blue"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Edit", order.DonHangId);
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
    <ScrollArea style={{ width: "1250px", overflowX: "auto" }}>
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
              style={{ ...headerStyle, minWidth: columnWidths.NhanVienID }}
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
