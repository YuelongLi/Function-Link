# Function-Link
Cross language functional data transfer protocol

The concept is to allow one program to access a function running in another langauge. The key is to build a bridge between the two programs with a REST server, with some additional specifications for data requesting and transferring. Once properly abstracted and packaged for each of the languages, the layer of HTTP will become invisible and the exported/imported function will feel as though it lives within the program. In the future function-link will also incorporate exception handling and data compression functionalities.

## REST-Server
A simple rest server is to be launched by the exporting host.
* POST requests are the protocol by which the request is formatted and the results are sent. The requests are sent in a JSON file.

## Request JSON Format
