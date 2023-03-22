//CORE
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Divider, IconButton, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

//ICON
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//CUSTOM
import { CommentDetailsWrapper, PopOverWrapper } from './CommentDetails.style';
import { CreateUserName, stringAvatar } from 'Helpers/Utils';
import { ReadMore } from '../ReadMore';
import { API_URL } from 'Helpers/Paths';
import Api from 'Helpers/ApiHandler';
import { PAGINATION_INIT } from 'Helpers/Constants';
import LoadMore from 'Components/common/LoadMore';
import { showToast } from 'Redux/App/Actions';

const TEXT_LENGTH = 255;

const CommentDetails = ({ postData, collapseDialog }) => {
    const API = useMemo(() => new Api(), []);
    const userProfileData = useSelector((state) => state?.App.userData);
    const dispatch = useDispatch()

    const [popOverMenu, setPopOverMenu] = useState(null);
    const [commentDescription, setCommentDescription] = useState('');
    const [resetCommentData, setResetCommentData] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState(PAGINATION_INIT);
    const [commentId, setCommentId] = useState(null);
    const [commentsData, setCommentsData] = useState({
        data: [],
        totalRecord: 0
    });

    const handlePagination = () => {
        setPaginationInfo((prev) => {
            return { ...prev, pageNo: prev.pageNo + 1 };
        });
    };

    const handleCommentAlternation = (e, id) => {
        setPopOverMenu(e?.currentTarget);
        setCommentId(id);
    };

    const handlePopoverClose = () => {
        setCommentId(null);
        setPopOverMenu(null);
    };

    const handleAddPost = async () => {
        const response = await API.post(API_URL.ADD_COMMENT_URL, {
            data: {
                postId: postData?.postId,
                userId: userProfileData?.id,
                comment: commentDescription
            }
        });

        if (response) {
            dispatch(showToast(response?.data?.message, 'success'));
            setCommentDescription('');
            setResetCommentData((prev) => !prev);
        }
    };

    const handleCommentDelete = async () => {
        if (commentId) {
            const response = await API.delete(`${API_URL.DELETE_COMMENT_URL}/${commentId}`);

            if (response) {
                dispatch(showToast(response?.data?.message, 'success'));
                setResetCommentData((prev) => !prev);
                handlePopoverClose();
            }
        }
    };

    const getCommentData = useCallback(async () => {
        const response = await API.post(`${API_URL.GET_COMMENT_URL}/${postData?.postId}`, {
            data: {
                perPage: paginationInfo?.perPage,
                page: paginationInfo?.pageNo
            }
        });

        if (response) {
            setCommentsData((prev) => {
                let arr =
                    paginationInfo?.pageNo === 0
                        ? response?.data?.data?.rows
                        : prev.data.concat(response?.data?.data?.rows);
                return {
                    data: [...new Map(arr.map((item) => [item['commentId'], item])).values()],
                    totalRecord: response?.data?.data?.count
                };
            });
        }
    }, [API, postData?.postId, paginationInfo]);

    useEffect(() => {
        collapseDialog && getCommentData();
    }, [getCommentData, resetCommentData, collapseDialog]);

    return (
        <CommentDetailsWrapper>
            <Box className="comments flex f-column">
                {commentsData?.data.map((comment) => (
                    <Box key={comment.commentId} className="comment-box flex">
                        <Avatar
                            {...stringAvatar(
                                CreateUserName(comment?.user?.firstName, comment?.user?.lastName),
                                comment?.user?.profilePic
                            )}
                        />
                        <Box>
                            <Typography className="user-name">
                                {CreateUserName(comment?.user?.firstName, comment?.user?.lastName)}
                            </Typography>
                            <ReadMore childrenLength={190}>{comment?.comment}</ReadMore>
                        </Box>
                        {comment.userId === userProfileData?.id && (
                            <IconButton
                                className="comment-options"
                                onClick={(e) => handleCommentAlternation(e, comment?.commentId)}>
                                <MoreVertIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}
                {commentsData?.data.length < commentsData.totalRecord && (
                    <LoadMore onClickFuc={handlePagination} />
                )}
            </Box>
            {!!commentsData.totalRecord && <Divider className="divider" />}
            <Box className="create-post flex">
                <Avatar
                    {...stringAvatar(
                        CreateUserName(userProfileData?.firstName, userProfileData?.lastName),
                        userProfileData?.profilePic
                    )}
                />
                <TextField
                    variant="outlined"
                    className="input-field"
                    placeholder={`Add a comment for ${CreateUserName(
                        postData?.user?.firstName || userProfileData?.firstName,
                        postData?.user?.lastName || userProfileData?.lastName
                    )}`}
                    value={commentDescription}
                    onChange={(e) => setCommentDescription(e?.target?.value)}
                    inputProps={{ maxLength: TEXT_LENGTH }}
                    InputProps={{
                        classes: {
                            focused: 'input-focused',
                            notchedOutline: 'input-outline'
                        }
                    }}
                    fullWidth
                    multiline
                    maxRows={4}
                    minRows={1}
                    size="small"
                />
                <IconButton onClick={handleAddPost}>
                    <ControlPointIcon />
                </IconButton>
            </Box>
            <PopOverWrapper
                open={Boolean(popOverMenu)}
                anchorEl={popOverMenu}
                onClose={handlePopoverClose}
                classes={{ paper: 'popover-paper' }}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right'
                }}>
                <Box className="edit-box">
                    <IconButton className="icon">
                        <EditIcon />
                    </IconButton>
                </Box>
                <Box className="delete-box">
                    <IconButton className="icon" onClick={handleCommentDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </PopOverWrapper>
        </CommentDetailsWrapper>
    );
};

export default CommentDetails;
