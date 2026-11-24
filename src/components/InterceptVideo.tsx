"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const wideScreen = "(min-width: 701px)";

function subscribeWidth(onChange: () => void) {
  const query = window.matchMedia(wideScreen);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export default function InterceptVideo({
  playing,
  onPlaybackBlocked,
}: {
  playing: boolean;
  onPlaybackBlocked: () => void;
}) {
  const filmRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayed = useRef(false);
  const resumeAt = useRef<number | null>(null);
  const wide = useSyncExternalStore(subscribeWidth, () => window.matchMedia(wideScreen).matches, () => false);
  const clip = wide ? "/flight/arcade-intercept-wide.mp4" : "/flight/arcade-intercept.mp4";

  useEffect(() => {
    const video = videoRef.current;
    const film = filmRef.current;
    if (!video || !film || (!playing && !hasPlayed.current)) return;

    let active = true;
    let reported = false;
    const reportBlocked = () => {
      if (!active || !playing || reported) return;
      reported = true;
      onPlaybackBlocked();
    };
    const handleError = () => {
      film.dataset.ready = "false";
      reportBlocked();
    };
    const revealFrame = () => {
      if (!hasPlayed.current || resumeAt.current !== null || video.seeking || video.error) return;
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) film.dataset.ready = "true";
    };
    const restoreTime = () => {
      if (resumeAt.current !== null) {
        const target = Math.min(resumeAt.current, video.duration);
        if (Math.abs(video.currentTime - target) > 0.03) {
          video.currentTime = target;
          return;
        }
        if (!video.seeking) resumeAt.current = null;
      }
      revealFrame();
    };
    const handleSeeked = () => {
      resumeAt.current = null;
      revealFrame();
    };
    video.addEventListener("error", handleError);
    video.addEventListener("loadedmetadata", restoreTime);
    video.addEventListener("loadeddata", revealFrame);
    video.addEventListener("seeked", handleSeeked);

    const replacingSource = video.getAttribute("src") !== clip;
    if (replacingSource || (playing && video.error)) {
      film.dataset.ready = "false";
      // Keep the original checkpoint through successive rotations before the new clip has decoded.
      resumeAt.current ??= video.currentTime || null;
      video.preload = "auto";
      if (replacingSource) video.src = clip;
      else video.load();
    } else if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      restoreTime();
    }
    if (playing) {
      video.muted = true;
      video.play().then(() => {
        if (!active) return;
        hasPlayed.current = true;
        revealFrame();
      }, reportBlocked);
    }

    return () => {
      active = false;
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadedmetadata", restoreTime);
      video.removeEventListener("loadeddata", revealFrame);
      video.removeEventListener("seeked", handleSeeked);
      video.pause();
    };
  }, [clip, playing, onPlaybackBlocked]);

  return (
    <div ref={filmRef} className="flight-film" aria-hidden="true" data-ready="false">
      <video ref={videoRef} className="flight-video" muted playsInline loop preload="none" />
    </div>
  );
}
