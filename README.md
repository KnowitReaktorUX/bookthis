# Bookthis Application

Bookthis is a mobile application with the purpose of checking in or out devices
from the Knowit Reaktor Stockholm’s device laboratory. The application is built
with React Native technology. It communicates with an REST API build on NodeJS
and uses MongoDB for data storage.

## 1 ) Concept
_A great mobile application is often focused. This means that it is great at
solving a few well defined tasks really well. These tasks should be solutions
for problems that the application’s target group experience in one way or
another. Furthermore, users expect better experience when using a native
application than a web-based application. Thus, the application has to be
visually great looking and be pleasant to interact with._

With the Bookthis application, we sought to make the devices from Knowit’s
device laboratory more available to our colleagues by creating a simple
check-in/check-out application that could also track who’s currently using a
specific device. In the past, the process for completing these tasks has been
more analogous, which in turn has led to a number of problems:

- The process has been very informal and vague.

- Sometimes a project has booked the device lab for device testing just to find
  some devices missing. At this point there’s been no easy way to find out who’s
  currently using the missing devices.

- We’ve used a wiki to list out devices and their specifications. However, this
  wiki has gone mostly un-noticed.

These three problems are the core problems that the Bookthis application
targets. Each device in the laboratory will have the application installed. Any
user using the device can access the application to check-in/check-out the
device. From the application, the user can also find information about our
devices and who’s currently using a specific device.
