import React from 'react';
import{useFormik} from 'formik';

function SignupForm() {
    const formik=useFormik({
        initialValues:{
            name:'',
            age:'',
            gender:'',
            address:'',
            no:'',
            email:''
        },
        onSubmit: values=>{
            console.log('Form data: ',values);
        }
    });
    return (
        <div>
            <h1>Please fill below form</h1>
            <form id='userform' onSubmit={formik.handleSubmit}>
                <label for='firstname'>Enter First name</label>
                <input type='text' name='firstname' onChange={formik.handleChange} value={formik.values.firstname}/>
                <label for='lastname'>Enter last name</label>
                <input type='text' name='lastname' onChange={formik.handleChange} value={formik.values.lastname}/>
                <label for='email'>Enter email</label>
                <input type='email' name='email' onChange={formik.handleChange} value={formik.values.email}/>
                <label for='address'>Enter address</label>
                <input type='text' name='address' onChange={formik.handleChange} value={formik.values.address}/>
                <label for='no'>Enter phone number</label>
                <input type='text' name='no' onChange={formik.handleChange} value={formik.values.no}/>
            <button>Submit</button>
            </form>
        </div>
    )
}

export default SignupForm
