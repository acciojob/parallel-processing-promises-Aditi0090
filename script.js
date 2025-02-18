const output = document.getElementById("output");
const loading = document.createElement("div");
loading.id = "loading";
loading.innerText = "Loading...";
const errorDiv = document.createElement("div");
errorDiv.id = "error";

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image: ${url}`);
    });
}

function downloadImages() {
    output.innerHTML = "";
    output.appendChild(loading);

    const imageUrls = [
        "https://picsum.photos/id/237/200/300",
        "https://picsum.photos/id/238/200/300",
        "https://picsum.photos/id/239/200/300"
    ];

    const imagePromises = imageUrls.map(downloadImage);

    Promise.all(imagePromises)
        .then(images => {
            loading.remove();
            images.forEach(img => output.appendChild(img));
        })
        .catch(error => {
            loading.remove();
            errorDiv.innerText = error;
            output.appendChild(errorDiv);
        });
}

setTimeout(downloadImages, 100); // Ensures a small delay before execution for Cypress stability.
