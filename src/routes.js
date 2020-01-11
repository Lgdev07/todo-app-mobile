import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import New from './pages/New'
import TaskDetail from './pages/TaskDetail'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Dashboard,
        New,
        TaskDetail
    })
)

export default Routes