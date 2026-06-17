# Real-Time Tracking & Robot Control

A computer-vision system that detects and tracks two moving objects on live
video and steers a mobile robot in closed loop. Built for a research lab.

> Anonymized excerpts. Lab-, hardware-, and study-specific details have been
> removed; the techniques are unchanged.

## Flow
1. `capture.py` reads frames in a thread with latest-frame semantics, so a slow
   processing iteration never causes us to track a stale frame.
2. `detection.py` segments two objects by color (LAB / HSV thresholding +
   morphology), returning contour centroids. (A companion DeepLabCut model can
   provide keypoint-based detections too - see the pose-estimation project.)
3. `tracker.py` runs one constant-velocity Kalman filter per object, with gated
   association and occlusion handling, so identity survives missed detections.
4. The controller steers the robot over `comms/interface.py` from the live track.

## Layout
- `capture.py` - threaded frame grabber
- `detection.py` - color-segmentation blob detection
- `tracker.py` - per-object Kalman filters + occlusion logic
- `comms/interface.py` - robot hardware interface
