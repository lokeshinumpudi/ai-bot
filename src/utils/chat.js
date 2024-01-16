import { useState, useEffect } from "react";

export const FetchChatText = () => {
  let [modalStreamText, setModalResponseText] = useState("");
  let [streamDone, setStreamDone] = useState(false);
  let [userInput, setUserInput] = useState("");
  let [msgHistory, setMsgHistory] = useState([
    {
      role: "system",
      content:
        "You are an intelligent assistant tutor to students. Respond as if you are talking to students who are seeking your help. You will guide students with their queries. You always provide well-reasoned answers that are both correct and helpful. Do not provide solutions directly if student is asking for solutions but instead guide with useful information but help with the planning. Don't respond math solutions but guide the student towards solution",
    },
  ]);

  useEffect(() => {
    if (!userInput.length) return;
    let myHeaders = new Headers();
    setStreamDone(false);
    myHeaders.append("Content-Type", "application/json");
    let latestMessagesArr = [...msgHistory];
    latestMessagesArr.push(makeUserTextRequest(userInput));
    setMsgHistory(latestMessagesArr);
    let raw = JSON.stringify({
      messages: latestMessagesArr,
      temperature: 0.7,
      max_tokens: -1,
      stream: true,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:1234/v1/chat/completions", requestOptions)
      .then((response) => response)
      .then((result) => {
        let streamReader = result.body.getReader();
        latestMessagesArr.push({});

        let messageFinal = "";

        const readChunk = () => {
          // Read a chunk from the reader
          streamReader
            .read()
            .then(({ value, done }) => {
              // Check if the stream is done
              if (done) {
                // Log a message
                // console.log("Stream finished");
                // Return from the function
                console.log(messageFinal, "done");
                setStreamDone(true);
                return;
              }
              // Convert the chunk value to a string
              const chunkString = JSON.parse(
                new TextDecoder().decode(value).split("data: ")[1]
              );
              // Log the chunk string
              let contentString = chunkString.choices[0]?.delta?.content;
              if (contentString) {
                messageFinal += contentString;
                latestMessagesArr[latestMessagesArr.length - 1] =
                  makeAssistantTextRequest(messageFinal);
                setMsgHistory(latestMessagesArr);
                setModalResponseText(messageFinal);
                // console.log(contentString);
              }
              // Read the next chunk
              readChunk();
            })
            .catch((error) => {
              // Log the error
              console.error(error);
            });
        };
        // Start reading the first chunk
        readChunk();
      })
      .catch((error) => console.log("error", error));
  }, [userInput]);

  return { modalStreamText, streamDone, setUserInput, msgHistory };
};

export const makeUserTextRequest = (text) => {
  return {
    role: "user",
    content: text,
  };
};

export const makeAssistantTextRequest = (text) => {
  return {
    role: "assistant",
    content: text,
  };
};
