import { Box, Stack } from "@mui/material" 
import {logo} from "../../constants/index"
import {colors} from "../../constants/color"
import{SearchBar} from "../index"

const Navbar = () => {
  return (
    <Stack  direction="row" justifyContent="space-between" alignItems="center" sx={{padding: 2, border: "none", position: "sticky", top: 0, zIndex: 100, backgroundColor: `${colors.primary}`}}>
      <img src={logo} alt="logo"  height={40}/>
      <SearchBar/>
      <Box />
    </Stack>
  )
}

export default Navbar
