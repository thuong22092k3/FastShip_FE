import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  TextInput,
  Title,
  Pagination,
} from "@mantine/core";
import {
  IconSearch,
  IconPlus,
  IconArchive,
  IconCircleCheck,
  IconFolderCheck,
} from "@tabler/icons-react";
import "@mantine/core/styles.css";
import { useCallback, useEffect, useState } from "react";
import { OrderTable } from "../../components/Table/OrderTable";
import { Order } from "../../api/type/OrderType";
import CardComponent from "../../components/Card/CardComponent";
import NewModal from "./NewModal";
import { orderService } from "../../api/service/OrderService";
import { OrderDetailModal } from "./OrderDtail";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { showNotification } from "@mantine/notifications";
import { SimpleDeleteModal } from "./SimpleModalDelete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state_management/reducers/rootReducer";
import { uploadOrders } from "../../state_management/slices/orderSlice";
import { DELETE_ORDER } from "../../state_management/actions/actions";

export default function OrderManagementScreen() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orderSlice);
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrder();
      if (response && Array.isArray(response.orders)) {
        dispatch(uploadOrders(response.orders));
      } else {
        dispatch(uploadOrders([]));
      }
    } catch (err) {
      setError("Không thể tải dữ liệu đơn hàng");
      dispatch(uploadOrders([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [refreshKey]);

  const filteredOrders = orders.filter(
    (order) =>
      (order.NguoiNhan?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
      (order.SDT ?? "").includes(search)
  );

  const handleOrderCreated = () => {
    setRefreshKey((prev) => prev + 1);
    setOpenCreateModal(false);
  };
  const [detailModalOpened, setDetailModalOpened] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const handleViewDetail = async (order: Order) => {
    try {
      setDetailLoading(true);
      const detailedOrder = await orderService.getDetailOrder(order.DonHangId);
      setSelectedOrder(detailedOrder);
      setDetailModalOpened(true);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    } finally {
      setDetailLoading(false);
    }
  };
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (donHangId: string) => {
    setOrderToDelete(donHangId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!orderToDelete) return;

    try {
      setIsDeleting(true);

      await orderService.deleteOrder(orderToDelete);

      dispatch(DELETE_ORDER([orderToDelete]));
      showNotification({
        title: "Thành công",
        message: "Đã xóa đơn hàng thành công",
        color: "green",
      });

      setRefreshKey((prev) => prev + 1);
      setDeleteModalOpen(false);
    } catch (error) {
      showNotification({
        title: "Lỗi",
        message: "Không thể xóa đơn hàng",
        color: "red",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  console.log("Delete modal state:", deleteModalOpen);
  console.log("Order to delete:", orderToDelete);

  // const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  // const handleDeleteClick = (donHangId: string) => {
  //   setOrderToDelete(donHangId);
  //   setDeleteModalOpen(true);
  // };
  // Trong DeleteConfirmationModal

  return (
    <Box style={{ padding: 0, margin: 0 }}>
      <Title order={2}>Quản lý đơn hàng</Title>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <CardComponent
          title="Tổng đơn hàng"
          value={orders.length}
          icon={<IconArchive size={24} />}
        />
        <CardComponent
          title="Các đơn hàng đang hoạt động"
          value={filteredOrders.length}
          icon={<IconFolderCheck size={24} />}
        />
        <CardComponent
          title="Các đơn hàng đã hoàn thành"
          value={filteredOrders.length}
          icon={<IconCircleCheck size={24} />}
        />
      </Box>
      <Flex justify="space-between" align="center" mt="md" mb="xl">
        <TextInput
          placeholder="Tìm kiếm đơn hàng"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          style={{ width: 300 }}
        />
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => setOpenCreateModal(true)}
        >
          Tạo đơn hàng mới
        </Button>
        {/* <Button onClick={() => setDeleteModalOpen(true)}>
            Test Open Delete Modal
          </Button> */}
      </Flex>

      {loading ? (
        <Box py="xl">Đang tải dữ liệu...</Box>
      ) : error ? (
        <Box py="xl">{error}</Box>
      ) : filteredOrders.length === 0 ? (
        <Box py="xl">Không tìm thấy đơn hàng nào</Box>
      ) : (
        <>
          <OrderTable
            data={filteredOrders}
            onViewDetail={handleViewDetail}
            onDelete={handleDeleteClick}
          />

          <Pagination
            total={Math.ceil(filteredOrders.length / 10)}
            value={page}
            onChange={setPage}
            mt="xl"
          />
        </>
      )}

      <NewModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onOrderCreated={handleOrderCreated}
      />
      <OrderDetailModal
        opened={detailModalOpened}
        onClose={() => setDetailModalOpened(false)}
        order={selectedOrder}
        loading={detailLoading}
      />
      <SimpleDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </Box>
  );
}
