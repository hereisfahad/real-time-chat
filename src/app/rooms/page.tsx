"use client"

import clsx from 'clsx'
import React from 'react'

import EmptyState from '@/components/EmptyState'
import useRoom from '@/hooks/useRoom'

function Page({ }) {
  const { isOpen } = useRoom();

  return (
    <div className={clsx('h-full lg:block', isOpen ? 'block' : 'hidden')}>
      <EmptyState />
    </div>
  )
}

export default Page
