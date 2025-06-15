'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UseGetFighterMatcherQuery } from '@/hooks/fighter-matcher/use-get-fighter-matcher-query'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '@/components/core/loading-spinner'
import { AlertError } from '@/components/core/alert-error'
import { AlertInfo } from '@/components/core/alert-info'
import { MatchesCarrousel } from '../matches-carrousel'

export default function OpponentsPage() {
  const session = useSession()
  const fighterid = session.data?.userId || -1
  const router = useRouter()
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Your browser does not support geolocation.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords({ lat: coords.latitude, lng: coords.longitude })
      },
      (err) => {
        setError(
          err.code === err.PERMISSION_DENIED
            ? 'You denied location permission.'
            : 'Unable to retrieve your location.'
        )
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  const queryEnabled = coords !== null && coords.lat !== 0 && coords.lng !== 0 && fighterid !== -1
  const fighterMatcherQuery = UseGetFighterMatcherQuery(1, queryEnabled)

  if (fighterMatcherQuery.isLoading) {
    return <LoadingSpinner />
  }

  if (fighterMatcherQuery.isError || !fighterMatcherQuery.data || error) {
    return <AlertError description={'An error has ocurred'} />
  }

  if (fighterMatcherQuery.data.length === 0) {
    return (
      <AlertInfo title={'No opponents found'} />
    )
  }

  return (
    <MatchesCarrousel fighters={fighterMatcherQuery.data} />
  )
}
