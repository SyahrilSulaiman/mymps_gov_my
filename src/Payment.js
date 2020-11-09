import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Grid
} from '@material-ui/core';
import { makeStyles, } from '@material-ui/core/styles';
import logo from "./assets/img/logo1.png";

const useStyles = makeStyles((theme) => ({
    topAppBar: {
        Height: "20vh",
        minHeight: "200px"
    },
    toolbar: {
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
        verticalAlign: 'middle',
        display: 'inline-flex'
    },
}));

function Payment(){

    const classes = useStyles();

    return (
        <div>
        <AppBar position="static" elevation={0} color="default" className={classes.topAppBar}>
            <Toolbar className={classes.toolbar}>
                    <Grid container item direction="row" alignItems="center" xs={12} sm={6}>
                        <Grid item>
                            <img src={logo} alt="logo" style={{height: "120px", width: "120px"}} />
                        </Grid>
                        <Grid item>
                            <Typography className={classes.title} variant="h4" component="h1" noWrap color="primary">
                                Pembayaran Cukai Taksiran
                            </Typography>
                        </Grid>
                    </Grid>
            </Toolbar>
        </AppBar>
        </div>
    )
}

export default Payment;