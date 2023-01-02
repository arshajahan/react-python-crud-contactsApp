import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { variables } from './Variables';

function List(props) {

    let contacts;
    const location = useLocation();
    const mode = location.pathname.split('/')[1];
    switch (mode) {
        case 'customers':
            contacts = props.allContacts.filter((user) => user.ContactType === 'Customer') ;
            console.log(contacts);
            break;
        case 'suppliers':
            contacts = props.allContacts.filter((user) => user.ContactType === 'Supplier') ;
            console.log(contacts)
            break;
        default:
            contacts = props.allContacts;
            break;
    }
    const navigate = useNavigate();

    const handleDelete = (id) => {
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'contact/'+id,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            navigate('/all-contacts')
        },(error) => {
            alert('Failed');
        })}
    }

  return (
    <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Email</td>
              <td>Phone 1</td>
              <td>Phone 2</td>
              <td>Address</td>
              <td className="icon-td"></td>
              <td className="icon-td"></td>
            </tr>
          </thead>
          <tbody>
            {contacts.map((user)=>(
                <tr key={user.ContactId}>
                    <td>{`${user.ContactType === 'Customer' ? 'C' : 'S'}${(user.ContactId).toString().padStart(4,'0')}`}</td>
                    <td>{user.ContactName}</td>
                    <td>{user.ContactEmail}</td>
                    <td>{user.ContactPhone1}</td>
                    <td>{user.ContactPhone2}</td>
                    <td>{user.ContactAddress}</td>
                    <td className="icon-td">
                    <Link 
                        to={
                            {pathname:  '/edit' }
                        } 
                        state={
                            {edit: user}
                        }
                    >edit</Link>
                    </td>
                    <td className="icon-td" onClick={() => handleDelete(user.ContactId)}><span>del</span></td>
                </tr>
            ))}
          </tbody>
        </table>
  )
}

export default List