---
title: Depth Deep Dive
date: 2023-02-03
author: John Doe
summary: MR/AR Depth Explorations
postLayout: work
tags:
  - work
---

# Why Spelunk Into This Exploration?

The third dimension is core to spatial computing (duh), but we’re still uncovering the actual value. If we’re honest, floating panels work pretty dang good, but like most computing advances of the past, we often lean heavily on past metaphors before we find the differentiated value. Furthermore, we’re still uncovering, what multitasking spatial can bring. What value do coexistent holograms (Hololens) or volumes(Apple) bring over immersive content? Here’s three explorations where I try to find out

[Three projects together in space]

# Spatial Memories
If there’s one thing I learned during user research while working on 3D photos, it’s that most people don’t want to put a ton of efforting into creating 3, but love the end result. There are awesome ways to capture 3D content, like Apple’s LiDAR scanning, but can we bring along the content you already have?In this exploration, I look into how accurately we can uplevel 2D videos into 3D.

<video height="666" width="1280" autoplay="true" loop="true" playsinline="true" muted>
    <source src="../static/img/spatialmemory.mp4" type="video/mp4">
    <source src="../static/img/spatialmemory.webm" type="video/webm">
    <p>Your browser does not support embedded videos</p>
</video>

In the last few years, there have been huge strides in depth estimation from single 2D images. After a few days of trial and error, this is the, mostly automate-able, pipeline I landed on:

**[processing flow and shader]**

Even with how far we’ve come, there’s a quite a few visual issues with most generated depth maps. Pre-processing the images helped a bit, but evidently I landed on a more artistic approach to blurring and fading out edges and artifacts. With the advent of video gen AI, there’s some upcoming methods that promise better temporal consistency of depth maps between frames that would be great to try with this once they’re a bit further along. However, I’m happy for now since this proves the possibility of 2D to 3D video with depth estimation, and I can see it only getting better from here!

# Snowglobe Games
In spatial computing, fully immersive games that take over your view have proven PMF. What we’re still uncovering is what smaller contained games that exist in your space – the mobile version of games for AR/MR. How might we let people jump in and out at their leisure and still maintain a presence in the world around them?

<video height="666" width="1280" autoplay="true" loop="true" playsinline="true" muted>
    <source src="../static/img/snowglobe.mp4" type="video/mp4">
    <source src="../static/img/snowglobe.webm" type="video/webm">
    <p>Your browser does not support embedded videos</p>
</video>

With the snowglobe exploration I wanted to explore that – containing a more casual game, in a smaller area of your space, where you can still keep an eye on the dog or kid. There’s two key concepts that help achieve this.

The first is the ideal of a “snowglobe” space, which uses stencil buffers to give you a glimpse into an expansive world, leveraging your perspective and ability to look around, while not trying to dominate your vision. 

**[highlight on input mapping]**

The second is the unique approach to input and the character controller - using low-calorie inputs of just one hand. This requires a bit of user education, but we can effectively give enough controls all with 6DoF inputs and pinch. The mapping is such:
* Pinch engages with the game, without pinching for a few seconds and gaze the game freezes, indicating your attention is elsewhere. Like Superhot for casual games
* Movement is done by moving your hand in the four compass directions from the initial pinch
* To jump or crawl, up and down from this point. Clear signifiers are necessary to make this work
* To attack or engage, we can use double pinch
This is only a first step, and this modality would likely change with the availability of strong eye gaze target, but offers a step forward for mobile like casual games in your world

# AR Shopping (Coming Soon!)

Exploration in progress, stay tuned!