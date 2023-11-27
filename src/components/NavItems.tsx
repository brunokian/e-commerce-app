"use client"

import { PRODUCT_CATEGORIES } from '@/config'
import { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<null | number>(null)

    // close navitems with Esc
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                setActiveIndex(null)
            }
        }

        document.addEventListener('keydown', handler)

        return () => {
            document.removeEventListener('keydown', handler)
        }
    }, [])

    // boolean if have a open tab
    const isAnyOpen = activeIndex !== null
    
    // close navitems with click outside of the component
    const navRef = useRef<HTMLDivElement | null>(null)

    useOnClickOutside(navRef, () => setActiveIndex(null))

    return (
        <div className='flex gap-4 h-full' ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, i) => {

                // open or close the navItems, and define which tab is to open 
                const handleOpen = () => {
                    if (activeIndex === i) {
                        setActiveIndex(null)
                    } else {
                        setActiveIndex(i)
                    }
                }

                // bollean of if the tab is open
                const isOpen = i === activeIndex

            return (
                <NavItem 
                    category={category} 
                    handleOpen={handleOpen} 
                    isOpen={isOpen}
                    close={close}
                    key={category.value} 
                    isAnyOpen={isAnyOpen}
                />
            )
            })}
        </div>
    )
}

export default NavItems