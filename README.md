# Program ID:999 module for EMETH node

## Build
```
$ docker build -t emeth-module-0999:latest
```

## Run
```
$ docker run -v <input directory>:/input -v <output directory>:/output emeth-module-0999:latest <jobId> /input /output
```
