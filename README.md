# Mca-NGSI Adaptor
Interworking proxy for the Mobius and Orion Broker. Mobius is an open source IoT server platform based on the oneM2M standard.

## Version
v1.0.0

## Introduction
This 

## System Stucture
Working flow of the Mca-NGSI Adapot is as follows: 
1. Retrieve parking lot information on the Moibus and send create request to Orion Broker
2. Retrieve parking lot information on the Moibus and send create request to Orion Broker
3. Make subscription resource on the Mobius
4. Whenever the pakring lot or parking spot updated, it sends notification to the Mca-NGSI Adaptor with the updated information
5. The adaptor modifies the data format to fit OLrion Broker and sends create request to the Orion Broker

## Installation
Since the Adaptor is developed based on the Node.js, it needs to be installed
To build full environment, Mobius and Orion-broker are also need to be installed

## Configuration
Set the Mobius IP and port in the conf.js and MobiusConnector.js. Orion-Broker IP and port are in the MobiusConnector.js.

## Run
Use node.js application execution command as below

node app.js

## Author
Chekka Ramnath Teja (ch.ramnathteja@keti.re.kr)
