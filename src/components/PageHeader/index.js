const PageHeader = (props) => (
  <div className='user-board-info'>
    <img src={props.user?.photoURL} alt={props.user?.displayName} />
    <h3>{props.user?.displayName}</h3>
    <h6>{props.user?.providerData[0].email}</h6>
  </div>
);

export default PageHeader;
