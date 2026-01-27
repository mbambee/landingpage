"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import React from 'react'

type Props = {
    children?: React.ReactNode;
}

export default function ScrollLinked({ children }: Props) {
    const ref = useRef<HTMLUListElement | null>(null)
    const { scrollXProgress } = useScroll({ container: ref })
    // opacity for edge shadows: left visible when scrolled right, right visible when not fully scrolled
    const leftOpacity = useTransform(scrollXProgress, [0, 0.06], [0, 1])
    const rightOpacity = useTransform(scrollXProgress, [0.94, 1], [1, 0])

    return (
        <div id="example">

            <motion.div className="edge-shadow left" style={{ opacity: leftOpacity }} aria-hidden="true" />
            <motion.ul ref={ref} className="scroll-linked-list">
                {children}
            </motion.ul>
            <motion.div className="edge-shadow right" style={{ opacity: rightOpacity }} aria-hidden="true" />
            <StyleSheet />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
    return (
        <style>{`
            #example {
              width: 100%;
              position: relative;
            }

            #example #progress {
                position: absolute;
                top: -65px;
                left: 10px;
                transform: rotate(-90deg);
            }

            #example .bg {
                stroke: #0b1011;
            }

            #example #progress circle {
                stroke-dashoffset: 0;
                stroke-width: 10%;
                fill: none;
            }

            #progress .indicator {
                stroke: var(--accent);
            }

            .scroll-linked-list {
                display: flex;
                list-style: none;
                gap: 20px;
                overflow-x: auto;
                padding: 20px 0;
                margin: 0;
                -webkit-overflow-scrolling: touch;
            }

            .scroll-linked-list li {
                flex: 0 0 auto;
            }

            .scroll-linked-list::-webkit-scrollbar {
                height: 6px;
            }

            .scroll-linked-list::-webkit-scrollbar-thumb {
                background: #ccc;
            }

            /* stronger edge shadows */
            .edge-shadow {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 6rem;
                pointer-events: none;
                z-index: 30;
            }

            .edge-shadow.left {
                left: 0;
                background: linear-gradient(90deg, #FCF6F6, rgba(0,0,0,0));
            }

            .edge-shadow.right {
                right: 0;
                background: linear-gradient(270deg, #FCF6F6, rgba(0,0,0,0));
            }
    `}</style>
    )
}
