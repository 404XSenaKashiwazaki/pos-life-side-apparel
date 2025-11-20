"use client"

import React from 'react'
import FormSite from './formSite'
import { Card } from '@/components/ui/card'
import { useSite } from '@/components/providers/Site-provider'

const SiteSection = () => {
  const site = useSite()
  return (
    <FormSite name={site?.name ?? ""} filename={site?.filename ??""} fileUrl={site?.fileProofUrl ?? ""}  />
  )
}

export default SiteSection