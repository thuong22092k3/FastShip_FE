import {
  Badge,
  Center,
  Divider,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { orderService } from "../../../api/service/OrderService";
import { Order } from "../../../api/type/OrderType";
import { RouteMap } from "./RouteMap";

interface RouteModalProps {
  opened: boolean;
  onClose: () => void;
  order: Order | null;
}

export function RouteModal({ opened, onClose, order }: RouteModalProps) {
  const [routeData, setRouteData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (opened && order) {
      fetchRouteData();
    } else {
      setRouteData(null);
    }
  }, [opened, order]);

  const fetchRouteData = async () => {
    if (!order) return; // đảm bảo order không null

    setLoading(true);
    try {
      const data = await orderService.optimizeRoute(order);
      setRouteData(data);
    } catch (error) {
      console.error("Failed to fetch route data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Lộ trình đơn hàng ${order?.DonHangId}`}
      size="xl"
      centered
    >
      {loading ? (
        <Center h={400}>
          <Loader size="xl" />
        </Center>
      ) : (
        <Group align="flex-start" grow>
          <div style={{ flex: 2 }}>
            <RouteMap order={order} routeData={routeData} />
          </div>

          <div style={{ flex: 1 }}>
            <Stack>
              <Text size="lg" fw={500}>
                Chi tiết lộ trình
              </Text>
              <Divider />

              {routeData?.stops?.length ? (
                <Stack gap="sm">
                  {routeData.stops.map((stop: any, index: number) => (
                    <div key={index}>
                      <Group>
                        <Badge
                          color={
                            stop.type === "pickup"
                              ? "blue"
                              : stop.type === "delivery"
                              ? "green"
                              : "orange"
                          }
                        >
                          {stop.type === "pickup"
                            ? "Điểm gửi"
                            : stop.type === "delivery"
                            ? "Điểm nhận"
                            : `Bưu cục trung chuyển`}
                        </Badge>
                        <Text fw={500}>{stop.name}</Text>
                      </Group>
                      <Text size="sm" c="dimmed">
                        {stop.address}
                      </Text>
                      <Text size="xs" c="dimmed">
                        Thời gian dự kiến: {stop.arrivalTime}
                      </Text>
                      {index < routeData.stops.length - 1 && (
                        <Divider my="sm" />
                      )}
                    </div>
                  ))}
                </Stack>
              ) : (
                <Text c="dimmed">Không có dữ liệu lộ trình</Text>
              )}

              {/* Hiển thị thông tin tổng */}
              <Divider mt="md" />
              <Text size="sm">
                <Text span fw={500}>
                  Tổng khoảng cách:
                </Text>{" "}
                {routeData?.totalDistance?.toFixed(2) || "0"} km
              </Text>
              <Text size="sm">
                <Text span fw={500}>
                  Thời gian dự kiến:
                </Text>{" "}
                {routeData?.estimatedTime || "Chưa xác định"}
              </Text>
            </Stack>
          </div>
        </Group>
      )}
    </Modal>
  );
}
