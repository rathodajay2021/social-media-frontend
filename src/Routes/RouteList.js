//PATH
import {
    URL_CHAT,
    URL_FRIEND_PAGE,
    URL_FRIEND_PROFILE_PAGE,
    URL_HOME_PAGE,
    URL_NOTIFICATION_PAGE,
    URL_PROFILE_PAGE
} from 'Helpers/Paths';

//COMPONENT
import { HomePage } from 'Components/pages/HomePage';
import { Profile } from 'Components/pages/Profile';
import { Notification } from 'Components/pages/Notification';
import { Friends } from 'Components/pages/Friends';
import { Chat } from 'Components/pages/Chat';

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
    },
    {
        path: URL_FRIEND_PROFILE_PAGE,
        exact: true,
        Component: <Profile />
    },
    {
        path: URL_CHAT,
        exact: true,
        Component: <Chat />
    }
];

export default RoutesList;
