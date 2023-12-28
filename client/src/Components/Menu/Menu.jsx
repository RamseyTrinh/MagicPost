import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SearchPackage from "../Funtions/SearchPackage/SearchPackage.jsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import BallotIcon from "@mui/icons-material/Ballot";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { Button } from "@mui/material";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const match = useMediaQuery("(max-width:800px)");

  const theme = useTheme();
  const navigate = useNavigate();

  const auth = useAuthUser();
  const role = auth().data.role;

  const [open, setOpen] = React.useState(!match);
  const [title, setTitle] = React.useState("Thông tin tài khoản");
  const signOut = useSignOut(); // biến để xử lý log out

  const transactionStaffFunc = [
    { name: "Tạo đơn hàng", Icon: BorderColorIcon },
    { name: "Chuyển hàng", Icon: LocalShippingIcon },
    { name: "Xác nhận", Icon: MarkEmailReadIcon },
    { name: "Thống kê", Icon: AssessmentIcon },
  ];

  const gatherStaffFunc = [
    { name: "Chuyển hàng", Icon: LocalShippingIcon },
    { name: "Xác nhận", Icon: MarkEmailReadIcon },
  ];

  const transactionAdminFunc = [
    { name: "Tạo tài khoản", Icon: PersonAddIcon },
    { name: "Thống kê", Icon: AssessmentIcon },
  ];

  const warehouseAdminFunc = [
    { name: "Tạo tài khoản", Icon: PersonAddIcon },
    { name: "Quản lý tài khoản", Icon: ManageAccountsIcon },
    { name: "Thống kê", Icon: AssessmentIcon },
  ];

  const adminFunc = [
    { name: "Quản lý hệ thống", Icon: BallotIcon },
    { name: "Quản lý tài khoản", Icon: ManageAccountsIcon },
    { name: "Thống kê", Icon: AssessmentIcon },
  ];

  const functions =
    role === "transactionStaff"
      ? transactionStaffFunc
      : role === "warehouseStaff"
      ? gatherStaffFunc
      : role === "transactionAdmin"
      ? transactionAdminFunc
      : role === "warehouseAdmin"
      ? warehouseAdminFunc
      : role === "admin"
      ? adminFunc
      : "";

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTitle = (e, text) => {
    e.persist();
    setTitle(text);
  };

  const handleAccount = () => {
    navigate("/menu");
    setTitle("Thông tin tài khoản");
  };

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  const handleToggle = (e, index) => {
    e.persist();
    if (index === 0) {
      if (role === "transactionStaff") {
        navigate("/menu/transaction/create");
      }
      if (role === "warehouseStaff") {
        navigate("/menu/warehouse/transfer");
      }
      if (role === "transactionAdmin") {
        navigate("/menu/transaction/createAccount");
      }
      if (role === "warehouseAdmin") {
        navigate("/menu/warehouse/createAccount");
      }
      if (role === "admin") {
        navigate("/menu/admin/managePoint");
      }
    }
    if (index === 1) {
      if (role === "transactionStaff") {
        navigate("/menu/transaction/transfer");
      }
      if (role === "warehouseStaff") {
        navigate("/menu/warehouse/confirmation");
      }
      if (role === "transactionAdmin") {
        navigate("/menu/transaction/statistics");
      }
      if (role === "warehouseAdmin") {
        navigate("/menu/warehouse/manage");
      }
      if (role === "admin") {
        navigate("/menu/admin/manageAccount");
      }
    }
    if (index === 2) {
      if (role === "transactionStaff") {
        navigate("/menu/transaction/confirmation");
      }
      if (role === "warehouseAdmin") {
        navigate("/menu/warehouse/statistics");
      }
      if (role === "admin") {
        navigate("/menu/admin/statistics");
      }
    }
    if (index === 3) {
      if (role === "transactionStaff") {
        navigate("/menu/transaction/statistics");
      }
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: "#003e29" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack sx={{ alignItems: "center" }} direction="row">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <SearchPackage />
            <Button
              variant="contained"
              onClick={handleSignOut}
              style={{
                fontWeight: "bold",
                background: "#fdfdfd",
                color: "#003e29",
              }}
            >
              Đăng xuất
            </Button>
            <Button
              variant="contained"
              style={{
                fontWeight: "bold",
                background: "#fdfdfd",
                color: "#003e29",
              }}
              onClick={handleAccount}
            >
              <AccountCircleIcon />
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#faf6ed",
            color: "#003e29",
          },
        }}
      >
        <DrawerHeader sx={{ justifyContent: "space-between" }}>
          <i style={{ marginLeft: "1em" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#003e29" }}>
              <b>MAGICPOST</b>
            </Link>
          </i>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {functions.map(({ name: text, Icon }, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={(e) => {
                  handleTitle(e, text);
                  handleToggle(e, index);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Icon sx={{ color: "#003e29" }} />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, background: "#f1f2ec", minHeight: "100vh" }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
