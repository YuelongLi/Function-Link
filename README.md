# Function-Link
Cross language functional data transfer protocol

The concept is to allow one program to access a function running in another langauge. The key is to build a bridge between the two programs with a REST server, with some additional specifications for data requesting and transferring. Once properly abstracted and packaged for each of the languages, the layer of HTTP will become invisible and the exported/imported function will feel as though it lives within the program. In the future function-link will also incorporate exception handling and data compression functionalities.

## Usage
### Java
Exporting a function
```java
// First parameter port, second parameter output dimension
// Third parameter function interface used
Link link = Portal.export(8080, 2,(Double[] xy)->new double[] {xy[1],xy[0]});
```
### Typescript
Importing a function
```typescript
// First parameter port, second parameter input dimension
let link = Portal.importFunc(8080, 2);
// Asynchronous access
link.get([1,-1],(val)=>{
    console.log(val);
});
```
## REST Server
A simple rest server is to be launched by the exporting host.
* POST requests are the protocol by which the request is formatted and the results are sent. The requests are sent in a JSON file.

## Request JSON Format
```typescript
{
    requestType: ["singular", "domain"];
    /**
     * If dimension is 1, at can have stand-alone
     * numbers as entries
     */
    requestDimension: number;
    /**
     * The length of this list is the dimension of the domain
     */
    range: [[start1, end1], [start2, end2],];
    /**
     * how densily sampled ar ethe data
     */
    densities: [density1, density2,];
    /**
     * if the request type is singular, the above two fields can
     * be empty and the only data needed to be supplied are the points
     * at which the value is to be found
     */
    at: [[x1, x2,], [x1, x2],];
}
```

## Response JSON Format
```typescript
{
    requestDimension: number;
    responseDimension: number;
    /**
     * at supplies the location of the data points
     */
    at: [[x1, x2,], [x1, x2],];
    /**
     * values evaluated at the target locations
     */
    values: [y1,y2,];
}
```
