I recently wrote on how to customize the default upload button but I want to explore more into this topic and try other options.

I designed an interface to upload a user avatar

![final look](https://cdn.hashnode.com/res/hashnode/image/upload/v1613314683287/8begRVXIb.png)

## How to

We'll start with our HTML

```html
<main>
  <input type="file" name="image" id="image" accept="image/*" />
  <div id="preview-wrapper">
    <div id="preview"></div>
    <button
      id="upload-button"
      aria-label="upload image"
      aria-describedby="image"
    >
      🙂
    </button>
  </div>
</main>
```

## Styling

We give some style for our user avatar.

```css
#avatar {
  background-color: antiquewhite;
  height: 200px;
  width: 200px;
  border: 3px solid #0af;
  border-radius: 50%;
  transition: background ease-out 200ms;
}

#preview {
  position: relative;
}
```

We then hide our input

```css
input[type="file"] {
  display: none;
}
```

Then our custom upload button

```css
button {
  padding: 18px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: #08f;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  transition: background-color ease-out 120ms;
  position: absolute;
  right: -5%;
  bottom: 0%;
}

button:hover {
  background-color: #45a;
}
```

We've reached our design goal 🙌, but we aren't done yet.

## Some JavaScript

### Our initialization

```js
const UPLOAD_BUTTON = document.getElementById("upload-button");
const FILE_INPUT = document.querySelector("input[type=file]");
const AVATAR = document.getElementById("avatar");
```

When our custom button is clicked, we have to programmatically click the input element

```js
UPLOAD_BUTTON.addEventListener("click", () => FILE_INPUT.click());
```

To render our image

```js
FILE_INPUT.addEventListener("change", event => {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = () => {
    AVATAR.setAttribute("aria-label", file.name);
    AVATAR.style.background = `url(${reader.result}) center center/cover`;
  };
});
```

## **WE ARE DONE!!!** 🥳🥳🥳

Source code available at [codepen.io](https://codepen.io/gameshaker/pen/jOrNqRj) and [github](https://github.com/Dchole/custom-upload-btn-2.git)
