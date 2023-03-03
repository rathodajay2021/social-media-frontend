import FriendsDetails from 'Components/common/FriendsDetails';
import React from 'react';

const FriendDetails = [
    {
        id: 1,
        firstName: 'ajay',
        lastName: 'rathod',
        isFriend: true
    }
];

const Friends = () => {
    return (
        <div>
            {FriendDetails.map((friend) => (
                <FriendsDetails key={friend.id} friendDetails={friend} />
            ))}
        </div>
    );
};

export default Friends;
