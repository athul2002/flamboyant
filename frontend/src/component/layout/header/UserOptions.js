import React, { Fragment, useState } from 'react'
import './Header.css';
import { SpeedDial,SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProfileImage from '../../../images/Profile.png'
import FavouriteIcon from'@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logOut } from '../../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
const UserOptions = ({user}) => {
    const navigate=useNavigate();
    const alert=useAlert();
    const [open,setOpen]=useState(false);
    const dispatch=useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { favourites } = useSelector((state) => state.favourite);
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
          icon: (
            <ShoppingCartIcon
              style={{ color: cartItems.length > 0 ? "#990011" : "unset" }}
            />
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
        },
        {
          icon: (
            <FavouriteIcon
              style={{ color: favourites.length > 0 ? "#990011" : "unset" }}
            />
          ),
          name: `Favorite(${favourites.length})`,
          func: favorite,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ];
      if (user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }

      function dashboard() {
        navigate("/admin/dashboard");
      }
    
      function orders() {
        navigate("/orders");
      }
      function account() {
        navigate("/account");
      }
      function cart() {
        navigate("/cart");
      }
      function favorite() {
        navigate("/favourite");
      }
      function logoutUser() {
        dispatch(logOut());
        alert.success("Logout Successfully");
      }
    return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:'10'}}/>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : ProfileImage}
            alt="Profile"
          />
        }
      >
        
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
        </SpeedDial>
    
    </Fragment>
  )
}

export default UserOptions
