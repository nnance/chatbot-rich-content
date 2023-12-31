import * as React from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";
import { ProgressIndicator } from "./ProgressIndicator";
import { ChatMessage as Message, ChatSender } from "../domain/ChatApplication";

export enum MessageOrder {
  First = "first",
  Middle = "middle",
  Last = "last",
}

export const ChatMessage = ({
  message,
  order,
}: {
  message: Message;
  order: MessageOrder;
}) => {
  const isBot = message.sender === ChatSender.assistant;

  const botRadius =
    order === MessageOrder.First
      ? "20px 20px 20px 5px"
      : order === MessageOrder.Last
      ? "5px 20px 20px 20px"
      : "5px 20px 20px 5px";

  const userRadius =
    order === MessageOrder.First
      ? "20px 20px 5px 20px"
      : order === MessageOrder.Last
      ? "20px 5px 20px 20px"
      : "20px 5px 5px 20px";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isBot ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ bgcolor: isBot ? "primary.main.grey[100]" : "primary.main" }}
        >
          {message.sender === ChatSender.assistant ? "A" : "U"}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            backgroundColor: isBot ? "primary.main.grey[100]" : "primary.main",
            color: isBot ? "" : "common.white",
            borderRadius: isBot ? botRadius : userRadius,
          }}
        >
          {message.content !== undefined ? (
            <Typography variant="body2">{message.content}</Typography>
          ) : (
            <ProgressIndicator />
          )}
        </Paper>
      </Box>
    </Box>
  );
};
