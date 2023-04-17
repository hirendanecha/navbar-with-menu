import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../../public/logo.png";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";

const menus = {
  PRODUCTS: {
    title: "PRODUCTS",
    subMenu: [
      { title: "FULL COURCE" },
      { title: "NEW LIVE VIRTUAL CLASSES" },
      { title: "TESTBANK PRACTICE SOFTWARE" },
      { title: "TEXTBOOK" },
      { title: "CRAM COURCES" },
      { title: "AUDIO LECTURES" },
      { title: "INSTRUCTOR HOTLINE" },
    ],
  },
  SUBSCRIPTIONS: { title: "SUBSCRIPTIONS" },
  PODCASTS_DEMOS: { title: "PODCASTS & DEMOS" },
  REVIEWS: { title: "REVIEWS" },
  UPDATES: { title: "UPDATES" },
  RESOURCES: {
    title: "RESOURCES",
    subMenu: [
      { title: "ABOUT YAEGER" },
      { title: "SECRET SAUCE" },
      { title: "RESOURCE CENTER" },
      { title: "BLOG" },
      { title: "FAQ" },
      { title: "STATE REQUIRMENTS" },
    ],
  },
  CART: {
    title: <ShoppingCartIcon />,
  },
};

const checkMenuType = (menu, val) => {
  console.log("this is val ", menu?.innerHTML.includes(val));
  // return menu?.getElementsByTagName("button")?.[0]?.innerHTML === val;
  return menu?.innerHTML.includes(val);
};

const MenuList = ({ menu, handleClick, handleClose }) => {
  return Object.keys(menus).map((e) => {
    return (
      <MenuItem sx={{ display: "flex" }}>
        <Box
          id="menu-button"
          aria-controls={checkMenuType(menu, e) ? "menu-product" : undefined}
          aria-haspopup="true"
          aria-expanded={checkMenuType(menu, e) ? "true" : undefined}
          sx={{
            p: 0,
            color: "black",
            display: "flex",
            fontSize: "18px",
            flex: 1,
          }}
          onClick={handleClick}
        >
          {menus[e]?.title}
        </Box>

        {menus[e]?.subMenu && (
          <Menu
            id="menu-menu"
            anchorEl={menu}
            open={checkMenuType(menu, e)}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "menu-button" }}
            sx={{
              "& .MuiMenu-list": {
                backgroundColor: "#28a745",
              },
            }}
          >
            {menus[e]?.subMenu.map((ele) => {
              return <MenuItem onClick={handleClose}>{ele.title}</MenuItem>;
            })}
          </Menu>
        )}
      </MenuItem>
    );
  });
};

const Navbar = () => {
  const [menu, setMenu] = useState(null);
  const [hambarg, setHambarg] = useState(null);

  return (
    <AppBar
      elevation={0}
      position="static"
      style={{ background: "white", marginTop: "30px" }}
    >
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          paddingX: 5,
        }}
      >
        {/* logo */}
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            maxWidth: { xs: "200px", lg: "250px" },
            maxHeight: 60,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Box
            component={Image}
            fill
            src={logo}
            alt="Logo"
            position={"unset !important"}
            sx={{ height: "100%" }}
          />
        </Typography>
        {/*hambarge */}
        <Box
          sx={{
            display: { xs: "flex", lg: "none" },
            backgroundColor: "#28a745",
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(e) => setHambarg(e.currentTarget)}
            color="inherit"
          >
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={hambarg}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={!!hambarg}
            onClose={() => setHambarg(null)}
            sx={{
              display: { xs: "block", lg: "none" },
              "& .MuiMenu-paper": { width: "100%" },
            }}
          >
            <MenuList
              menu={menu}
              handleClick={(e) => setMenu(e.currentTarget)}
              handleClose={() => setMenu(null)}
            />
          </Menu>
        </Box>

        {/* main menu */}
        <Box
          sx={{
            flexGrow: 1,
            display: {
              xs: "none",
              lg: "flex",
              justifyContent: "end",
            },
          }}
        >
          <MenuList
            menu={menu}
            handleClick={(e) => setMenu(e.currentTarget)}
            handleClose={() => setMenu(null)}
          />
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
