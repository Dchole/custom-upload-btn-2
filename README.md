# Create upload user avatar with a custom upload button

I recently wrote on how to customize the default upload button but I want to explore more into this topic and try other options.

I designed an interface to upload user avatar

![final look](fin.png)

## How to

We'll start with our html

```html
<section>
  <div id="user-avatar" aria-label="user avatar"></div>
  <input type="file" name="upload" id="upload" accept="image/*" />
  <label for="upload">
    <span role="button" tabindex="0" aria-label="upload user profile">
      👾
    </span>
  </label>
</section>
```

### **`<label>`**

We can't use interactive elements like `<button>` or `<a>` elements in an element. [Learn more from the docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#Accessibility_concerns). For this reason, we need use either a `<span>` or a `<div>`.

### The Attributes

- `role="button"` to specify the role of our element for assistive technologies
- `tabindex="0"` to make our element focusable
- `aria-label` is neccesary because we have no meaningful text content in our element. This is also important for assistive technologies.

## Styling

We give some style for our user avatar.

```css
section {
  position: relative;
  height: 250px;
  width: 250px;
}

#user-avatar {
  height: inherit;
  width: inherit;
  border: 3px solid lightblue;
  border-radius: 50%;
  transition: ease-out 200ms;
}
```

We then hide our input

```css
input {
  display: none;
}
```

Leaving us with our `<label>` and our fake button.

We then style our button

```css
label span[role="button"] {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 60px;
  width: 60px;
  background-color: lightblue;
  display: grid;
  place-items: center;
  border-radius: 50%;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  transition: ease-out 200ms;
  cursor: pointer;
}

label span:hover,
label span:focus {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  background-color: #1e94bb;
}
```

We've reached our design goal 🙌, but we aren't done yet.

## Some JavaScript

```js
const AVATAR = document.querySelector("#user-avatar");
const INPUT = document.querySelector("#upload");
const BTN = document.querySelector('span[role="button"]');
```

A function to handle our upload

```js
const handleUpload = event => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const imageBuffer = reader.result;
    AVATAR.style.background = `url(${imageBuffer}) center center/cover`;
  };
};
```

And then we call our event

```js
INPUT.addEventListener("change", handleUpload);
```

<!-- Embed codepen.io -->

We're done, except for one issue.
Our button is _focusable_ and _clickable_ but what about key event? 😬

A normal button should respond to key events but our button is not responding.

The best solution I could come up with was

```js
BTN.addEventListener("keypress", event => {
  if (event.key === " " || event.key === "Enter") {
    BTN.click();
  }
});
```

_"I know this may not be the best solution for this issue so I'd like to see other suggestions."_

### **Finally**

## **WE ARE DONE!!!** 🥳🥳🥳

Source code available at [codepen.io](https://codepen.io/gameshaker/pen/jOrNqRj) and [github](https://github.com/Dchole/custom-upload-btn-2.git)
