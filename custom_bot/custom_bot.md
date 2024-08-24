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








