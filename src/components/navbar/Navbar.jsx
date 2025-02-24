import { Box, Stack } from "@mui/material";
import { logo } from "../../constants/index";
import { colors } from "../../constants/color";
import { Link } from "react-router-dom";
import { SearchBar } from "../index";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        padding: 2,
        border: "none",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: `${colors.primary}`,
      }}
    >
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <img src={logo} alt="logo" height={40} />
      </Link>
      <SearchBar />
      <Box />
    </Stack>
  );
};

export default Navbar;
