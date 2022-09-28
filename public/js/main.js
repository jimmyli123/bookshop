console.log('JS file loaded')
const input_file = document.getElementById("imageUpload")
const select = document.getElementById("select_type")
const priceField = document.getElementById("price_field")

input_file.addEventListener("change", previewImages)
select.addEventListener("change", checkToDisable)
// document.getElementById('btnSpan').addEventListener('click', test)


// Implement image preview on upload
function previewImages() {
    document.getElementById('span').innerHTML = "It worked"
    console.log('I worked')
}

function checkToDisable() {
    if (select.value ==="giving") {
        priceField.setAttribute("disabled", "disabled")
        priceField.setAttribute("value", '0')
    }
}