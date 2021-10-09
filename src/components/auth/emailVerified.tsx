import React from 'react'

type EmailVerifiedProps = {

}

const EmailVerified: React.FC<EmailVerifiedProps> = () => {
  return (
    <div style={{display: 'flex', flexDirection:'column', justifySelf: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <h2>Your email is now verified</h2>
      <h3>Now you are able  to add comments to posts.</h3>
    </div>
  )
}

export default EmailVerified
