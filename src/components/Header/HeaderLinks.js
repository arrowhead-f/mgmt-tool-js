/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2020. 01. 16.
 */


import React from 'react'
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Hidden from '@material-ui/core/Hidden'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Poppers from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import Grow from '@material-ui/core/Grow'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Divider from '@material-ui/core/Divider'
// // // @material-ui/icons
import Person from '@material-ui/icons/Person'
import NotificationsIcon from '@material-ui/icons/Notifications';
// core components
import Button from '../CustomButtons/Button'
import Badge from '@material-ui/core/Badge';
import { keycloak } from '../../services/keycloakInstance'

import headerLinksStyle from '../../assets/jss/material-dashboard-react/components/headerLinksStyle'

class HeaderLinks extends React.Component {
  state = {
    openProfile: null,
    openNotifications: null
  }

  handleClickProfile = event => {
    if (this.state.openProfile && this.state.openProfile.contains(event.target)) {
      this.setState({ openProfile: null }, () => console.log(this.state))
    } else {
      this.setState({ openProfile: event.currentTarget }, () => console.log(this.state))
    }
  }

  handleCloseProfile = (event) => {
    if (this.state.openProfile && !this.state.openProfile.contains(event.target)) {
      this.setState({ openProfile: null, isOpen: false })
    }
  }

  handleClickNotifications = event => {
    if (this.state.openNotifications && this.state.openNotifications.contains(event.target)) {
      this.setState({ openNotifications: null }, () => console.log(this.state))
    } else {
      this.setState({ openNotifications: event.currentTarget }, () => console.log(this.state))
    }
  }

  handleCloseNotifications = (event) => {
    if (this.state.openNotifications && !this.state.openNotifications.contains(event.target)) {
      this.setState({ openNotifications: null, isOpen: false })
    }
  }

  handleLogout = () => {
    this.setState({ openProfile: null, isOpen: false })
    console.log('Logout called!')
    // keycloak.logout() // TODO uncomment this line
  }

  render() {
    const { classes } = this.props
    const { openProfile, openNotifications } = this.state
    return (
      <div className={classes.searchWrapper}>

        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotifications ? 'notifications-menu-list-grow' : null}
          aria-haspopup='true'
          onClick={this.handleClickNotifications}
          className={classes.buttonLink}
        >
          <Badge badgeContent={5} color="error">
            <NotificationsIcon />
          </Badge>
          <Hidden mdUp implementation='css'>
            <p className={classes.linkText}>Notifications</p>
          </Hidden>
        </Button>
        <Poppers open={Boolean(openNotifications)}
                 anchorEl={openNotifications}
                 transition
                 disablePortal
                 placement="bottom-end"
                 className={classNames({ [classes.popperClose]: !openNotifications }) + ' ' + classes.popperNav}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id='notifications-menu-list-grow'
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleCloseNotifications}>
                  <MenuList role='menu'>
                    <MenuItem>Service Registry is unreachable</MenuItem>
                    <MenuItem>Dummy 2</MenuItem>
                    <MenuItem>Dummy 3</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>

        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? 'profile-menu-list-grow' : null}
          aria-haspopup='true'
          onClick={this.handleClickProfile}
          className={classes.buttonLink}
        >
          <Person />
          <Hidden mdUp implementation='css'>
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            ' ' +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id='profile-menu-list-grow'
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleCloseProfile}>
                  <MenuList role='menu'>
                    {/*
              <MenuItem
                onClick={this.handleCloseProfile}
                className={classes.dropdownItem}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={this.handleCloseProfile}
                className={classes.dropdownItem}
              >
                Settings
              </MenuItem>
              <Divider light />
              */}
                    <MenuItem
                      onClick={this.handleLogout}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    )
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks)
