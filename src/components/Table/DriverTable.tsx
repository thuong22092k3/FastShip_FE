import {
  ActionIcon,
  Badge,
  Button,
  Checkbox,
  Group,
  Menu,
  Pagination,
  ScrollArea,
  Select,
  Table,
  Text,
} from "@mantine/core";
import "@mantine/core/styles.css";
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconColumns,
  IconEdit,
  IconTrash,
  IconUserCheck,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { TaiXe } from "../../api/type/EmployeeType";
import { PAGE_SIZE_OPTIONS, PageSize } from "../../utils/constants/enum";
import CheckboxComponent from "../CheckBox/CheckBoxComponent";

type Props = {
  data: TaiXe[];
  loading?: boolean;
  error?: string;
  onDelete: (UserName: string) => void;
  onEdit: (taiXe: TaiXe) => void;
  page?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  total?: number;
  limit?: number;
};

const columnWidths: { [key: string]: string } = {
  checkbox: "50px",
  TaiXeID: "120px",
  hoTen: "180px",
  userName: "150px",
  email: "200px",
  hieuSuat: "120px",
  congViec: "150px",
  hanhDong: "120px",
};

// Define all possible columns
const allColumns = [
  { key: "TaiXeID", label: "ID Tài xế", visible: true },
  { key: "HoTen", label: "Họ tên", visible: true },
  { key: "UserName", label: "Tài khoản", visible: true },
  { key: "Email", label: "Email", visible: true },
  { key: "HieuSuat", label: "Hiệu suất", visible: true },
  { key: "CongViec", label: "Tình trạng", visible: true },
];

const getPerformanceColor = (hieuSuat: number) => {
  if (hieuSuat >= 80) return "green";
  if (hieuSuat >= 50) return "yellow";
  return "red";
};

const getJobStatus = (congViec: number) => {
  switch (congViec) {
    case 0:
      return { label: "Rảnh", color: "green" };
    case 1:
      return { label: "Đang giao", color: "blue" };
    case 2:
      return { label: "Nghỉ phép", color: "orange" };
    default:
      return { label: "Không xác định", color: "gray" };
  }
};

export const TaiXeTable: React.FC<Props> = ({
  data,
  loading,
  error,
  onDelete,
  onEdit,
  page = 1,
  onPageChange,
  total = 0,
  limit = 10,
  onLimitChange,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [sortBy, setSortBy] = useState<keyof TaiXe | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [columns, setColumns] = useState(allColumns);

  const handleRowSelect = (id: string, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  };

  const handleSort = (column: keyof TaiXe) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const toggleColumnVisibility = (key: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const resetColumns = () => {
    setColumns(allColumns.map((col) => ({ ...col, visible: true })));
  };

  const handleCheckboxChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    toggleColumnVisibility(key);
  };

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && !allSelected;

  const cellStyle = {
    borderRight: "1px solid #e0e0e0",
    padding: "12px",
  };

  const headerStyle = {
    borderRight: "1px solid #e0e0e0",
    padding: "12px",
    backgroundColor: "#f5f5f5",
    fontWeight: 600,
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortBy) return 0;

    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue === undefined || bValue === undefined) return 0;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return sortDirection === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
  const rows = sortedData.map((taiXe) => {
    const isSelected = selectedRows.includes(taiXe.TaiXeID);
    const jobStatus = getJobStatus(taiXe.CongViec);

    return (
      <Table.Tr
        key={taiXe.TaiXeID}
        style={{ borderBottom: "1px solid #e0e0e0" }}
      >
        <Table.Td style={cellStyle}>
          <Checkbox
            checked={isSelected}
            onChange={(event) =>
              handleRowSelect(taiXe.TaiXeID, event.currentTarget.checked)
            }
          />
        </Table.Td>
        {columns.find((c) => c.key === "TaiXeID")?.visible && (
          <Table.Td style={cellStyle}>{taiXe.TaiXeID}</Table.Td>
        )}
        {columns.find((c) => c.key === "HoTen")?.visible && (
          <Table.Td style={cellStyle}>{taiXe.HoTen}</Table.Td>
        )}
        {columns.find((c) => c.key === "UserName")?.visible && (
          <Table.Td style={cellStyle}>{taiXe.UserName}</Table.Td>
        )}
        {columns.find((c) => c.key === "Email")?.visible && (
          <Table.Td style={cellStyle}>{taiXe.Email}</Table.Td>
        )}
        {columns.find((c) => c.key === "HieuSuat")?.visible && (
          <Table.Td style={cellStyle}>
            <Badge color={getPerformanceColor(taiXe.HieuSuat)}>
              {taiXe.HieuSuat}%
            </Badge>
          </Table.Td>
        )}
        {columns.find((c) => c.key === "CongViec")?.visible && (
          <Table.Td style={cellStyle}>
            <Badge color={jobStatus.color}>{jobStatus.label}</Badge>
          </Table.Td>
        )}
        <Table.Td style={cellStyle}>
          <Group gap="xs">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={() => onEdit(taiXe)}
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => onDelete(taiXe.UserName)}
            >
              <IconTrash size={18} />
            </ActionIcon>
            <ActionIcon variant="light" color="green">
              <IconUserCheck size={18} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Group justify="space-between" mb="md">
        <Group>
          <Menu
            position="bottom-start"
            shadow="md"
            width={200}
            closeOnItemClick={false}
          >
            <Menu.Target>
              <Button
                leftSection={<IconColumns size={16} />}
                variant="outline"
                size="xs"
              >
                Columns
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>
                <Group justify="space-between">
                  <Text size="sm">Select columns</Text>
                  <Button
                    variant="subtle"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetColumns();
                    }}
                  >
                    Reset
                  </Button>
                </Group>
              </Menu.Label>
              {columns.map((column) => (
                <Menu.Item key={column.key} onClick={(e) => e.preventDefault()}>
                  <Checkbox
                    label={column.label}
                    checked={column.visible}
                    onChange={(e) => handleCheckboxChange(column.key, e)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Select
          value={limit?.toString()}
          onChange={(value) => onLimitChange?.(Number(value))}
          data={PAGE_SIZE_OPTIONS}
          style={{ width: 200 }}
          defaultValue={PageSize.TEN.toString()}
        />
      </Group>

      <ScrollArea
        type="scroll"
        scrollbars="x"
        offsetScrollbars
        style={{
          width: "100%",
          maxWidth: "80vw",
          position: "relative",
        }}
      >
        <Table
          striped
          highlightOnHover
          withTableBorder
          style={{
            border: "1px solid #ccc",
            borderCollapse: "collapse",
          }}
        >
          <Table.Th style={{ ...headerStyle, minWidth: columnWidths.checkbox }}>
            <CheckboxComponent
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          </Table.Th>
          {columns
            .filter((column) => column.visible)
            .map(({ key, label }) => (
              <Table.Th
                key={key}
                style={{
                  ...headerStyle,
                  minWidth: columnWidths[key],
                  cursor: "pointer",
                }}
                onClick={() => handleSort(key as keyof TaiXe)}
              >
                {label}
                {sortBy === key ? (
                  sortDirection === "asc" ? (
                    <IconCaretUpFilled size={14} />
                  ) : (
                    <IconCaretDownFilled size={14} />
                  )
                ) : (
                  <IconCaretUpFilled size={14} color="gray" />
                )}
              </Table.Th>
            ))}
          <Table.Th style={{ ...headerStyle, minWidth: columnWidths.hanhDong }}>
            Hành động
          </Table.Th>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Pagination
          total={Math.ceil(total / limit)}
          value={page}
          onChange={onPageChange}
          withEdges
          withControls
          mt="md"
        />
      </ScrollArea>
      {/* {total > 0 && (
        <Pagination
          total={Math.ceil(total / limit)}
          value={page}
          onChange={onPageChange}
          withEdges
          withControls
          mt="md"
        />
      )} */}
    </>
  );
};
