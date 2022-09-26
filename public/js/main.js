console.log('JS file loaded')
const input_file = document.getElementById("imageUpload")

input_file.addEventListener("change", previewImages)

// document.getElementById('btnSpan').addEventListener('click', test)


// Implement image preview on upload
function previewImages() {
    document.getElementById('span').innerHTML = "It worked"
    console.log('I worked')
}