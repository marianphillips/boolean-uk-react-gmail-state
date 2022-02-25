import Header from './components/header'

import initialEmails from './data/emails'

import {useState} from 'react'

import './styles/app.css'


function App() {

  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [showStarred, setShowStarred] = useState(false)
  const [showInbox, setShowInbox] = useState(true)

  const readOrUnread = (email) => {
    return email.read ? "email read" : "email unread"
  }


  const toggleRead = (target) => {
  const updatedEmails = emails.map(email => email === target ? {...email, read: !email.read} : email)
  setEmails(updatedEmails)
}

  const toggleStar = (target) => {
  const updatedEmails = emails.map(email => email === target ? {...email, starred: !email.starred} : email)
  setEmails(updatedEmails)
}

function emailElement(email, index) {
  return <li key={index} className={readOrUnread(email)}>
  <div className="select">
    <input className="select-checkbox" defaultChecked={email.read} type="checkbox" onChange={() => toggleRead(email)}/>
 </div>
 <div className="star">
    <input className="star-checkbox" defaultChecked={email.starred} type="checkbox" onChange={() => toggleStar(email)} />
 </div>
 <div className="sender">{email.sender}</div>
 <div className="title">{email.title}</div>
  </li>
}

function getUnreadEmails() {
  if(!hideRead) {
  setHideRead(true)
  setShowStarred(false)
  setShowInbox(false)
  }
  else {
    setHideRead(false)
    setShowStarred(false)
    setShowInbox(true)
  }
}

function getStarredEmails() {
  if(!showStarred) {
    setHideRead(false)
    setShowStarred(true)
    setShowInbox(false)
    }
    else {
      setHideRead(false)
      setShowStarred(false)
      setShowInbox(true)
    }
  }

  function inbox() {
    setHideRead(false)
    setShowStarred(false)
    setShowInbox(true)
  }

  function isActive(trueState) {
    return trueState ? "item active" : "item" 
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={isActive(showInbox)}
            onClick={inbox}
          >
            <span className="label">Inbox</span>
            <span className="count">✉</span>
          </li>
          <li
            className={isActive(showStarred)}
            onClick={getStarredEmails}
          >
            <span className="label">Starred</span>
            <span className="count">⭐</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onClick={getUnreadEmails}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {showInbox && emails.map((email, index) => emailElement(email, index))}
          {hideRead && emails.filter(email => email.read !== true).map((email, index) => emailElement(email, index))}
          {showStarred && emails.filter(email => email.starred === true).map((email, index) => emailElement(email, index))}
      </ul>
      </main>
    </div>
  )
}

export default App
