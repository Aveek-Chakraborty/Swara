"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarCheckIcon, HomeIcon, MailIcon, PenIcon, VideoIcon } from 'lucide-react'

const SideNavigation = () => {
  const pathname = usePathname()

  const isActive = (path:string) => {
    return pathname === path
  }

  return (
    <aside className='w-4/12 min-h-screen h-auto border-r py-4 px-7 bg-white dark:bg-zinc-900'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold md:text-3xl text-md p-3'>Admin</h1>
      </div>
      <div className='mt-9'>
        <ul>
          <li className='flex flex-col gap-4'>
            <Link 
              href='/admin' 
              className={`block hover:shadow-slate-600 dark:hover:shadow-slate-400 hover:shadow-md 
                ${isActive('/admin') 
                  ? 'dark:bg-indigo-700 bg-indigo-200 border-l-4 border-indigo-600' 
                  : 'dark:bg-zinc-700 bg-zinc-300'} 
                p-3 rounded-md text-xs md:text-lg transition-all duration-200`}
            >
              <div className='flex items-center gap-3'>
                <HomeIcon className={isActive('/admin') ? 'text-indigo-600 dark:text-indigo-400' : ''}/> 
                Admin home
              </div>
            </Link>
            
            <Link 
              href='/admin/blogs' 
              className={`block hover:shadow-slate-600 dark:hover:shadow-slate-400 hover:shadow-md 
                ${isActive('/admin/blogs') 
                  ? 'dark:bg-indigo-700 bg-indigo-200 border-l-4 border-indigo-600' 
                  : 'dark:bg-zinc-700 bg-zinc-300'} 
                p-3 rounded-md text-xs md:text-lg transition-all duration-200`}
            >
              <div className='flex items-center gap-3'>
                <PenIcon className={isActive('/admin/blogs') ? 'text-indigo-600 dark:text-indigo-400' : ''}/> 
                Blogs
              </div>
            </Link>
            
            <Link 
              href='/admin/events' 
              className={`block hover:shadow-slate-600 dark:hover:shadow-slate-400 hover:shadow-md 
                ${isActive('/admin/events') 
                  ? 'dark:bg-indigo-700 bg-indigo-200 border-l-4 border-indigo-600' 
                  : 'dark:bg-zinc-700 bg-zinc-300'} 
                p-3 rounded-md text-xs md:text-lg transition-all duration-200`}
            >
              <div className='flex items-center gap-3'>
                <CalendarCheckIcon className={isActive('/admin/events') ? 'text-indigo-600 dark:text-indigo-400' : ''}/> 
                Events
              </div>
            </Link>
            
            <Link 
              href='/admin/videos' 
              className={`block hover:shadow-slate-600 dark:hover:shadow-slate-400 hover:shadow-md 
                ${isActive('/admin/videos') 
                  ? 'dark:bg-indigo-700 bg-indigo-200 border-l-4 border-indigo-600' 
                  : 'dark:bg-zinc-700 bg-zinc-300'} 
                p-3 rounded-md text-xs md:text-lg transition-all duration-200`}
            >
              <div className='flex items-center gap-3'>
                <VideoIcon className={isActive('/admin/videos') ? 'text-indigo-600 dark:text-indigo-400' : ''}/> 
                Videos
              </div>
            </Link>
            
            <Link 
              href='/admin/messages' 
              className={`block hover:shadow-slate-600 dark:hover:shadow-slate-400 hover:shadow-md 
                ${isActive('/admin/messages') 
                  ? 'dark:bg-indigo-700 bg-indigo-200 border-l-4 border-indigo-600' 
                  : 'dark:bg-zinc-700 bg-zinc-300'} 
                p-3 rounded-md text-xs md:text-lg transition-all duration-200`}
            >
              <div className='flex items-center gap-3'>
                <MailIcon className={isActive('/admin/messages') ? 'text-indigo-600 dark:text-indigo-400' : ''}/> 
                Messages
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default SideNavigation