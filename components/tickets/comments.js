import React, { useEffect, useState, useRef } from 'react';
import { Box, Paper, alpha, Divider } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import scrollIntoView from 'scroll-into-view-if-needed'
import Stack from '@mui/material/Stack';
import { apiService } from 'authscape';
import { useTheme } from '@mui/material';

export function Comments({ticketId, isNote, isDisabled, currentUser}) {

    const theme = useTheme();
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);

    const reloadMessages = async () => {

        let response = await apiService().get("/Ticket/GetMessages?TicketId=" + ticketId + "&isNote=" + isNote);
        if (response != null && response.status == 200)
        {
            setComments(response.data);
        }

        setTimeout(() => {
            const node = document.getElementById('messages-end');
            if (node != null)
            {
                scrollIntoView(node, { behavior: 'smooth', scrollMode: 'if-needed' })
            }
        }, 100);

    }

    useEffect(() => {

        if (ticketId != null)
        {
            const asyncPush = async () => {
                await reloadMessages();
            }
            asyncPush();
        }

    }, [ticketId]);

    const SendMessage = async () => {

        if (message !== "")
        {
            let response = await apiService().post("/Ticket/CreateMessage", {
                ticketId: ticketId,
                name: currentUser.firstName,
                message: message,
                createdByUserId: currentUser.id,
                isNote: isNote
            });

            if (response != null && response.status == 200)
            {
                await reloadMessages();
                setMessage("");
            }
        }
    }

    const getInitials = (firstName) => {
        return firstName?.charAt(0).toUpperCase() || '?';
    };

    return (
        <Box sx={{
            display:"flex",
            flexDirection:"column",
            height:"500px",
            bgcolor: 'background.default',
            borderRadius: 2,
            overflow: 'hidden'
        }}>
            <Box sx={{
                flex: "1 1 auto",
                overflow:"auto",
                p: 2
            }}>
                {comments.length == 0 ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: 'text.secondary'
                    }}>
                        <QuestionAnswerOutlinedIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                        <Typography variant="body2" textAlign="center">
                            Add your first {isNote ? "note" : "message"}
                        </Typography>
                        <Typography variant="caption" textAlign="center" color="text.secondary">
                            {isNote ? "Your notes" : "The conversation history"} will appear here
                        </Typography>
                    </Box>
                ) : (
                    <Stack spacing={2}>
                        {comments.map((comment, index) => {
                            const isCurrentUser = comment.firstName === currentUser.firstName;
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        gap: 1.5,
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: isCurrentUser ? 'primary.main' : 'secondary.main',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        {getInitials(comment.firstName)}
                                    </Avatar>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 0.5
                                        }}>
                                            <Typography variant="body2" fontWeight={600}>
                                                {comment.firstName}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {comment.created}
                                            </Typography>
                                        </Box>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 1.5,
                                                bgcolor: isCurrentUser
                                                    ? alpha(theme.palette.primary.main, 0.08)
                                                    : alpha(theme.palette.background.default, 0.5),
                                                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                                borderRadius: 2,
                                                borderTopLeftRadius: 4
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                {comment.message}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                </Box>
                            );
                        })}
                        <div id="messages-end" ref={messagesEndRef}></div>
                    </Stack>
                )}
            </Box>

            <Divider />

            <Box sx={{ p: 2 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                        '&:focus-within': {
                            borderColor: 'primary.main',
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                        },
                        transition: 'all 0.2s'
                    }}
                >
                    <InputBase
                        sx={{
                            ml: 1,
                            flex: 1,
                            fontSize: '0.875rem'
                        }}
                        disabled={isDisabled}
                        multiline
                        maxRows={4}
                        onKeyUp={(event) => {
                            if (event.key === "Enter" && !event.shiftKey)
                            {
                                event.preventDefault();
                                SendMessage();
                            }
                        }}
                        placeholder={!isNote ? "Type your message..." : "Write your notes..."}
                        value={message}
                        onChange={(value) => {
                            setMessage(value.target.value);
                        }}
                    />
                    <IconButton
                        disabled={isDisabled || !message.trim()}
                        sx={{
                            bgcolor: message.trim() ? 'primary.main' : 'transparent',
                            color: message.trim() ? 'white' : 'text.secondary',
                            '&:hover': {
                                bgcolor: message.trim() ? 'primary.dark' : alpha(theme.palette.action.hover, 0.04)
                            },
                            transition: 'all 0.2s',
                            '&.Mui-disabled': {
                                bgcolor: 'transparent',
                                color: 'text.disabled'
                            }
                        }}
                        onClick={() => {
                            SendMessage();
                        }}
                    >
                        <SendRoundedIcon fontSize="small" />
                    </IconButton>
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Press Enter to send, Shift+Enter for new line
                </Typography>
            </Box>
        </Box>
    );
}
