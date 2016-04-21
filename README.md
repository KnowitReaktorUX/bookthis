# Bookthis / Application / React Native

Mobile application for checking in/out devices in Knowit Reaktor Stockholm's
Device Lab. The app is built with React Native, and uses MongoDB for data
storage.

## 1 ) Concept
<em>A great application is often focused; which in the context means that it's
capable of solving a few well defined tasks really well. It's should also be
pleasant to use and interact with.</em>

In the case of the Bookthis application, we sought to make the devices from
our company's Device Lab more available to our colleagues by creating a simple
check-in/check-out system. In the past, we've used a more analogous system which
in many cases has led to a number of problems:

<ul>
  <li>
    The process of lending a device has been very informal and vague.
  </li>
  <li>
    Sometimes, when booking the lab, devices has been missing and there's been
    no easy way to find who's checked out the device.
  </li>
  <li>
    We've used a wiki to list our devices and the device specifications.
    However, this wiki has gone mostly un-noticed.
  </li>
</ul>

These are the core problems that the Bookthis application targets. Each device
in the lab will have the application installed. A User will be able to
check-in/check-out the device by use of the application. The application will
also have a device list where the user can find information about different
devices, if they are checked-in or checked-out. If a device is checked-out, it
will also list who's checked-out the device so it can be easily found.
