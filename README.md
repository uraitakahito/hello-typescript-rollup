```console
% rollup --config
% docker run -d --init --rm -p 8080:80 --mount type=bind,src=`pwd`/dist,dst=/usr/share/nginx/html --name nginx-container nginx
```

Go to http://localhost:8080/ and you should see the app running. When you change assets during development, it is recommended to perform a hard refresh [(⌘ + ⇧ + r)](https://support.google.com/chrome/answer/157179) instead of a regular browser reload.
