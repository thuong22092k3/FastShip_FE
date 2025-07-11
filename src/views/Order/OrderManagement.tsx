import {
  ActionIcon,
  Box,
  Button,
  Flex,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { showNotification } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import {
  IconArchive,
  IconCircleCheck,
  IconCircleDashedCheck,
  IconCubeSend,
  IconMailX,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderService } from "../../api/service/OrderService";
import { Order } from "../../api/type/OrderType";
import CardComponent from "../../components/Card/CardComponent";
import { OrderTable } from "../../components/Table/OrderTable";
import { DELETE_ORDER } from "../../state_management/actions/actions";
import { RootState } from "../../state_management/reducers/rootReducer";
import { uploadOrders } from "../../state_management/slices/orderSlice";
import NewModal from "./components/NewModal/NewModal";
import { OrderDetailModal } from "./components/OrderDtail";
import { SimpleDeleteModal } from "./components/SimpleModalDelete";

interface OrderStats {
  total: number;
  confirming: number;
  active: number;
  completed: number;
  cancelled: number;
}
export default function OrderManagementScreen() {
  const currentUser = useSelector(
    (state: RootState) => state.authSlice.currentUser
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orderSlice);
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);

  // const fetchOrders = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await orderService.getOrder();
  //     if (response && Array.isArray(response.orders)) {
  //       dispatch(uploadOrders(response.orders));
  //     } else {
  //       dispatch(uploadOrders([]));
  //     }
  //   } catch (err) {
  //     setError("Không thể tải dữ liệu đơn hàng");
  //     dispatch(uploadOrders([]));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchOrders();
  // }, [refreshKey]);
  const fetchOrders = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      let response;

      if (!currentUser) {
        setError("Không có thông tin người dùng");
        dispatch(uploadOrders([]));
        setLoading(false);
        return;
      }

      if (search) {
        response = await orderService.searchOrders(search, page, limit);
      } else {
        response = await orderService.getOrder(page, limit, {
          id: currentUser.id ?? "",
          role: currentUser.role || "",
        });
      }

      if (response && Array.isArray(response.data)) {
        dispatch(uploadOrders(response.data));
        setTotalOrders(response.total || 0);
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

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    setRefreshKey((prev) => prev + 1);
  }, []);
  useEffect(() => {
    fetchOrders(currentPage, itemsPerPage);
  }, [refreshKey, currentPage, itemsPerPage, search]);
  const handleOrderCreated = () => {
    setRefreshKey((prev) => prev + 1);
    setOpenCreateModal(false);
  };
  const [detailModalOpened, setDetailModalOpened] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleSelectOrder = (order: Order, isSelected: boolean) => {
    setSelectedOrders((prev) =>
      isSelected
        ? [...prev, order]
        : prev.filter((o) => o.DonHangId !== order.DonHangId)
    );
  };

  const calculateStats = (orders: Order[]): OrderStats => {
    return {
      total: orders.length,
      confirming: orders.filter((order) => order.TrangThai === "Chờ xác nhận")
        .length,
      active: orders.filter((order) => order.TrangThai === "Đang giao").length,
      completed: orders.filter((order) => order.TrangThai === "Đã giao").length,
      cancelled: orders.filter((order) => order.TrangThai === "Hủy").length,
    };
  };
  const stats = useMemo(() => {
    return calculateStats(orders);
  }, [orders]);

  console.log("selectedOrder", selectedOrder);
  return (
    <Box style={{ padding: 0, margin: 0 }}>
      <Title order={2}>Quản lý đơn hàng</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="lg" mb="xl">
        <CardComponent
          title="Tổng đơn hàng"
          value={stats.total}
          icon={<IconArchive size={24} />}
          color="yellow"
        />
        <CardComponent
          title="Đơn hàng đang chờ xác nhận"
          value={stats.confirming}
          icon={<IconCircleDashedCheck size={24} />}
          color="gray"
        />
        <CardComponent
          title="Đơn hàng đang giao"
          value={stats.active}
          icon={<IconCubeSend size={24} />}
          color="blue"
        />
        <CardComponent
          title="Đơn hàng đã giao"
          value={stats.completed}
          icon={<IconCircleCheck size={24} />}
          color="green"
        />
        <CardComponent
          title="Đơn hàng đã hủy"
          value={stats.cancelled}
          icon={<IconMailX size={24} />}
          color="red"
        />
      </SimpleGrid>

      <Flex justify="space-between" align="center" mt="md" mb="xl">
        <TextInput
          placeholder="Tìm kiếm đơn hàng"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          leftSection={<IconSearch size={16} />}
          rightSection={
            <ActionIcon onClick={handleSearch}>
              <IconSearch size={16} />
            </ActionIcon>
          }
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

      <OrderTable
        data={orders}
        onViewDetail={handleViewDetail}
        onDelete={handleDeleteClick}
        page={currentPage}
        onPageChange={setCurrentPage}
        total={totalOrders}
        limit={itemsPerPage}
        onLimitChange={(newLimit) => {
          setItemsPerPage(newLimit);
          setCurrentPage(1);
        }}
      />

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
