"use client"

import React from 'react'

import EmptyState from '@/components/EmptyState'
import useRoom from '@/hooks/useRoom'
import { cn } from '@/lib/utils'

function Page({ }) {
  const { isOpen } = useRoom();

  return (
    <div className={cn('h-full lg:block', isOpen ? 'block' : 'hidden')}>
      <EmptyState />
    </div>
  )
}

export default Page
