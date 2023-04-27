//CORE
import React, { useEffect, useState } from 'react';
import { ChatWrapper } from './Chat.style';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';

//ICONS
import SendIcon from '@mui/icons-material/Send';

//CUSTOM
import { db } from 'firebase-config';
import { CreateUserName } from 'Helpers/Utils';

const Chat = () => {
    const messageRef = collection(db, 'chatMsg');
    const UserProfileData = useSelector((state) => state.App.userData);

    const [textMsg, setTextMsg] = useState('');

    const handleSubmitChat = async () => {
        try {
            if (textMsg.trim() === '') return;
            console.log('return fail');
            const response = await addDoc(messageRef, {
                message: textMsg,
                createdAt: serverTimestamp(),
                userName: CreateUserName(UserProfileData?.firstName, UserProfileData?.lastName),
                userId: UserProfileData?.id
            });
            console.log('🚀 ~ file: Chat.jsx:31 ~ handleSubmitChat ~ response:', response);

            if (response) setTextMsg('');
        } catch (error) {}
    };

    useEffect(() => {
        const queryMessages = query(messageRef, where())
        onSnapshot(queryMessages)
    }, []);

    return (
        <ChatWrapper className="flex">
            <Box className="text-msg-wrapper">
                <TextField
                    name="textMsg"
                    fullWidth
                    value={textMsg}
                    onChange={(e) => setTextMsg(e?.target?.value)}
                    // size="small"
                    onKeyDown={(e) => {
                        e.keyCode === 13 && handleSubmitChat();
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSubmitChat}>
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
        </ChatWrapper>
    );
};

export default Chat;
