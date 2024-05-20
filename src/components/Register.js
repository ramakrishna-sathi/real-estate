import React, {useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Register = () => {


    const history = useNavigate();

    const [inpval, setINP] = useState({
        place: "",
        Area: "",
        Bedrooms: "",
        Bathrooms: "",
        NearbyFacilities: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();

        const { place, Area, Bedrooms, Bathrooms,  NearbyFacilities } = inpval;

        const res = await fetch("http://23.23.23.51:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                place, Area, Bedrooms, Bathrooms,  NearbyFacilities
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            history("/")
            console.log("data added");

        }
    }
   
    return (
        <div className="container">
            <button><NavLink to="/">home</NavLink></button>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">place</label>
                        <input type="text" value={inpval.place} onChange={setdata} name="place" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Area</label>
                        <input type="text" value={inpval.Area} onChange={setdata} name="Area" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Bedrooms</label>
                        <input type="text" value={inpval.Bedrooms} onChange={setdata} name="Bedrooms" class="form-control" id="exampleInputPassword1" />
                    </div>
                    
                    
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Bathrooms</label>
                     <input value={inpval.Bathrooms}  onChange={setdata} name="Bathrooms" class="form-control"  />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">NearbyFacilities</label>
                        <textarea name="NearbyFacilities" value={inpval.NearbyFacilities}  onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Register;