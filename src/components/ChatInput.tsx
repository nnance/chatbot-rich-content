import * as React from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type ChatInputProps = {
  input: string;
  isLoading: boolean;
  handleInputChange: (input: string) => void;
  handleSend: () => void;
};

export const ChatInput = ({
  input,
  isLoading,
  handleInputChange,
  handleSend,
}: ChatInputProps) => {
  const inputReference = React.useRef<HTMLInputElement>(null);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event.currentTarget.value);
  };

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  React.useEffect(() => {
    if (inputReference.current && !isLoading) {
      inputReference.current.focus();
    }
  }, [inputReference, isLoading]);

  return (
    <Box sx={{ p: 2, backgroundColor: "background.default" }}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            inputRef={inputReference}
            size="small"
            fullWidth
            placeholder="Type a message"
            variant="outlined"
            value={input}
            onChange={onInputChange}
            onKeyPress={onKeyPress}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSend}
            disabled={isLoading}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
