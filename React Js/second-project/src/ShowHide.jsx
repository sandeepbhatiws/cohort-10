import React, { useState } from 'react'

export default function ShowHide() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
  }

  return (
    <div className="password-container">
      <div className="password-wrapper">
        <h2>Show/Hide Password</h2>
        
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="password-input"
          />
          <button
            onClick={togglePasswordVisibility}
            className="toggle-button"
          >
            {showPassword ? '👁️ Hide' : '👁️ Show'}
          </button>
        </div>

        <div className="password-status">
          {showPassword ? (
            <p>✓ Password is visible</p>
          ) : (
            <p>✗ Password is hidden</p>
          )}
        </div>
      </div>
    </div>
  )
}
