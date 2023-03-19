---
title: 3D Photos
date: 2023-02-03
author: John Doe
summary: Adding depth to Facebook's News Feed
postLayout: work 
tags:
  - work
---

<a class="topLink" href="https://www.facebook.com/jakeblakeley/posts/pfbid0W7AguPEDsJaD4WzDRUnSvUqKaZYTL8791dMPP5aDnaazejfPDQv7jXQi1WC849X2l">
    <button class="secondary">See It Live</button>
</a><br>

# Inception

In 2018 I joined a team of super talented research scientists and engineers known for its [world-class white papers at SIGGRAPH](https://arxiv.org/abs/2008.12298). My role was to turn these white papers into products. 

<iframe width="900" height="560" src="https://www.youtube.com/embed/eVJE3S-4LOI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

One particular workstream focused on depth in media with one project focusing on traditional photogrammetry reconstruction using phones. We found out pretty quickly through user research that full photogrammetry was too much of a time commitment to capture and process for most people to find valuable. Even if they did find this extra fidelity of their memories valuable.

![Graphic of the process; white papers → (going around) product → Siggraph](https://source.unsplash.com/random/600x400)

However, we had a timely opportunity. iPhones were just released with “portrait mode” which included a new depth photo format. This is how 3D photos were born. It hit the sweet spot of low user effort with a high reward; bringing their memories to life through a single click capture.

# Design
Turning depth data into a 3D photo wasn’t a one-and-done process. As a team of tech artists, engineers, researchers, and designers, we were able to figure out how to create a performant 3D mesh, in-paint the background to be the most visually appealing, and most difficult of all, define the interactions for consuming the 3D content on each of Meta’s platforms. 

<div class="fb-post" data-href="https://www.facebook.com/jakeblakeley/posts/pfbid0W7AguPEDsJaD4WzDRUnSvUqKaZYTL8791dMPP5aDnaazejfPDQv7jXQi1WC849X2l" data-width="560" data-show-text="true"><blockquote cite="https://www.facebook.com/jakeblakeley/posts/10161219122685151" class="fb-xfbml-parse-ignore"><p>Today we launched 3D photos on Facebook! You can instantly create one from a portrait photo on iOS. So heads up you’ll be seeing a lot more of 3D Archie.</p>Posted by <a href="https://www.facebook.com/jakeblakeley">Jake Blakeley</a> on&nbsp;<a href="https://www.facebook.com/jakeblakeley/posts/10161219122685151">Thursday, October 11, 2018</a></blockquote></div>

As a designer, I was particularly interested in creating something with high visual quality for the broadest types of content, educating users about how to interact with 3D photos, and how users would discover how to create them

![Depth map + photo = 3D geometry](https://source.unsplash.com/random/600x400)

This was a particularly interesting project as we had to collaborate on solutions across Meta’s portfolio of apps. We had to define interactions for consuming 3D photos on a scrolling feed and Storys. As well as collaborate with IG and FB on the best ways to add creation ingress points in their composers. 

![IG Storys + News Feed + composer](https://source.unsplash.com/random/600x400)

# Growth
Our first win was getting a  “make 3D” button inside Facebook’s very coveted composer for iOS users. This allowed us to get enough depth photos, and training data, to eventually launch to all devices and hallucinate depth on any photo. However, like many incubation teams, our work was handed off to growth teams once the product showed success. It later landed on VR in the browser home and as an ad format to add motion to static photos.
