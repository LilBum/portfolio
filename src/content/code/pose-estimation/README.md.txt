# Pose Estimation with DeepLabCut

DeepLabCut model trained on lab video. Six body points in, tracker-friendly
centroids out.

> Lab excerpt. Paths, scorer names, and study-specific fields are removed.

## How it moves
1. Sample varied frames with k-means and hand-label a 6-keypoint skeleton.
2. Train a ResNet-50 pose network with the PyTorch backend.
3. Run `analyze_videos` and export per-frame keypoints plus likelihoods.
4. Turn confident points into one body centroid for the tracker.

## Layout
- `config.yaml` - DeepLabCut project config (keypoints, skeleton, training)
- `pose.py` - training + inference pipeline and the keypoint -> centroid step
