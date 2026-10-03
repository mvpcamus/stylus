(() => {
  const css = `
    .hive-subtitle-renderer-line {
      font-family: "NanumSquare Neo OTF ExtraBold" !important;
      font-size: clamp(20px, 6vmin, 85px) !important;
      text-shadow: 1px 1px 0px #505050, -1px -1px 0px #505050, 1px -1px 0px #505050, -1px 1px 0px #505050, 0px 0px 8px #000 !important;
      opacity: 0.95 !important;
      background: transparent !important;
    }
  `;

  function inject(root) {
    if (!root || root.querySelector("#superStyles-shadow-css")) return;

    const style = document.createElement("style");
    style.id = "superStyles-shadow-css";
    style.textContent = css;
    root.appendChild(style);
  }

  function scan() {
    document.querySelectorAll("*").forEach(el => {
      if (el.shadowRoot) {
        inject(el.shadowRoot);
      }
    });
  }

  function fixVideo() {
    const videos = [...document.querySelectorAll("video")];

    const video = videos.find(v =>
      v.videoWidth > 0 &&
      v.videoHeight > 0 &&
      v.clientWidth > 0 &&
      v.clientHeight > 0
    );

    if (!video) return;

    video.style.setProperty("object-fit", "cover", "important");
    video.style.setProperty("width", "100%", "important");
    video.style.setProperty("height", "100%", "important");
  }

  scan();
  fixVideo();

  const observer = new MutationObserver(() => {
    scan();
    fixVideo();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();