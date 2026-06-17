# Pose Estimation with DeepLabCut

A DeepLabCut pose-estimation model (ResNet-50, PyTorch backend) trained to track
a subject's body keypoints frame-by-frame, then run over session video. Its
output feeds the real-time tracker (a separate project).

> Anonymized excerpts. Project paths, scorer, and study-specific fields removed;
> the configuration and pipeline are otherwise unchanged.

## Flow
1. Sample diverse frames (k-means over the video) and hand-label a 6-keypoint skeleton.
2. Train a ResNet-50 pose network (config.yaml: engine=pytorch, net_type=resnet_50).
3. Run analyze_videos to get per-frame keypoints + likelihoods (CSV).
4. Reduce each frame to a confidence-weighted body centroid for the tracker.

## Layout
- `config.yaml` - DeepLabCut project config (keypoints, skeleton, training)
- `pose.py` - training + inference pipeline and the keypoint -> centroid step
