onmessage = ({ }) => {
    console.log('video player worker');
    postMessage({ data: 'OK' })
}