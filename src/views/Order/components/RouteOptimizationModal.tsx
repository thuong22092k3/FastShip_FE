import {
  Badge,
  Center,
  Divider,
  Group,
  Loader,
  Modal,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { orderService } from "../../../api/service/OrderService";
import { Order } from "../../../api/type/OrderType";

interface RouteModalProps {
  opened: boolean;
  onClose: () => void;
  order: Order | null;
}

interface RouteStop {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  type: "pickup" | "delivery" | "transit";
  arrivalTime?: string;
}

interface RouteData {
  route: number[];
  stops: RouteStop[];
  totalDistance: number;
  polyline: [number, number][];
  estimatedTime: string;
}

export function RouteModal({ opened, onClose, order }: RouteModalProps) {
  const [routeData, setRouteData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("optimized");

  useEffect(() => {
    if (opened && order) {
      fetchRouteData();
    } else {
      setRouteData(null);
    }
  }, [opened, order]);

  const fetchRouteData = async () => {
    if (!order) return;

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

  const getCurrentRouteData = (): RouteData | null => {
    if (!routeData?.data) return null;

    switch (activeTab) {
      case "ga":
        return routeData.data.comparison.ga;
      case "aco":
        return routeData.data.comparison.aco;
      default:
        return routeData.data.optimizedRoute;
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
        <>
          <Tabs
            value={activeTab}
            onChange={(value) => setActiveTab(value ?? "optimized")}
          >
            <Tabs.List>
              <Tabs.Tab value="optimized">Tối ưu</Tabs.Tab>
              <Tabs.Tab value="ga">Thuật toán GA</Tabs.Tab>
              <Tabs.Tab value="aco">Thuật toán ACO</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <Group align="flex-start" grow mt="md">
            {/* <div style={{ flex: 2 }}>
              <RouteMap
                order={order}
                routeData={getCurrentRouteData() ?? undefined}
              />
            </div> */}

            <div style={{ flex: 1 }}>
              <Stack>
                <Text size="lg" fw={500}>
                  Chi tiết lộ trình
                </Text>
                <Divider />

                {getCurrentRouteData()?.stops?.length ? (
                  <Stack gap="sm">
                    {getCurrentRouteData()?.stops.map(
                      (stop: RouteStop, index: number) => (
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
                          {stop.arrivalTime && (
                            <Text size="xs" c="dimmed">
                              Thời gian dự kiến: {stop.arrivalTime}
                            </Text>
                          )}
                          {index <
                            (getCurrentRouteData()?.stops.length || 0) - 1 && (
                            <Divider my="sm" />
                          )}
                        </div>
                      )
                    )}
                  </Stack>
                ) : (
                  <Text c="dimmed">Không có dữ liệu lộ trình</Text>
                )}

                <Divider mt="md" />
                <Text size="sm">
                  <Text span fw={500}>
                    Tổng khoảng cách:
                  </Text>{" "}
                  {getCurrentRouteData()?.totalDistance?.toFixed(2) || "0"} km
                </Text>
                <Text size="sm">
                  <Text span fw={500}>
                    Thời gian dự kiến:
                  </Text>{" "}
                  {getCurrentRouteData()?.estimatedTime || "Chưa xác định"}
                </Text>

                {activeTab === "optimized" &&
                  routeData?.data?.comparison?.improvement && (
                    <>
                      <Divider mt="md" />
                      <Text size="sm" c="green">
                        <Text span fw={500}>
                          Cải thiện:
                        </Text>{" "}
                        {routeData.data.comparison.improvement.percentage}% (
                        {routeData.data.comparison.improvement.distance} km)
                      </Text>
                    </>
                  )}
              </Stack>
            </div>
          </Group>
        </>
      )}
    </Modal>
  );
}
