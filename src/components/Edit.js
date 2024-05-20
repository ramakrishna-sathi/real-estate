import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'


const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

    const history = useNavigate("");

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


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`http://23.23.23.51:5000/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const {place, Area, Bedrooms, Bathrooms,  NearbyFacilities} = inpval;

        const res2 = await fetch(`http://23.23.23.51:5000/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                place, Area, Bedrooms, Bathrooms,  NearbyFacilities
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/")
        }

    }

    return (
        <div className="container">
            <NavLink to="/">home2</NavLink>
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
                        <input type="text" value={inpval.Bathrooms} onChange={setdata} name="Bathrooms" class="form-control" id="exampleInputPassword1" />
                    </div>
                    
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">NearbyFacilities</label>
                        <textarea name="NearbyFacilities" value={inpval.NearbyFacilities} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;