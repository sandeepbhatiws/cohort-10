import { useState } from "react";
import { countries, states } from "../locationData";

export default function UserEnquiryForm({users, setUsers}) {

    const [getCountries, setCountries] = useState(countries);
    const [getStates, setStates] = useState([]);

    const getCountryStates = (e) => {
        console.log(e.target.value);

        const filterStates = states.filter((v,i) => {
            if(e.target.value == v.country_id){
                console.log(v);
                return v;
            }
        })

        setStates(filterStates)
    }

    const [errors, setErrors] = useState([]);

    const formHandling = (event) => {
        event.preventDefault();

        var  form = event.target;
        let fields = form.querySelectorAll("input, select")

        var errorFields = [];

        fields.forEach((field) => {
            if(field.value == ''){
                errorFields.push(field.name);
            }
        })

        setErrors([...errorFields])

        var userData = { 
            name: event.target.name.value,
            email: event.target.email.value,
            mobile_number: event.target.mobile_number.value,
            country: event.target.country.value,
            state: event.target.state.value,
        }

        setUsers([userData, ...users])

        localStorage.setItem('userInfos', JSON.stringify([userData, ...users]))
        event.target.reset();
        setStates([]);
    }

    const checkValidation = (event) => {
        if(event.target.value){
            var filterErrors = errors.filter((v,i) => {
                if(v != event.target.name){
                    return v;
                }
            })

            setErrors([...filterErrors]) 
        } else {
            errors.push(event.target.name);
            setErrors([...errors])            
        }
    }

    const validationAndState = (event) => {
        checkValidation(event)
        getCountryStates(event)
    }

    return (
        <section className="form-panel">
            <div className="section-heading">
                <div><p className="eyebrow">NEW RECORD</p><h2>Start an enquiry</h2></div>
                <span className="step-badge">01 <i /> 02</span>
            </div>
            <form onSubmit={ formHandling } autoComplete="off">
                <div className="field-grid">
                    <label className="field field-wide">Full name
                        <input name="name" placeholder="e.g. Jordan Lee" onKeyUp={ checkValidation } />
                        
                        {
                            errors.includes('name')
                            ?
                            <p className="text-red-500">Full name is required</p>
                            :
                            ''
                        }
                    </label>
                    <label className="field">Email address
                        <input type="email" name="email" placeholder="you@company.com" onKeyUp={ checkValidation } />

                        {
                            errors.includes('email')
                            ?
                            <p className="text-red-500">Email is required</p>
                            :
                            ''
                        }

                    </label>
                    <label className="field">Mobile number
                        <input type="tel" name="mobile_number" placeholder="+1 000 000 0000" onKeyUp={ checkValidation } />

                        {
                            errors.includes('mobile_number')
                            ?
                            <p className="text-red-500">Mobile Number is required</p>
                            :
                            ''
                        }
                    </label>
                    <label className="field">Country
                        <select name="country" onChange={ validationAndState }>
                            <option value=''>Select Country</option>
                            {
                                getCountries.map((v,i) => {
                                    return(
                                        <option value={v.id} key={i}>{v.name}</option>
                                    )
                                })
                            }
                        </select>

                        {
                            errors.includes('country')
                            ?
                            <p className="text-red-500">Country is required</p>
                            :
                            ''
                        }
                    </label>
                    <label className="field">State
                        <select name="state" onChange={ checkValidation }>
                            <option value=''>Select State</option>
                            {
                                getStates.map((v,i) => {
                                    return(
                                        <option value={v.id} key={i}>{v.name}</option>
                                    )
                                })
                            }
                        </select>

                        {
                            errors.includes('state')
                            ?
                            <p className="text-red-500">State is required</p>
                            :
                            ''
                        }
                    </label>
                </div>
                <div className="form-footer">
                    <p className="required-note">* All fields are required</p>
                    <button className="submit-button" type="submit">Add enquiry <span>→</span></button></div>
            </form>
        </section>
    )
}
