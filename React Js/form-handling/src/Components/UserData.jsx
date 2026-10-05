import { countries, states } from "../locationData"

export default function UserData({ users, setUsers }) {

    const deleteUser = (i) => {

        if(confirm('Are you sure you want to delete ?')){
            const getData = users.filter((v, index) => {
                if(i != index){
                    return v;
                }
            })

            setUsers([...getData])
            localStorage.setItem('userInfos', JSON.stringify([...getData]))
        }
        
    }

    return (
        <section className="table-section">
            <div className="table-heading">
                <div>
                    <p className="eyebrow">RECENT ACTIVITY</p>
                    <h2>Enquiry directory</h2>
                </div>
                <span className="record-count">{users.length} records</span>
            </div>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Contact</th>
                            <th>Mobile number</th>
                            <th>Location</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0
                            ?
                                users.map((user, index) => {

                                    const countryName = countries.filter((v,i) => {
                                        if(v.id == user.country){
                                            return v;
                                        }
                                    })

                                    const stateName = states.filter((v,i) => {
                                        if(v.id == user.state){
                                            return v;
                                        }
                                    })

                                    return(
                                        <tr key={index}>
                                            <td>
                                                <div className="contact-cell">
                                                    <span className="avatar">{user.name.split(' ').map((part) => part[0]).join('')}</span>
                                                    <div>
                                                        <strong>{user.name}</strong>
                                                        <small>{user.email}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{user.mobile_number}</td>
                                            <td>{stateName[0].name}, {countryName[0].name}</td>
                                            <td  onClick={ () => deleteUser(index) }>
                                                <span className="status"><i />Delete</span>
                                            </td>
                                        </tr>
                                    )
                                })
                            :
                            <tr>
                                <td className="text-center" colSpan={4}>No Record Founds !</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}
