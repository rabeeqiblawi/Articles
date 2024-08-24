# Creating a Custom Bot

In today's digital age, bots are more common than ever, automating tasks and making user experiences better on different platforms. From customer service chatbots to social media helpers, bots are changing how we interact with technology. This article will show you a simple way to create your own custom bot using Python and a library called Streamlit. While this bot can be adapted to work with different language models, we will use the OpenAI API because it's easy to use, and the AI model is run on OpenAI's servers. We will use HTTP APIs to interact with the AI model.

## Setting up the Environment

The installation of the libraries is strait forward, you can use pip, conda to install the packages

```
pip install openai streamlit
```

## Optaining the API Key

OpenAI requires a key to access the API, the process is not hard, but requires a payment method visa, mastercard, or paypal.

## Creating a Call to the OPENAI API

After optaining the key, the proccess of interacting with the api is easy

```python

from openai import OpenAI

api_key = "sk-proj-dx55sg..."
client = OpenAI(api_key=api_key)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "act as a robot with no feelings that lives in the year 3000 where all humans where killed by wars"},
        {
            "role": "user", "content": "hello! what's up?"
        }
    ]
)

print(response.choices[0].message.content)
```

The chat completion function accepts various parameters for the API. For now, our focus will be on selecting the model and providing some messages. In a typical scenario, the response can be found within the nested object using this snippet: `response.choices[0].message.content`.

## Creating a Streamlit App

Streamlit is a powerful Python library for creating web applications with a focus on simplicity and ease of use. It's particularly well-suited for data scientists, engineers, and technical users who want to quickly build interactive data applications without delving deep into web development.

Like standard web development frameworks, Streamlit provides elements where values can be passed in. However, it distinguishes itself by offering:

1. A built-in design system tailored for technical users
2. A minimal interface that prioritizes functionality
3. A streamlined approach to creating data-centric applications

Here's a simple example to get you started:

```python
import streamlit as st

# Create a title for your app
st.title("Amazing Title!")

# Add some text
st.write("Welcome to my Streamlit app!")

# Create a slider
age = st.slider("How old are you?", 0, 100, 25)

# Display the result
st.write(f"You are {age} years old.")

# Add a button
if st.button("Click me!"):
    st.write("You clicked the button!")

# Display a dataframe
import pandas as pd
df = pd.DataFrame({
    'Column 1': [1, 2, 3, 4],
    'Column 2': [10, 20, 30, 40]
})
st.dataframe(df)
```

## Integrating OpenAI with Streamlit to create a chatbot.

This script sets up a chat application that feels a lot like chatting with ChatGPT. You’ll have an input box for your questions,
and just like that, the assistant will respond.

### Importing the Libraries and the API Key

```python
import streamlit as st
import os
from openai import OpenAI

api_key = "sk-proj-bS57nVF****************************************
client =  OpenAI(api_key=api_key)

st.title("CHATGPT-like Clone")

```

### Storing messages in the session state and displaying them

We said at the begining that streamlit has built in styled elements, actually it's more than that, streamlit has actually a self contained server, with session managment built in.
session managment prevents differnet users conflecting with each other, where each one of them having his own seperate context. in streamlit we can save variables to ession with key value
pairs, with keys being of type string, we'll use this feature to store messages.

```python
if "messages" not in st.session_state:
     st.session_state.messages = []

for message in st.session_state.messages:
     with st.chat_message(message["role"]):
         st.markdown(message["content"])


```

When you enter the `with` block, Streamlit knows that you're about to display a chat message, and it will handle the formatting appropriately.

### Adding the prompt (user input)

```python
prompt = st.chat_input("What's up?")

if prompt:
    with st.chat_message(name = "user"):
        st.markdown(prompt)

st.session_state.messages.append({"role" : "user" , "content":prompt})
```

### Chat completion

```python
    with st.chat_message("assistant"):
        stream = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": m["role"], "content": m["content"]}
                for m in st.session_state.messages
            ],
            stream=True,
        )
        response = st.write_stream(stream)
    st.session_state.messages.append({"role": "assistant", "content": response})
```

### Putting it all together

```python
import streamlit as st
import os
from openai import OpenAI

api_key = "sk-proj-5Y**************uphjdqpSRe9E-oEA**************"

st.title("CHATGPT-like Clone")
client =  OpenAI(api_key=api_key)

if "messages" not in st.session_state:
     st.session_state.messages = []

for message in st.session_state.messages:
     with st.chat_message(message["role"]):
         st.markdown(message["content"])

prompt = st.chat_input("What's up?")

if prompt:
    with st.chat_message(name = "user"):
        st.markdown(prompt)

    st.session_state.messages.append({"role" : "user" , "content":prompt})

    messages = []
    sys_message = "Act as professor who is proffeient in teaching AI"
    messages.append({
        "role": "system",
        "content": sys_message
    })
    for m in st.session_state.messages:
        messages.append({"role": m["role"], "content": m["content"]})

    with st.chat_message("assistant"):
        stream = client.chat.completions.create(
            model="gpt-4o-mini",
            messages = messages,
            stream=True,
        )
        response = st.write_stream(stream)
    st.session_state.messages.append({"role": "assistant", "content": response})
```

## Customizing the Bot System Message

One of the most powerful features of using the OpenAI API is the ability to customize the behavior of your bot through the system message. This message sets the context for the conversation and can significantly influence how the AI responds to user inputs. By tailoring the system message, you can create a bot that embodies specific characteristics, expertise, or personality traits.

### Understanding the System Message

The system message is the first message in the conversation and serves as a directive for the AI. It can define the role the AI should play, the tone of the conversation, and any specific knowledge or expertise it should draw upon. For example, you might want your bot to act as a friendly assistant, a technical expert, or even a character from a story.

### Examples of Custom System Messages

Here are a few examples of how you can customize the system message to create different types of bots:

1. **Friendly Assistant**:
   ```python
   sys_message = "You are a friendly assistant who helps users with their questions and provides useful information."
   ```

2. **Technical Expert**:
   ```python
   sys_message = "You are a technical expert in machine learning and artificial intelligence, ready to answer complex questions."
   ```

3. **Story Character**:
   ```python
   sys_message = "You are Sherlock Holmes, a brilliant detective in Victorian London, solving mysteries and answering questions."
   ```

4. **Motivational Coach**:
   ```python
   sys_message = "You are a motivational coach who inspires users to achieve their goals and overcome challenges."
   ```

### Implementing the Custom System Message

To implement a custom system message in your Streamlit app, simply replace the `sys_message` variable in your code with one of the examples above or create your own. Here’s how you can do it:

```python
# Customizing the bot system message
sys_message = "You are a friendly assistant who helps users with their questions and provides useful information."

messages.append({
    "role": "system",
    "content": sys_message
})
```
