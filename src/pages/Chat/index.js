import React, { useState, useEffect, useRef } from "react";
import { Flex, Box, Button } from "rebass";
import { Input } from "@rebass/forms";
import { connect } from "react-redux";
import io from "socket.io-client";
import axios from "axios";

let socket;

function Chat({ accessToken }) {
  const [messages, setMessages] = useState([]),
    [input, setInput] = useState(""),
    messagesFooter = useRef(null);

  useEffect(() => {
    if (!socket) {
      socket = io(`http://localhost:3162/?access_token=${accessToken}`);
      socket.on("message", (response) => {
        let new_message = JSON.parse(response);
        new_message.id = parseInt(new_message.id);

        // We might receive duplicates
        for (let i = 0; i < messages.length; ++i)
          if (messages[i].id === new_message.id) return;

        setMessages((messages) => [...messages, new_message]);
      });
    }

    // eslint-disable-next-line
  }, []);

  useEffect(
    () =>
      messagesFooter &&
      messagesFooter.current.scrollIntoView({ behavior: "smooth" })
  );

  function sendMessage(text) {
    if (text === "") return;
    axios.put(
      "http://localhost:3161/message",
      { text },
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );

    setInput("");
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      // TODO: Refactor
      height="calc(100vh - 16px)"
    >
      <Box height="100%" overflowY="scroll">
        {messages.map((message) => (
          <div key={message.id}>
            {message.sender}: {message.text}
          </div>
        ))}

        <div style={{ clear: "both", height: "1em" }} ref={messagesFooter} />
      </Box>
      <Box height="2em">
        <Flex>
          <Input
            autoFocus
            placeholder="Type your message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") sendMessage(input);
            }}
          />
          <Button ml={2} onClick={sendMessage}>
            Send
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

const mapStateToProps = (state) => ({
  accessToken: state.app.accessToken,
});

export default connect(mapStateToProps)(Chat);
