import { TextInput } from "@mantine/core";
import "@mantine/core/styles.css";
import { IconSearch, IconUserCircle } from "@tabler/icons-react";

import { COLORS } from "../../constants/colors";
const CustomHeader = () => {
  return (
    <div
      style={{
        backgroundColor: COLORS.mediumBlue,
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "sticky",
        top: 0,
        // zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: COLORS.lightGray,
          border: "none",
          paddingLeft: 20,
          paddingRight: 15,
          height: 40,
        }}
      >
        <TextInput
          placeholder="Search"
          styles={{
            input: {
              width: 500,
              fontSize: 14,
              backgroundColor: COLORS.lightGray,
              border: "none",
              outline: "none",
              boxShadow: "none",
              borderRadius: 10,
              "&:focus": {
                border: "none",
                outline: "none",
                boxShadow: "none",
              },
              "&:focusWithin": {
                border: "none",
                outline: "none",
                boxShadow: "none",
              },
            },
          }}
        />
        <IconSearch size={24} color="black" />
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", gap: 20 }}>
        <IconUserCircle size={35} color={COLORS.white}></IconUserCircle>
        <div style={{ color: "white", fontSize: 14 }}>
          <div>Transport logistic</div>
          <div style={{ fontWeight: 400, marginTop: 4 }}>Admin</div>
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;
