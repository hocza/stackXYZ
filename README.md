# stack.xyz

It is based on [Sails](http://sailsjs.org) framework.

### How did it work?

You can find scripts in the scripts/bash folder.  
Those scripts were responsible for collecting the domains to the mongoDB.  
Basically the nodeJS app was for serving the website. 

### Scripts

I had to adjust the [MDAC](https://github.com/hocza/mdac) almost for every domain, that's why you have multiple folders each representing a tld.

### Why nodeJS? 

This was one of my first tries with nodeJS, so thats why I picked it. In present time I would choose Laravel, since it would fit perfectly for this kind of project. :)
