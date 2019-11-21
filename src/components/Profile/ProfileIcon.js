import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class ProfileIcon extends Component {
  state = { dropdownOpen: false };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        style={{ marginRight: "20px" }}
      >
        <DropdownToggle
          tag="div"
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            className="br-100 ba h3 w3 dib mb0"
            alt="avatar"
          />
        </DropdownToggle>
        <DropdownMenu
          className="b--transparent shadow-5"
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            right: 0,
            left: "auto"
          }}
        >
          <DropdownItem onClick={this.props.openModal}>
            View Profile
          </DropdownItem>
          <DropdownItem>
            <Link to="/signin" onClick={this.props.onSubmitSignout}>
              Sign Out
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default ProfileIcon;
