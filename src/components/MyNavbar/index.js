import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import SearchInput from '../SearchInput';

export default function MyNavbar(props) {
  const history = useHistory();
  const logMeOut = (e) => {
    e.preventDefault();
    history.push('/');
    firebase.auth().signOut();
  };
  const { user } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return user && (
    <div>
      <Navbar color='dark' dark expand='md' className='justify-content-between'>
        <Link className='navbar-brand' to='/'>
          Pinterest
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='flex-grow-1' navbar>
            <NavItem>
              <Link className='nav-link' to='/boards'>
                Boards
              </Link>
            </NavItem>
            <NavItem>
              <Link className='nav-link' to='/pins'>
                Pins
              </Link>
            </NavItem>
            <NavItem className='flex-grow-1'>
              <SearchInput />
            </NavItem>
          </Nav>
          {/* "Optional chaining operator: (?.)" gives the prop time to load without throwing errors. Only use this if you know your props are correct and need time to load. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */}
          {user && (
            <>
              <img
                className='userInfo rounded-circle'
                src={user?.photoURL}
                alt={user?.displayName}
              />
              <UncontrolledDropdown>
                <DropdownToggle nav caret></DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>{user?.displayName}</DropdownItem>
                  <DropdownItem>
                    <div
                      className='nav-link btn btn-danger'
                      onClick={(e) => logMeOut(e)}
                    >
                      Logout
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}
