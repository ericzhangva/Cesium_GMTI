/**
 * Section 5.3.10.2 Query a minefield for information about individual mines. Requires manual clean up to get the padding right. UNFINISHED
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.MinefieldQueryPdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
   this.protocolVersion = 6;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 38;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   this.protocolFamily = 8;

   /** Timestamp value */
   this.timestamp = 0;

   /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
   this.pduLength = 0;

   /** zero-filled array of padding */
   this.padding = 0;

   /** Minefield ID */
   this.minefieldID = new dis.EntityID(); 

   /** EID of entity making the request */
   this.requestingEntityID = new dis.EntityID(); 

   /** request ID */
   this.requestID = 0;

   /** Number of perimeter points for the minefield */
   this.numberOfPerimeterPoints = 0;

   /** Padding */
   this.pad2 = 0;

   /** Number of sensor types */
   this.numberOfSensorTypes = 0;

   /** data filter, 32 boolean fields */
   this.dataFilter = 0;

   /** Entity type of mine being requested */
   this.requestedMineType = new dis.EntityType(); 

   /** perimeter points of request */
    this.requestedPerimeterPoints = new Array();
 
   /** Sensor types, each 16 bits long */
    this.sensorTypes = new Array();
 
  this.initFromBinaryDIS = function(inputStream)
  {

       this.protocolVersion = inputStream.readUByte();
       this.exerciseID = inputStream.readUByte();
       this.pduType = inputStream.readUByte();
       this.protocolFamily = inputStream.readUByte();
       this.timestamp = inputStream.readInt();
       this.pduLength = inputStream.readUShort();
       this.padding = inputStream.readShort();
       this.minefieldID.initFromBinaryDIS(inputStream);
       this.requestingEntityID.initFromBinaryDIS(inputStream);
       this.requestID = inputStream.readUByte();
       this.numberOfPerimeterPoints = inputStream.readUByte();
       this.pad2 = inputStream.readUByte();
       this.numberOfSensorTypes = inputStream.readUByte();
       this.dataFilter = inputStream.readInt();
       this.requestedMineType.initFromBinaryDIS(inputStream);
       for(var idx = 0; idx < this.numberOfPerimeterPoints; idx++)
       {
           var anX = new dis.Point();
           anX.initFromBinaryDIS(inputStream);
           this.requestedPerimeterPoints.push(anX);
       }

       for(var idx = 0; idx < this.numberOfSensorTypes; idx++)
       {
           var anX = new dis.TwoByteChunk();
           anX.initFromBinaryDIS(inputStream);
           this.sensorTypes.push(anX);
       }

  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUByte(this.protocolVersion);
       outputStream.writeUByte(this.exerciseID);
       outputStream.writeUByte(this.pduType);
       outputStream.writeUByte(this.protocolFamily);
       outputStream.writeUInt(this.timestamp);
       outputStream.writeUShort(this.pduLength);
       outputStream.writeShort(this.padding);
       this.minefieldID.encodeToBinaryDIS(outputStream);
       this.requestingEntityID.encodeToBinaryDIS(outputStream);
       outputStream.writeUByte(this.requestID);
       outputStream.writeUByte(this.numberOfPerimeterPoints);
       outputStream.writeUByte(this.pad2);
       outputStream.writeUByte(this.numberOfSensorTypes);
       outputStream.writeUInt(this.dataFilter);
       this.requestedMineType.encodeToBinaryDIS(outputStream);
       for(var idx = 0; idx < this.requestedPerimeterPoints.length; idx++)
       {
           requestedPerimeterPoints[idx].encodeToBinaryDIS(outputStream);
       }

       for(var idx = 0; idx < this.sensorTypes.length; idx++)
       {
           sensorTypes[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
