import UserEnquiryForm from './UserEnquiryForm'
import UserData from './UserData'
import { useState } from 'react'

export default function HomePage() {

  var getUserInfos = JSON.parse(localStorage.getItem('userInfos'));

    const [users, setUsers] = useState(getUserInfos ?? []);

  return (
    <main className="app-shell">
      <div className="page-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">CUSTOMER RELATIONS / 2024</p>
            <h1>Enquiry <span>desk</span></h1>
            <p className="header-copy">Capture new conversations and keep every follow-up in one clear view.</p>
          </div>
          <div className="header-mark" aria-hidden="true"><span>ED</span></div>
        </header>

        <section className="workspace-grid">
          <UserEnquiryForm users={users} setUsers={setUsers} />
        </section>

        <UserData users={users} setUsers={setUsers}/>
      </div>
    </main>
  )
}
