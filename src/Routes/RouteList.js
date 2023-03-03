//PATH
import {
    URL_FRIEND_PAGE,
    URL_HOME_PAGE,
    URL_NOTIFICATION_PAGE,
    URL_PROFILE_PAGE
} from 'Helpers/Paths';

//COMPONENT
import { HomePage } from 'Components/pages/HomePage';
import { Profile } from 'Components/pages/Profile';
import { Notification } from 'Components/pages/Notification';
import { Friends } from 'Components/pages/Friends';

const RoutesList = [
    {
        path: URL_HOME_PAGE,
        exact: true,
        Component: <HomePage />
    },
    {
        path: URL_PROFILE_PAGE,
        exact: true,
        Component: <Profile />
    },
    {
        path: URL_NOTIFICATION_PAGE,
        exact: true,
        Component: <Notification />
    },
    {
        path: URL_FRIEND_PAGE,
        exact: true,
        Component: <Friends />
    }
];

export default RoutesList;
