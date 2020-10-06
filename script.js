const AVATAR = document.querySelector("#user-avatar");
const INPUT = document.querySelector("#upload");

const handleUpload = event => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const imageBuffer = reader.result;
    AVATAR.style.background = `url(${imageBuffer}) center center/cover`;
  };
};

INPUT.addEventListener("change", handleUpload);
