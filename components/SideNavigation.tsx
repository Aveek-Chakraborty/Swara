import React from 'react'

import Link from 'next/link'
import { CalendarCheckIcon, HomeIcon, MailIcon, PartyPopperIcon, PenIcon, VideoIcon } from 'lucide-react'

const SideNavigation = () => {
  return (
    <aside className='w-4/12 min-h-screen h-auto border-r py-4 px-7 '>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold md:text-3xl text-md p-3'>Admin</h1>
      </div>
      <div className='mt-9'>
        <ul>
          <li className='flex flex-col gap-4'>
            <Link href='/admin' className='block hover:shadow-slate-600 dark:hover:shadow-slate-400 hover:shadow-md dark:bg-zinc-700 bg-zinc-300 p-3 rounded-md  text-xs md:text-lg'>
              <div className='flex items-center gap-3'>
                <HomeIcon/> Admin home</div>
            </Link>
            <Link href='/admin/blogs' className='block hover:shadow-slate-600 dark:hover:shadow-slate-400 hover:shadow-md dark:bg-zinc-700 bg-zinc-300 p-3 rounded-md  text-xs md:text-lg'>
              <div className='flex items-center gap-3'>
                <PenIcon /> Blogs</div>
            </Link>
            <Link href='/admin/events' className='block hover:shadow-slate-600 dark:hover:shadow-slate-400 hover:shadow-md dark:bg-zinc-700 bg-zinc-300 p-3 rounded-md  text-xs md:text-lg'>
              <div className='flex items-center gap-3'>
                <CalendarCheckIcon/> Events</div>
            </Link>
            <Link href='/admin/videos' className='block hover:shadow-slate-600 dark:hover:shadow-slate-400 hover:shadow-md dark:bg-zinc-700 bg-zinc-300 p-3 rounded-md  text-xs md:text-lg'>
              <div className='flex items-center gap-3'>
                <VideoIcon/> Videos</div>
            </Link>
            <Link href='/admin/messages' className='block hover:shadow-slate-600 dark:hover:shadow-slate-400 hover:shadow-md dark:bg-zinc-700 bg-zinc-300 p-3 rounded-md  text-xs md:text-lg'>
              <div className='flex items-center gap-3'>
                <MailIcon/>  Messages</div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default SideNavigation
