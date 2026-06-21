# Real-Time Tracking & Robot Control

Lab tracking code for two moving objects and a mobile robot. The annoying part:
keeping IDs stable when blobs cross, disappear, or come back noisy.

> Lab excerpt. Hardware and study details are removed.

## How it moves
1. `capture.py` keeps the newest camera frame in a thread.
2. `detection.py` finds the two objects with LAB / HSV thresholding, cleanup,
   and contour centroids.
3. `tracker.py` runs one constant-velocity Kalman filter per object. Gates and
   occlusion handling keep missed detections from swapping IDs.
4. The controller sends robot commands through `comms/interface.py`.

## Layout
- `capture.py` - threaded frame grabber
- `detection.py` - color-segmentation blob detection
- `tracker.py` - per-object Kalman filters + occlusion logic
- `comms/interface.py` - robot hardware interface
