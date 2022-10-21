const uploadBox = document.querySelector(".upload-box"),
previewImg = document.querySelector("img"),
fileIput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0]; // getting first user file
    if(!file) return; // return if user hasn't selected any file
    previewImg.src = URL.createObjectURL(file); // passing selected file url to preview img src
    previewImg.addEventListener("load", () => {  // once img loaded
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
    console.log(file)
}

widthInput.addEventListener("keyup", () => {
    // getting height according to the ratio checkbos status
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
    // getting width according to the ratio checkbos status
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    // if quality checkbox is checked, make imgQuality 0.7 else pass 1.0
    // 1.0 is 100% quality where 0.7 is 70% of total
    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    // setting canvas height & width based on input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // drawing user selected imgae onto the canvas
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime();
    a.click(); // clicking <a> element so the file can download

}

downloadBtn.addEventListener("click", resizeAndDownload)
fileIput.addEventListener("change", loadFile)
uploadBox.addEventListener("click", () => fileIput.click());
