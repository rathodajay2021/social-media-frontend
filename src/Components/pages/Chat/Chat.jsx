//CORE
import React, { useEffect, useRef, useState } from 'react';
import { ChatWrapper } from './Chat.style';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from 'firebase-config';

//ICONS
import SendIcon from '@mui/icons-material/Send';
import MessageIcon from '@mui/icons-material/Message';

//CUSTOM
import { CreateUserName } from 'Helpers/Utils';

const Chat = () => {
    const messageRef = collection(db, 'chatMsg'); //firebase collection ref
    const msgAreaRef = useRef(null);
    const UserProfileData = useSelector((state) => state.App.userData);

    const [textMsg, setTextMsg] = useState('');
    const [messageList, setMessageList] = useState([]);

    const handleChatMsg = (e) => {
        //submit on enter key
        e.keyCode === 13 && handleSubmitChat();
    };

    const handleSubmitChat = async () => {
        try {
            if (textMsg.trim() === '') return;
            //send msg to firebase db
            const response = await addDoc(messageRef, {
                message: textMsg,
                createdAt: serverTimestamp(),
                userName: CreateUserName(UserProfileData?.firstName, UserProfileData?.lastName),
                userId: UserProfileData?.id
            });

            if (response) setTextMsg('');
        } catch (error) {}
    };

    useEffect(() => {
        //keep sync msgList state with firebase db
        const queryMessages = query(collection(db, 'chatMsg'), orderBy('createdAt')); //firebase query
        const unsubscribe = onSnapshot(queryMessages, (snapShot) => {
            let messages = [];
            snapShot.forEach((doc) => messages.push({ ...doc.data(), id: doc.id }));
            setMessageList(messages);
            console.log(messages);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        //scroll to bottom on new msg
        if (msgAreaRef && msgAreaRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = msgAreaRef.current;
            if (scrollTop + clientHeight < scrollHeight)
                msgAreaRef?.current?.scrollTo({
                    top: msgAreaRef?.current?.scrollHeight,
                    behavior: 'smooth'
                });
        }
    }, [messageList]);

    return (
        <ChatWrapper className="flex f-column f-v-center">
            <Box className="container flex f-column">
                {!!messageList.length ? (
                    <Box className="msg-container flex f-column" ref={msgAreaRef}>
                        {messageList.map((item) => (
                            <Box
                                key={item?.id}
                                className={`msg-wrapper ${
                                    item?.userId === UserProfileData?.id
                                        ? 'msg-send flex f-column'
                                        : 'msg-received'
                                }`}>
                                <Typography className="user-name">
                                    {item?.userId === UserProfileData?.id ? 'You' : item?.userName}
                                </Typography>
                                <Typography className="user-msg">{item?.message}</Typography>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Box className="no-chat-container flex f-column f-v-center f-h-center">
                        <MessageIcon className="msg-icon" />
                        <Typography className="title">no chat message</Typography>
                        <Typography className="sub-title">
                            Start conversing to see your messages here
                        </Typography>
                    </Box>
                )}
                <Box className="input-field-wrapper">
                    <TextField
                        fullWidth
                        name="textMsg"
                        className="input-field"
                        placeholder="Write a message..."
                        value={textMsg}
                        onChange={(e) => setTextMsg(e?.target?.value)}
                        onKeyDown={handleChatMsg}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSubmitChat}>
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            classes: {
                                focused: 'input-focused',
                                notchedOutline: 'input-outline'
                            }
                        }}
                    />
                </Box>
            </Box>
        </ChatWrapper>
    );
};

export default Chat;
