import React, { useState, useEffect } from 'react'

const useMouseTracker = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const updateMouse = (evt) => {
      setPos({ x: evt.clientX, y: evt.clientY })
    }
    document.addEventListener('mousemove', updateMouse)
    return () => {
      document.removeEventListener('mousemove', updateMouse)
    }
  })
  return pos
}

export default useMouseTracker