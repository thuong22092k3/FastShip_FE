import {
  Box,
  Button,
  Grid,
  Group,
  Modal,
  Paper,
  Select,
  Stepper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useState } from "react";

interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateOrderModal({
  open,
  onClose,
}: CreateOrderModalProps) {
  const [active, setActive] = useState(0);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Tạo đơn hàng mới"
      size="80%"
      centered
      withCloseButton
      styles={{
        root: { position: "fixed", zIndex: 1000 },
        overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
      }}
    >
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper p="md" withBorder radius="md" shadow="sm">
            <Stepper
              active={active}
              onStepClick={setActive}
              allowNextStepsSelect={false}
            >
              <Stepper.Step label="Bước 1" description="Địa điểm giao nhận" />
              <Stepper.Step label="Bước 2" description="Hình thức giao hàng" />
              <Stepper.Step label="Bước 3" description="Bưu phẩm" />
              <Stepper.Step label="Bước 4" description="Xem lại đơn hàng" />
            </Stepper>

            <Box mt="xl">
              <Title order={5} c="blue">
                Thông tin người gửi
              </Title>
              {/* <TextInput
                label="Địa chỉ KH"
                value="CÔNG TY TNHH MORIMURA BROS. (VIETNAM)"
                readOnly
                mt="sm"
              /> */}
              <TextInput label="Địa chỉ KH" required mt="sm" />

              <Grid>
                <Grid.Col span={6}>
                  <TextInput label="Đại diện gửi" mt="sm" />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput label="Người đi gửi" mt="sm" />
                </Grid.Col>
              </Grid>

              <Box mt="md">
                <Title order={5} c="blue">
                  Thông tin người nhận
                </Title>
                <TextInput label="Số điện thoại *" required mt="sm" />
                <TextInput label="Họ và tên *" required mt="sm" />
                <TextInput label="Công ty" mt="sm" />
                <TextInput label="Địa chỉ *" required mt="sm" />
                <Grid>
                  <Grid.Col span={6}>
                    <Select
                      label="Quốc gia"
                      data={["VIET NAM"]}
                      defaultValue="VIET NAM"
                      disabled
                      mt="sm"
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      label="Tỉnh/Thành phố"
                      data={["TP.HCM", "Hà Nội"]}
                      placeholder="Chọn tỉnh/thành"
                      mt="sm"
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      label="Quận/Huyện"
                      data={["Quận 1", "Quận 3"]}
                      placeholder="Chọn quận/huyện"
                      mt="sm"
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      label="Phường/Xã"
                      data={["Phường Bến Nghé", "Phường Nguyễn Cư Trinh"]}
                      placeholder="Chọn phường/xã"
                      mt="sm"
                    />
                  </Grid.Col>
                </Grid>
                <TextInput label="Địa chỉ chi tiết" mt="sm" />
              </Box>

              <Group justify="flex-end" mt="xl">
                <Button
                  onClick={() => setActive((prev) => Math.min(prev + 1, 3))}
                >
                  Tiếp theo
                </Button>
              </Group>
            </Box>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper p="md" withBorder radius="md" shadow="sm">
            <Title order={5}>Chi phí đơn hàng</Title>
            <Box mt="sm">
              <Group justify="space-between">
                <Text>Chuyển phát nhanh</Text>
                <Text>0 VND</Text>
              </Group>

              <Group justify="space-between">
                <Text>Phí nhiên liệu</Text>
                <Text>0 VND</Text>
              </Group>

              <Group justify="space-between">
                <Text>Phí VAT</Text>
                <Text>0 VND</Text>
              </Group>

              <hr />

              <Group justify="space-between" mt="sm">
                <Text fw={600}>Tổng tiền</Text>
                <Text fw={600}>0 VND</Text>
              </Group>
            </Box>
          </Paper>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
