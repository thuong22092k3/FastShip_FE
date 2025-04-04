import { Button, Card, Text, Title } from "@mantine/core";

function App() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Title order={1} style={{ textAlign: "center" }} mb="lg">
        Welcome to Mantine!
      </Title>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="md" mb="md">
          This is a sample card component using Mantine UI library.
        </Text>

        <Button variant="light" color="blue" fullWidth>
          Click me
        </Button>
      </Card>
    </div>
  );
}

export default App;
