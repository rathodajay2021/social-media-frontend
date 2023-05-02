//CORE
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChatWrapper } from './Chat.style';
import { Avatar, Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    serverTimestamp,
    doc,
    getDoc
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from 'firebase-config';

//ICONS
import SendIcon from '@mui/icons-material/Send';
import MessageIcon from '@mui/icons-material/Message';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

//CUSTOM
import { CreateUserName, stringAvatar } from 'Helpers/Utils';
import { ChatUsers } from './ChatUsers';
import Loader from 'Components/common/Loader';

const Chat = () => {
    const msgAreaRef = useRef(null);
    const UserProfileData = useSelector((state) => state.App.userData);

    const [textMsg, setTextMsg] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [userChat, setUserChat] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChatMsg = (e) => {
        //submit on enter key
        e.keyCode === 13 && handleSubmitChat();
    };

    const handleSubmitChat = async () => {
        try {
            if (UserProfileData?.id && userChat?.userId) {
                if (textMsg.trim() === '') return;
                const docName = [UserProfileData?.id, userChat?.userId].sort().join('-'); //creating custom name for the doc
                const subCollection = collection(db, 'userChats', docName, 'chatMsg'); // sub collection ref
                //send msg to firebase db
                await setDoc(doc(subCollection), {
                    message: textMsg,
                    createdAt: serverTimestamp(),
                    userName: CreateUserName(UserProfileData?.firstName, UserProfileData?.lastName),
                    userId: UserProfileData?.id
                });

                setTextMsg('');
            }
            return;
        } catch (error) {
            console.error('🚀 ~ file: Chat.jsx:71 ~ handleSubmitChat ~ error:', error);
        }
    };

    const createNewConversation = useCallback(async () => {
        try {
            //on click of new user it will create new collection if there is no collection
            if (UserProfileData?.id && userChat?.userId) {
                setLoading(true);
                const docName = [UserProfileData?.id, userChat?.userId].sort().join('-');
                const docRef = doc(db, 'userChats', docName);

                const getResponse = await getDoc(docRef);

                if (!getResponse.exists()) await setDoc(docRef, {});
                setLoading(false);
            }
            return;
        } catch (error) {
            setLoading(false);
            console.error('🚀 ~ file: Chat.jsx:71 ~ createNewConversation ~ error:', error);
        }
    }, [userChat?.userId, UserProfileData]);

    useEffect(() => {
        //keep sync msgList state with firebase db
        const docName = [UserProfileData?.id, userChat?.userId].sort().join('-');
        const queryMessages = query(
            collection(db, 'userChats', docName, 'chatMsg'),
            orderBy('createdAt')
        ); //firebase query to order by date
        const unsubscribe = onSnapshot(queryMessages, (snapShot) => {
            let messages = [];
            snapShot.forEach((doc) => messages.push({ ...doc.data(), id: doc.id }));
            setMessageList(messages);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userChat?.userId, UserProfileData?.id]);

    useEffect(() => {
        createNewConversation();
    }, [createNewConversation]);

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
        <ChatWrapper
            className="flex f-v-center"
            $ChatContainerDisplay={userChat?.userId ? 'flex' : 'none'}>
            <ChatUsers setUserChat={setUserChat} userChat={userChat} />
            {userChat?.userId ? (
                <Box className="chat-container flex f-column">
                    <Loader isLoading={loading} loadingText={'Loading...'} />
                    <Box className="flex f-v-center chat-header">
                        <IconButton className="back-icon" onClick={() => setUserChat(null)}>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <Avatar
                            className="user-avatar"
                            {...stringAvatar(
                                CreateUserName(userChat?.firstName, userChat?.lastName),
                                userChat?.profilePic
                            )}
                        />
                        <Typography className="user-name">
                            {CreateUserName(userChat?.firstName, userChat?.lastName)}
                        </Typography>
                    </Box>
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
                                        {item?.userId === UserProfileData?.id
                                            ? 'You'
                                            : item?.userName}
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
            ) : (
                <Box className="flex f-column f-v-center f-h-center no-user-selected">
                    <MessageIcon className="msg-icon" />
                    <Typography className="title">Social media chat</Typography>
                    <Typography className="sub-title">Secure chat end-to-end encryption</Typography>
                </Box>
            )}
        </ChatWrapper>
    );
};

export default Chat;
