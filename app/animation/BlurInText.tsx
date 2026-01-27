"use client"

import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  text: string
  className?: string
  wordsPerLine?: number
  delay?: number
}

export default function BlurInText({ text, className = '', delay = 0 }: Props) {
  // split and keep whitespace so spacing is preserved
  const parts = text.split(/(\s+)/)

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 6, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)' },
  }

  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{  amount: 0.2 }} //once: true,
    >
      {parts.map((part, i) => {
        // render whitespace as regular text node to avoid focusable spans
        if (/^\s+$/.test(part)) return part
        return (
          <motion.span
            key={i}
            variants={child}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {part}
          </motion.span>
        )
      })}
    </motion.p>
  )
}
