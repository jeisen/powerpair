# PowerPair
PowerPair is an implementation of a collaborative code editing environment inspired by [Cloud9](https://c9.io/) and [Nitrous.IO](https://www.nitrous.io/). It is designed for pair programming and other collaboration by developers who are unable to be in the same location as an alternative to screen or terminal sharing.

It provides a real-time collabative editor (like Google Docs) with desktop IDE functionality such as syntax highlighting. When deployed to a server, it can serve a workspace and save changes to the file system.

## Data Backend
The current data backend is [FireBase](https://www.firebase.com/) for real-time updates between collaborators.

## Frontend
PowerPair makes significant use of [FirePad](http://www.firepad.io/) for the collaborative editing functionality and [CodeMirror](http://codemirror.net/) for IDE-like functionality. The icons and CSS for the file browser come from [jQuery File Tree](http://www.abeautifulsite.net/blog/2008/03/jquery-file-tree/) but does not use its code.

## Configuration
Replace the firebase_url property in main.rb with your URL generated from [FireBase](https://www.firebase.com/).

## Caveats
This project is currently compatible only with Ruby 1.8.7. Hopefully, that will not be for long.

This project is currently very much in experimental mode. It has the ability to expose your code to unauthorized users and can save dangerous content to your server. Use at your own risk.

[FireBase](https://www.firebase.com/) is a commercial service and may charge you for use of its backend.

## History

PowerPair was initially created as part of a Hackathon for [Animoto](http://animoto.com) as a proposal for switching away from [Google Hangout](https://plus.google.com/hangouts) and [Screen](https://help.ubuntu.com/community/Screen). It has not been thoroughly tested beyond its initial demo. (However, 40% of its development was done within the PowerPair editor itself.)