import React, { useState } from 'react'
import {
    AppBar, Box, Toolbar, IconButton, Typography, Container,
    Button, Drawer, List,  ListItemText, ListItemButton,
    Collapse,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '@styles/HomePage.css';
import { useNavigate } from 'react-router';
const pages = [
    { name: 'Products', children: ['Top Anime','Recommendations'] },
    { name: 'About' },
    { name: 'Contact' }
]

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));

export default function CustomNavbar() {
    const [openChild, setOpenChild] = useState({});
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPage, setOpenPage] = useState(null);
    const navigate = useNavigate();

const handleItemClick = (name) => {
    const route = '/' + name.toLowerCase().replace(/\s+/g, '-');
    navigate(route);
    setOpenDrawer(false);
};

    const open = Boolean(anchorEl);
    const handleOpenEl = (event, pageName) => {
        setAnchorEl(event.currentTarget);
        setOpenPage(pageName);
    };
    const handleCloseEl = () => {
        setAnchorEl(null);
        setOpenPage(null);
    };

    const handleToggleChild = (name) => {
        setOpenChild(prev => ({ ...prev, [name]: !prev[name] }));
    }

    const handleOpenDrawer = () => {
        setOpenDrawer(true);
        console.log('Drawer opened');
    }
    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    }
    return (
        <>
            <AppBar position='static' sx={{ backgroundColor: '#000' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex', color: '#9cee69' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none'
                            }}
                        >
                            ANIME
                        </Typography>

                        {/* Hamburger Menu for Mobile */}
                        {/* Hamburger Icon - left on mobile */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}>
                            <IconButton
                                size='large'
                                color='inherit'
                                onClick={handleOpenDrawer}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        {/* Centered logo for mobile */}
                        <Box sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                            justifyContent: 'center'
                        }}>
                            <AdbIcon sx={{ mr: 1, color: '#9cee69' }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                ANIME
                            </Typography>
                        </Box>

                        {/* Menu for Desktop */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <React.Fragment key={page.name}>
                                    <Button
                                        key={page.name}
                                        onClick={(event) => page.children ? handleOpenEl(event, page.name) : handleItemClick(page.name)}
                                        sx={{ my: 2, color: 'white', display: 'inline-flex', gap: 0.5 }}
                                        endIcon={page.children ? <KeyboardArrowDownIcon /> : null}
                                    >
                                        {page.name}
                                    </Button>
                                    {page.children && openPage === page.name && (
                                        <StyledMenu
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleCloseEl}
                                            slotProps={{
                                                list: {
                                                    'aria-labelledby': 'demo-customized-button',
                                                },
                                            }}
                                        >
                                            {page.children.map((child) => (
                                                <MenuItem
                                                    key={child}
                                                    onClick={() => {
                                                        handleItemClick(child);
                                                        handleCloseEl();
                                                    }}
                                                    disableRipple
                                                >
                                                    {child}
                                                </MenuItem>
                                            ))}
                                        </StyledMenu>
                                    )}

                                </React.Fragment>
                            ))}

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Drawer for Mobile */}
            <Drawer anchor="left" open={openDrawer} onClose={handleCloseDrawer}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                >
                    {/* Drawer Header */}
                    <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                        <Box display="flex" alignItems="center">
                            <AdbIcon sx={{ mr: 1, color: '#6cc832' }} />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                ANIME
                            </Typography>
                        </Box>
                        <IconButton onClick={handleCloseDrawer}>
                            <CloseIcon />
                        </IconButton>
                    </Box>


                    <List>
                        {pages.map((page) => (
                            <React.Fragment key={page.name}>
                                <ListItemButton onClick={() => page.children ? handleToggleChild(page.name) : handleItemClick(page.name)}>
                                    <ListItemText primary={page.name} />
                                    {page.children ? (openChild[page.name] ? <ExpandLess /> : <ExpandMore />) : null}
                                </ListItemButton>

                                {page.children && (
                                    <Collapse in={openChild[page.name]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {page.children.map((child) => (
                                                <ListItemButton
                                                    key={child}
                                                    sx={{ pl: 4 }}
                                                    onClick={() => handleItemClick(child)}
                                                >
                                                    <ListItemText primary={child} />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}
