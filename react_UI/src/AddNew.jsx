import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { variables } from './Variables';

function AddNew(props) {

    console.log('edit', props.edit)
    const navigate = useNavigate();
    const[formData, setFormData] = useState({
        ContactName: '', 
        ContactEmail: '', 
        ContactPhone1: '', 
        ContactPhone2: '', 
        ContactAddress: '', 
        ContactType: 'Customer', 
        ContactId: '' 
    });
    const location = useLocation();
    useEffect(()=>{
        
        if(location.state !== null){
            const newData = location.state.edit;
            setFormData(newData);
        }
    },[location.state])

    const add = () => {
        fetch(variables.API_URL+'contact',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                ContactName: formData.ContactName,
                ContactEmail: formData.ContactEmail,
                ContactAddress: formData.ContactAddress,
                ContactPhone1: formData.ContactPhone1,
                ContactPhone2: formData.ContactPhone2,
                ContactType: formData.ContactType
            })
        })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            navigate('/all-contacts')
        },(error) => {
            alert('Failed');
        })
    }


    const update = () => {
        fetch(variables.API_URL+'contact',{
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                ContactId: Number(formData.ContactId),
                ContactName: formData.ContactName,
                ContactEmail: formData.ContactEmail,
                ContactAddress: formData.ContactAddress,
                ContactPhone1: formData.ContactPhone1,
                ContactPhone2: formData.ContactPhone2,
                ContactType: formData.ContactType
            })
        })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            navigate('/all-contacts')
        },(error) => {
            alert('Failed');
        })
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
        props.edit === 'false'
            ? add()
            : update()
    }

  return (
    <div className="wrapper">
        <div className="form-container">
            <h2>New Contact</h2>
            <form onSubmit={handleSubmit} className="form">
            <input 
                required 
                placeholder="Enter Name" 
                type='text'
                value={formData.ContactName}
                onChange={(e) => setFormData({...formData, ContactName: e.target.value})}
            />
            <input 
                required 
                placeholder="Enter Email" 
                type='email'
                value={formData.ContactEmail}
                onChange={(e) => setFormData({...formData, ContactEmail: e.target.value})}
            />
            <input 
                required 
                placeholder="Enter address" 
                type='text'
                value={formData.ContactAddress}
                onChange={(e) => setFormData({...formData, ContactAddress: e.target.value})}
            />
            <input 
                required 
                placeholder="Phone 1" 
                type='number'
                value={formData.ContactPhone1}
                onChange={(e) => setFormData({...formData, ContactPhone1: e.target.value})}
            />
            <input 
                required 
                placeholder="Phone 2" 
                type='number'
                value={formData.ContactPhone2}
                onChange={(e) => setFormData({...formData, ContactPhone2: e.target.value})}
            />
            <select
                value={formData.ContactType}
                onChange={e => setFormData({...formData, ContactType:e.target.value})}
            >
                <option value='Supplier'>Supplier</option>
                <option value='Customer'>Customer</option>
            </select>

            <button type="submit">{props.edit === 'true' ? 'Save' : 'Add'}</button>
            </form>
        </div>
    </div>
  )
}

export default AddNew