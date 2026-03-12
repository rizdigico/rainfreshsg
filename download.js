import fs from 'fs/promises';
async function download() {
    console.log("Downloading...");
    const res = await fetch("https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_1MB.mp4");
    const buffer = await res.arrayBuffer();
    await fs.writeFile("public/sensory-light.mp4", Buffer.from(buffer));
    console.log("Saved.");
}
download();
