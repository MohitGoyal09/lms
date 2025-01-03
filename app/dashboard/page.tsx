import CourseList from '@/components/Dashboard/CourseList'
import WelcomeBanner from '@/components/Dashboard/WelcomeBanner'
import React from 'react'

export default function Dashboard() {
  return (
    <div>
      <WelcomeBanner />
      <CourseList />
    </div>
  )
}

