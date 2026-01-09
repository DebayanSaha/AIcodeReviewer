import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.5, ease: 'easeIn' },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const HomePage = () => {
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.main
      className="h-screen bg-linear-to-b from-neutral-950 to-zinc-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="h-full p-4">
        <div className="relative h-full border-2 border-[#0F9D00] rounded-4xl flex items-center justify-center gap-1.5 overflow-hidden">

          {/* ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5" />

          {/* floating particles stay untouched */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-emerald-500/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Title */}
          <motion.div
            variants={itemVariants}
            className="absolute top-15 flex flex-col items-center"
          >
            <h1 className="font-[font2] text-white text-8xl">REVI.</h1>
            <h3 className="font-[font3] text-white text-xl mt-4">
              Review code instantly with AI precision
            </h3>
          </motion.div>

          {/* Bot image with subtle parallax */}
          <motion.img
            variants={itemVariants}
            src="imgs/bot.png"
            alt=""
            className="h-60 w-50"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          />

          {/* Description */}
          <motion.div
            variants={itemVariants}
            className="absolute right-30 bottom-40 h-60 w-90"
          >
            <p className="font-[font3] text-white text-[15px]">
              "Detect bugs, optimize performance, and uncover security vulnerabilities in seconds. Ship cleaner, safer code with confidence."
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-40 flex gap-4 font-[font3]"
          >
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 rounded-full bg-emerald-500 text-black font-semibold"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/code-review')}
              className="px-8 py-3 rounded-full bg-emerald-100 text-black font-semibold"
            >
              Continue
            </button>
          </motion.div>

          {/* Footer note */}
          <motion.h2
            variants={itemVariants}
            className="absolute bottom-25 font-[font3] text-white text-[15px]"
          >
            Please log in to continue to the page.
          </motion.h2>

        </div>
      </div>
    </motion.main>
  )
}

export default HomePage
