import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export default function UserTypeDropdown({
        handleSetData, 
        anchorValue, 
        handleClose
    }:{
        handleSetData:any,
        anchorValue:any, 
        handleClose:any
    }){

    const handleWrapper = (userInfo:any) => () => {
        handleSetData(userInfo);
        handleClose();
    }

    return(
        <Menu
            anchorEl={anchorValue}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorValue)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleWrapper({
                        info:'userType',
                        value:'CUSTOMER'
                    })}
            >
                    Customer
            </MenuItem>
            <MenuItem onClick={handleWrapper({
                    info:'userType',
                    value:'DRIVER'
                })}
                >Driver
            </MenuItem>
        </Menu>
    )
}