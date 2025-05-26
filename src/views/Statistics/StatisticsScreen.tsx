import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Paper,
  Table,
  Group,
  Progress,
} from "@mantine/core";
import "@mantine/core/styles.css";
import {
  IconBox,
  IconTruck,
  IconUsers,
  IconChartBar,
  IconClock,
} from "@tabler/icons-react";
import CardComponent from "../../components/Card/CardComponent";

const performanceData = [
  { month: "Jan", deliveries: 120, completed: 110 },
  { month: "Feb", deliveries: 190, completed: 180 },
  { month: "Mar", deliveries: 150, completed: 140 },
  { month: "Apr", deliveries: 200, completed: 195 },
  { month: "May", deliveries: 170, completed: 165 },
  { month: "Jun", deliveries: 220, completed: 210 },
];

const vehicleData = [
  { vehicle: "Truck A", trips: 45, maintenance: "Up to date" },
  { vehicle: "Van B", trips: 32, maintenance: "Due soon" },
  { vehicle: "Truck C", trips: 28, maintenance: "Up to date" },
  { vehicle: "Van D", trips: 51, maintenance: "Maintenance required" },
];

const personnelData = [
  { name: "Nguyen Van A", deliveries: 85, rating: "4.8" },
  { name: "Tran Thi B", deliveries: 72, rating: "4.9" },
  { name: "Le Van C", deliveries: 68, rating: "4.7" },
  { name: "Pham Thi D", deliveries: 91, rating: "4.9" },
];

export default function StatisticScreen() {
  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="xl">
        Performance Dashboard
      </Title>

      {/* Overview Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" mb="xl">
        <CardComponent
          title="Total Deliveries"
          value="1,245"
          updatedText="This month"
          icon={<IconBox size={24} />}
        />
        <CardComponent
          title="Active Vehicles"
          value="18"
          updatedText="4 in maintenance"
          icon={<IconTruck size={24} />}
        />
        <CardComponent
          title="Delivery Staff"
          value="32"
          updatedText="5 on leave"
          icon={<IconUsers size={24} />}
        />
        <CardComponent
          title="On-time Rate"
          value="94.5%"
          updatedText="+2.3% from last month"
          icon={<IconClock size={24} />}
        />
      </SimpleGrid>

      {/* Performance Section */}
      <Paper withBorder p="md" radius="md" mb="xl">
        <Title order={3} mb="sm">
          Delivery Performance
        </Title>
        <Group gap="xl" align="flex-end" mb="md">
          {performanceData.map((month) => (
            <div key={month.month}>
              <Text ta="center" fw={500}>
                {month.month}
              </Text>
              <div
                style={{
                  height: "200px",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <div style={{ width: "30px", margin: "0 5px" }}>
                  <div
                    style={{
                      height: `${(month.deliveries / 250) * 100}%`,
                      backgroundColor: "#4D6CFA", // Màu xanh dương đậm
                      borderRadius: "4px 4px 0 0",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      transition: "height 0.3s ease",
                    }}
                  />
                  <div
                    style={{
                      height: `${(month.completed / 250) * 100}%`,
                      backgroundColor: "#00C1A2", // Màu xanh lá mạ
                      borderRadius: "0 0 4px 4px",
                      marginTop: "2px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      transition: "height 0.3s ease",
                    }}
                  />
                </div>
              </div>
              <Text ta="center" size="sm" mt={4}>
                {month.completed}/{month.deliveries}
              </Text>
            </div>
          ))}
        </Group>
        <Group gap="md" mt="xl">
          <Group gap="xs">
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#4D6CFA",
                borderRadius: "4px",
              }}
            />
            <Text size="sm" fw={600}>
              Scheduled Deliveries
            </Text>
          </Group>
          <Group gap="xs">
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#00C1A2",
                borderRadius: "4px",
              }}
            />
            <Text size="sm" fw={600}>
              Completed Deliveries
            </Text>
          </Group>
        </Group>
      </Paper>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb="xl">
        {/* Vehicle Status */}
        <Paper withBorder p="md" radius="md">
          <Title order={3} mb="sm">
            Vehicle Utilization
          </Title>
          {vehicleData.map((vehicle) => (
            <div key={vehicle.vehicle} style={{ marginBottom: "15px" }}>
              <Text fw={500} mb={5}>
                {vehicle.vehicle}
              </Text>
              <Progress
                value={(vehicle.trips / 60) * 100}
                // label={`${vehicle.trips} trips`}
                size="lg"
                radius="xl"
                color={
                  vehicle.maintenance === "Up to date"
                    ? "teal"
                    : vehicle.maintenance === "Due soon"
                    ? "yellow"
                    : "red"
                }
              />
              <Text size="sm" c="dimmed" mt={3}>
                {vehicle.maintenance}
              </Text>
            </div>
          ))}
        </Paper>

        {/* Personnel Performance */}
        <Paper withBorder p="md" radius="md">
          <Title order={3} mb="sm">
            Top Performers
          </Title>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Staff</Table.Th>
                <Table.Th>Deliveries</Table.Th>
                <Table.Th>Rating</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {personnelData.map((person) => (
                <Table.Tr key={person.name}>
                  <Table.Td>{person.name}</Table.Td>
                  <Table.Td>{person.deliveries}</Table.Td>
                  <Table.Td>{person.rating}/5</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </SimpleGrid>

      {/* Vehicle Details Table */}
      <Paper withBorder p="md" radius="md">
        <Title order={3} mb="sm">
          Vehicle Status
        </Title>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Vehicle</Table.Th>
              <Table.Th>Trips This Month</Table.Th>
              <Table.Th>Maintenance Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {vehicleData.map((vehicle) => (
              <Table.Tr key={vehicle.vehicle}>
                <Table.Td>{vehicle.vehicle}</Table.Td>
                <Table.Td>{vehicle.trips}</Table.Td>
                <Table.Td>
                  <Text
                    color={
                      vehicle.maintenance === "Up to date"
                        ? "teal"
                        : vehicle.maintenance === "Due soon"
                        ? "yellow"
                        : "red"
                    }
                  >
                    {vehicle.maintenance}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Container>
  );
}
