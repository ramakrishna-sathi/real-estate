import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { NavLink } from 'react-router-dom';
import styles from "./styles.module.css";


const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const getdata = async () => {

        const res = await fetch("http://23.23.23.51:5000/getdata", {
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
            setUserdata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    },[])


	return (

		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Real Estate</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				</nav>

        
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Add Home</NavLink>
                    </div>

            
                   <table>                  
                           <tr >
                                <th >id</th>
                                
                                <th >place</th>
                                <th >Area</th>
                                <th>Bedrooms</th>
                                <th >bathrooms</th>
                                <th >Nearby Facilities</th>
                                <th ></th>
                            </tr>
                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th>{id + 1}</th>
                                                <th >{element.place}</th>
                                                <th >{element.Area}</th>
                                                <th >{element.Bathrooms}</th>
                                                <th >{element.Bedrooms}</th>
                                                <th >{element.NearbyFacilities}</th>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                            </table>
            </div>		
		
	);
};

export default Main;
