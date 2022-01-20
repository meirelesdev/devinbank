
document.addEventListener("DOMContentLoaded", function(event) {
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    document.head.removeChild(link);
    link = document.querySelector("link[rel*='icon']") || document.createElement('link');
});