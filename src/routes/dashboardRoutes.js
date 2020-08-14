// @material-ui/icons
import Description from '@material-ui/icons/Description'
import CloudQueue from '@material-ui/icons/CloudQueue'
import DeviceHub from '@material-ui/icons/DeviceHub'
import Fingerprint from '@material-ui/icons/Fingerprint'
import EventNote from '@material-ui/icons/EventNote'
import Store from '@material-ui/icons/Store'
import Assignment from '@material-ui/icons/Assignment'
import AdbIcon from '@material-ui/icons/Adb';
import CloudOff from '@material-ui/icons/CloudOff'
import Security from '@material-ui/icons/Security'
import Assistant from '@material-ui/icons/Assistant'


import List from '@material-ui/icons/List'
import SdCard from '@material-ui/icons/SdCard'
import StorageIcon from '@material-ui/icons/Storage'

// core components/views
import GatekeeperPage from '../containers/gatekeeper/Gatekeeper'
import OrchestratorStatus from '../containers/orchestrator/Status/OrchestratorStatus'
import OrchestratorStore from '../containers/orchestrator/Store/OrchestratorStore'
import ServiceRegistryPage from '../containers/service_registry/ServiceRegistry/ServiceRegistry'
import IntraCloudPage from '../containers/auth/Intracloud/IntraCloud'
import InterCloudPage from '../containers/auth/Intercloud/InterCloud'
import EventHandlerPage from '../containers/eventhandler/EventHandler'
import Choreographer from '../containers/choreographer/Choreographer'
import SystemsPage from '../containers/service_registry/System/System'
import ServicesPage from '../containers/service_registry/Service/Service'
import InterfacePage from '../containers/service_registry/Interface/Interface'

const dashboardRoutes = [
  {
    collapse: true,
    path: '/serviceregistry',
    sidebarName: 'Service Registry',
    navbarName: 'Service Registry',
    icon: Description,
    state: 'serviceregistry',
    views: [
      {
        path: '/serviceregistry/entries',
        sidebarName: 'Entries',
        navbarName: 'Service Registry',
        icon: Description,
        component: ServiceRegistryPage
      },
      {
        path: '/serviceregistry/systems',
        sidebarName: 'Systems',
        navbarName: 'Systems',
        icon: AdbIcon,
        component: SystemsPage
      },
      {
        path: '/serviceregistry/services',
        sidebarName: 'Services',
        navbarName: 'Services',
        icon: AdbIcon,
        component: ServicesPage
      },
      {
        path: '/serviceregistry/interfaces',
        sidebarName: 'Interfaces',
        navbarName: 'Interfaces',
        icon: AdbIcon,
        component: InterfacePage
      }
    ]
  },
  {
    collapse: true,
    path: '/orchestrator',
    sidebarName: 'Orchestration',
    navbarName: 'Orchestration',
    icon: DeviceHub,
    state: 'orchestration',
    views: [
      /*  {
        path: '/orchestrator/status',
        navbarName: 'Status',
        sidebarName: 'Status',
        icon: StorageIcon,
        component: OrchestratorStatus
      },  */
      {
        path: '/orchestrator/store',
        sidebarName: 'Store',
        navbarName: 'Store',
        icon: Store,
        component: OrchestratorStore
      }
    ]
  },
  {
    collapse: true,
    path: '/authorization',
    sidebarName: 'Authorization',
    navbarName: 'Authorization',
    icon: Fingerprint,
    state: 'authorization',
    views: [
      {
        path: '/authorization/intracloud',
        sidebarName: 'Intracloud',
        navbarName: 'Intracloud',
        icon: CloudOff,
        component: IntraCloudPage
      },
      {
        path: '/authorization/intercloud',
        sidebarName: 'Intercloud',
        navbarName: 'Intercloud',
        icon: CloudQueue,
        component: InterCloudPage
      }
    ]
  },
  {
    path: '/gatekeeper',
    sidebarName: 'Gatekeeper',
    navbarName: 'Gatekeeper',
    icon: Security,
    component: GatekeeperPage
  },
  {
    path: '/eventhandler',
    sidebarName: 'Event Handler',
    navbarName: 'Event Handler',
    icon: EventNote,
    component: InterfacePage
  },
  {
    path: '/systemregistry',
    sidebarName: 'System Registry',
    navbarName: 'System Registry',
    icon: List,
    component: InterfacePage
  },
  {
    path: '/deviceregistry',
    sidebarName: 'Device Registry',
    navbarName: 'Device Registry',
    icon: SdCard,
    component: InterfacePage
  },
  {
    path: '/qos',
    sidebarName: 'QoS Monitor',
    navbarName: 'QoS Monitor',
    icon: Assistant,
    component: InterfacePage
  },
  {
    path: '/choreographer',
    sidebarName: 'Choreographer',
    navbarName: 'Choreographer',
    icon: Assignment,
    component: Choreographer
  },
  {
    redirect: true,
    path: '/',
    to: '/serviceregistry/entries',
    navbarName: 'Redirect'
  }
]

/*
  {
    path: '/eventhandler',
    sidebarName: 'Event Handler',
    navbarName: 'Event Handler',
    icon: EventNote,
    component: EventHandlerPage
  },
  {
    path: '/choreographer',
    sidebarName: 'Choreographer',
    navbarName: 'Choreographer',
    icon: Assignment,
    component: Choreographer
  },
 */

export default dashboardRoutes
