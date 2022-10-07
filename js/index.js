const body = document.querySelector("body");
const nBgImg = 12; // total number of background images
const bgImgFolder = "./img/";
const bgImgPrefix = "bg";
const bgImgExt = "jpg";

bgImgFileName = `${bgImgFolder}${bgImgPrefix}${Math.floor(
  Math.random() * nBgImg
)}.${bgImgExt}`;
console.log(bgImgFileName);

body.style.backgroundImage = "url('" + bgImgFileName + "')";
// body.style.backgroundImage = "url('./img/bg1.jpg')";
