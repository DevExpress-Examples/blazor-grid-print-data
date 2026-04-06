async function downloadGridFileFromStream(streamRef) {
    const url = await generateURLFromStream(streamRef);
    const iframe = createHiddenIframeInDOM();

    iframe.src = url;
    iframe.onload = () => {
        const onFocus = () => {
            document.body.removeChild(iframe);
            URL.revokeObjectURL(url);
            window.removeEventListener("focus", onFocus)
        }
        window.addEventListener("focus", onFocus)
        iframe.contentWindow.print();
    };
}

async function generateURLFromStream(streamRef) {
    const arrayBuffer = await streamRef.arrayBuffer();
    var blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
}

function createHiddenIframeInDOM() {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    return document.body.appendChild(iframe);
}