import {
  faAddressCard, faBell, faFileLines, faStar,
} from '@fortawesome/free-regular-svg-icons'
import {
  faBug,
  faCalculator,
  faChartPie,
  faCode,
  faDroplet,
  faGauge,
  faLayerGroup,
  faLocationArrow,
  faPencil,
  faPuzzlePiece,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren } from 'react'
import { Badge } from 'react-bootstrap'
import SidebarNavGroup from '@/components/Layout/Dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/components/Layout/Dashboard/Sidebar/SidebarNavItem'
import { getDictionary } from '@/locales/dictionary'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

export default async function SidebarNav() {
  const dict = await getDictionary()
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faGauge} href="/">
        {dict.sidebar.items.dashboard}
      </SidebarNavItem>
      <SidebarNavTitle>{dict.sidebar.items.employees}</SidebarNavTitle>
      <SidebarNavItem icon={faCode} href="/user">
        {dict.sidebar.items.users}
      </SidebarNavItem>
      <SidebarNavTitle>{dict.sidebar.items.management}</SidebarNavTitle>
      <SidebarNavItem icon={faCode} href="/habitat">
        {dict.sidebar.items.habitats}
      </SidebarNavItem>
      <SidebarNavItem icon={faCode} href="/">
        {dict.sidebar.items.services}
      </SidebarNavItem>
      <SidebarNavItem icon={faCode} href="/">
        {dict.sidebar.items.animals}
      </SidebarNavItem>
    </ul>
  )
}
