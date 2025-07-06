// src/views/Statistics/StatisticsScreen.tsx
import {
  Badge,
  Button,
  Container,
  Group,
  Paper,
  Progress,
  Select,
  SimpleGrid,
  Skeleton,
  Table,
  Text,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  IconBox,
  IconCalendar,
  IconChartBar,
  IconClock,
  IconMapPin,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { statisticsService } from "../../api/service/StatisticsService";
import CardComponent2 from "../../components/Card/CardComponent2";

interface OverviewData {
  totalOrders: number;
  currentMonthOrders: number;
  percentageChange: string;
  statusStats: { status: string; count: number }[];
  staffStats: { staffId: string; count: number }[];
  monthlyStats: { month: string; count: number; completed: number }[];
}

interface LocationStats {
  address: string;
  count: number;
}

interface StaffPerformance {
  staffId: string;
  totalOrders?: number;
  completedOrders: number;
  completionRate: number;
  avgProcessingTime: number;
}

export default function StatisticScreen() {
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [locationStats, setLocationStats] = useState<LocationStats[]>([]);
  const [staffPerformance, setStaffPerformance] = useState<StaffPerformance[]>(
    []
  );
  const [monthlyStats, setMonthlyStats] = useState<
    { month: string; count: number; completed: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<string>("monthly");

  const form = useForm({
    initialValues: {
      dateRange: [null, null] as [Date | null, Date | null],
      status: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [overviewRes, locationRes, performanceRes, monthlyRes] =
        await Promise.all([
          statisticsService.getOverview(),
          statisticsService.getLocationStats(),
          statisticsService.getStaffPerformance(),
          statisticsService.getMonthlyStats(),
        ]);

      setOverviewData(overviewRes.data);
      setLocationStats(locationRes.data);
      setStaffPerformance(performanceRes.data);
      setMonthlyStats(monthlyRes.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setError("Không thể tải dữ liệu thống kê. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      const { dateRange, status } = form.values;
      const [fromDate, toDate] = dateRange;

      const params = {
        fromDate: fromDate?.toISOString(),
        toDate: toDate?.toISOString(),
        TrangThai: status,
      };

      const res = await statisticsService.filterOrders(params);
      console.log("Filtered data:", res);
    } catch (error) {
      console.error("Error filtering data:", error);
      setError("Lỗi khi lọc dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const normalized = status.trim().toLowerCase();

    switch (normalized) {
      case "đã giao":
        return "teal";
      case "chờ xác nhận":
        return "blue";
      case "đang giao":
        return "yellow";
      case "hủy":
        return "red";
      default:
        return "gray";
    }
  };

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Paper withBorder p="md" radius="md">
          <Text color="red" fw={500}>
            {error}
          </Text>
          <Button mt="md" onClick={fetchData}>
            Thử lại
          </Button>
        </Paper>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Skeleton height={50} mb="xl" />
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" mb="xl">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height={120} radius="md" />
          ))}
        </SimpleGrid>
        <Skeleton height={300} mb="xl" radius="md" />
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb="xl">
          <Skeleton height={300} radius="md" />
          <Skeleton height={300} radius="md" />
        </SimpleGrid>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Paper withBorder p="md" radius="md" mb="xl">
        <Group justify="space-between" mb="md">
          <Title order={3}>Bộ lọc thống kê</Title>
          <Select
            placeholder="Chọn khoảng thời gian"
            data={[
              { value: "daily", label: "Hôm nay" },
              { value: "weekly", label: "1 Tuần" },
              { value: "monthly", label: "1 Tháng" },
              { value: "yearly", label: "1 Năm" },
              { value: "custom", label: "Tùy chọn" },
            ]}
            value={timeRange}
            onChange={(value) => setTimeRange(value || "monthly")}
            leftSection={<IconCalendar size={16} />}
          />
        </Group>

        {timeRange === "custom" && (
          <DatePickerInput
            type="range"
            label="Chọn khoảng ngày"
            placeholder="Chọn khoảng ngày"
            valueFormat="DD/MM/YYYY"
            mb="md"
            {...form.getInputProps("dateRange")}
          />
        )}

        <Select
          label="Trạng thái đơn hàng"
          placeholder="Chọn trạng thái"
          data={[
            { value: "Đã giao", label: "Đã giao" },
            { value: "Chờ xác nhận", label: "Chờ xác nhận" },
            { value: "Đang giao", label: "Đang giao" },
            { value: "Hủy", label: "Hủy" },
          ]}
          {...form.getInputProps("status")}
        />

        <Button mt="md" onClick={handleFilter} loading={loading}>
          Áp dụng bộ lọc
        </Button>
      </Paper>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" mb="xl">
        <CardComponent2
          title="Tổng đơn hàng"
          value={overviewData?.totalOrders?.toString() || "0"}
          updatedText="Toàn thời gian"
          icon={<IconBox size={24} />}
          trend={
            overviewData?.percentageChange
              ? parseFloat(overviewData.percentageChange) > 0
                ? "up"
                : "down"
              : undefined
          }
          trendValue={overviewData?.percentageChange}
        />
        <CardComponent2
          title="Đơn hàng tháng này"
          value={overviewData?.currentMonthOrders?.toString() || "0"}
          updatedText="So với tháng trước"
          icon={<IconChartBar size={24} />}
          trend={
            overviewData?.percentageChange
              ? parseFloat(overviewData.percentageChange) > 0
                ? "up"
                : "down"
              : undefined
          }
          trendValue={overviewData?.percentageChange}
        />
        <CardComponent2
          title="Đơn hoàn thành"
          value={
            overviewData?.statusStats
              ?.find((s) => s.status === "Đã giao")
              ?.count.toString() || "0"
          }
          updatedText={`${Math.round(
            ((overviewData?.statusStats?.find((s) => s.status === "Đã giao")
              ?.count || 0) /
              (overviewData?.totalOrders || 1)) *
              100
          )}% tổng đơn`}
          icon={<IconClock size={24} />}
        />
        <CardComponent2
          title="Nhân viên tích cực"
          value={overviewData?.staffStats?.[0]?.staffId || "N/A"}
          updatedText={`${overviewData?.staffStats?.[0]?.count || 0} đơn`}
          icon={<IconUsers size={24} />}
        />
      </SimpleGrid>

      <Paper withBorder p="md" radius="md" mb="xl">
        <Title order={3} mb="sm">
          Biểu đồ đơn hàng theo tháng
        </Title>
        <div
          style={{
            height: 300,
            display: "flex",
            alignItems: "flex-end",
            gap: "2rem",
            padding: "1rem",
            border: "1px dashed #ccc", // Thêm border để debug
          }}
        >
          {monthlyStats.map((month) => {
            // Debug: Log dữ liệu từng tháng
            console.log(`Month ${month.month}:`, month.count, month.completed);

            // Tính maxCount, đảm bảo ít nhất là 1
            const maxCount = Math.max(1, ...monthlyStats.map((m) => m.count));

            // Tính chiều cao (đảm bảo không NaN và không âm)
            const totalHeight =
              Math.max(0, (month.count / maxCount) * 200) || 0;
            const completedHeight =
              Math.max(0, (month.completed / maxCount) * 200) || 0;
            const remainingHeight = Math.max(0, totalHeight - completedHeight);

            // Debug: Log các giá trị tính toán
            console.log(`Calculated heights for ${month.month}:`, {
              totalHeight,
              completedHeight,
              remainingHeight,
            });

            return (
              <div
                key={month.month}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "40px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "200px",
                    width: "100%",
                    justifyContent: "flex-end",
                    border: "1px solid rgba(0,0,0,0.1)", // Thêm border để debug
                  }}
                >
                  {/* Phần đơn hoàn thành */}
                  <div
                    style={{
                      height: `${completedHeight}px`,
                      backgroundColor: "#00C1A2",
                      borderRadius: "4px 4px 0 0",
                      minHeight: month.completed > 0 ? "4px" : "0",
                    }}
                  />
                  <div
                    style={{
                      height: `${remainingHeight}px`,
                      backgroundColor: "#4D6CFA",
                      borderRadius: month.completed > 0 ? "0 0 4px 4px" : "4px",
                      minHeight:
                        month.count - month.completed > 0 ? "4px" : "0",
                    }}
                  />
                </div>
                <Text size="sm" mt="sm">
                  {month.month.split("-")[1]}/
                  {month.month.split("-")[0].slice(-2)}
                </Text>
                <Text size="xs" c="dimmed">
                  {month.count} đơn
                </Text>
              </div>
            );
          })}
        </div>
        <Group gap="md" mt="xl">
          <Group gap="xs">
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: "#4D6CFA",
                borderRadius: 4,
              }}
            />
            <Text size="sm">Tổng đơn</Text>
          </Group>
          <Group gap="xs">
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: "#00C1A2",
                borderRadius: 4,
              }}
            />
            <Text size="sm">Hoàn thành</Text>
          </Group>
        </Group>
      </Paper>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb="xl">
        <Paper withBorder p="md" radius="md">
          <Title order={3} mb="sm">
            Phân bổ trạng thái đơn hàng
          </Title>
          {overviewData?.statusStats?.map((status) => {
            const percentage =
              (status.count / (overviewData?.totalOrders || 1)) * 100;

            return (
              <div key={status.status} style={{ marginBottom: 15 }}>
                <Group justify="space-between" mb={5}>
                  <Text fw={500}>{status.status}</Text>
                  <Badge color={getStatusColor(status.status)}>
                    {status.count} đơn ({percentage.toFixed(1)}%)
                  </Badge>
                </Group>
                <Progress
                  value={percentage}
                  size="lg"
                  radius="xl"
                  color={getStatusColor(status.status)}
                  classNames={{
                    root: "h-[10px]",
                    section: "transition-all duration-500",
                  }}
                />
              </div>
            );
          })}
        </Paper>

        <Paper withBorder p="md" radius="md">
          <Title order={3} mb="sm">
            Địa điểm giao hàng nhiều nhất
          </Title>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Địa chỉ</Table.Th>
                <Table.Th>Số đơn</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {locationStats.map((location) => (
                <Table.Tr key={location.address}>
                  <Table.Td>
                    <Group gap="xs">
                      <IconMapPin size={16} />
                      {location.address}
                    </Group>
                  </Table.Td>
                  <Table.Td>{location.count}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </SimpleGrid>

      <Paper withBorder p="md" radius="md">
        <Title order={3} mb="sm">
          Hiệu suất nhân viên
        </Title>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Nhân viên</Table.Th>
              <Table.Th>Tổng đơn</Table.Th>
              <Table.Th>Đơn hoàn thành</Table.Th>
              <Table.Th>Tỷ lệ hoàn thành</Table.Th>
              <Table.Th>Thời gian xử lý TB</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {staffPerformance.map((staff) => (
              <Table.Tr key={staff.staffId}>
                <Table.Td>{staff.staffId}</Table.Td>
                <Table.Td>{staff.totalOrders || 0}</Table.Td>
                <Table.Td>{staff.completedOrders}</Table.Td>
                <Table.Td>
                  <Badge color="teal">{staff.completionRate.toFixed(1)}%</Badge>
                </Table.Td>
                <Table.Td>
                  {staff.avgProcessingTime
                    ? `${Math.round(
                        staff.avgProcessingTime / (1000 * 60 * 60 * 24)
                      )} ngày`
                    : "N/A"}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Container>
  );
}
