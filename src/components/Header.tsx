import * as React from 'react';
import { Link, useNavigate } from "react-router-dom"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { Login } from "@mui/icons-material";


const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const email = localStorage.getItem('EMAIL')

    const logOut = () => {
        localStorage.clear()
        navigate('/login')

    }

    return (
        <header>
            <div className='logo'>
                <div>
                    <Link to={'/'}>NexThink</Link>
                </div>

            </div>


            <nav>
                {email ? (
                    <div>
                        {/* <MenuItem> */}
                        <Link to={'/timechallaner'}>Challanger</Link>
                        {/* </MenuItem> */}
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <p>{email.charAt(0).toUpperCase()}</p>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            slotProps={{
                                list: {
                                    'aria-labelledby': 'basic-button',
                                },
                            }}
                        >
                            <Link to={'/dashboard'}>
                                <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                            </Link>


                            <MenuItem onClick={logOut}>Logout</MenuItem>


                        </Menu>
                    </div>
                ) : (
                    <Link to={'/login'}>
                        <Button
                            startIcon={<Login />}
                        >
                            Login
                        </Button>
                    </Link>

                )
                }
            </nav>
        </header>
    )
}

export default Header