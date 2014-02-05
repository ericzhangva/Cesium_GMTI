/**
 * Section 5.3.11.5: Information about the addition/modification of an oobject that is geometrically      achored to the terrain with a set of three or more points that come to a closure. COMPLETE
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.ArealObjectStatePdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
   this.protocolVersion = 6;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 45;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   this.protocolFamily = 9;

   /** Timestamp value */
   this.timestamp = 0;

   /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
   this.pduLength = 0;

   /** zero-filled array of padding */
   this.padding = 0;

   /** Object in synthetic environment */
   this.objectID = new dis.EntityID(); 

   /** Object with which this point object is associated */
   this.referencedObjectID = new dis.EntityID(); 

   /** unique update number of each state transition of an object */
   this.updateNumber = 0;

   /** force ID */
   this.forceID = 0;

   /** modifications enumeration */
   this.modifications = 0;

   /** Object type */
   this.objectType = new dis.EntityType(); 

   /** Object appearance */
   this.objectAppearance = new dis.SixByteChunk(); 

   /** Number of points */
   this.numberOfPoints = 0;

   /** requesterID */
   this.requesterID = new dis.SimulationAddress(); 

   /** receiver ID */
   this.receivingID = new dis.SimulationAddress(); 

   /** location of object */
    this.objectLocation = new Array();
 
  this.initFromBinaryDIS = function(inputStream)
  {

       this.protocolVersion = inputStream.readUByte();
       this.exerciseID = inputStream.readUByte();
       this.pduType = inputStream.readUByte();
       this.protocolFamily = inputStream.readUByte();
       this.timestamp = inputStream.readInt();
       this.pduLength = inputStream.readUShort();
       this.padding = inputStream.readShort();
       this.objectID.initFromBinaryDIS(inputStream);
       this.referencedObjectID.initFromBinaryDIS(inputStream);
       this.updateNumber = inputStream.readUShort();
       this.forceID = inputStream.readUByte();
       this.modifications = inputStream.readUByte();
       this.objectType.initFromBinaryDIS(inputStream);
       this.objectAppearance.initFromBinaryDIS(inputStream);
       this.numberOfPoints = inputStream.readUShort();
       this.requesterID.initFromBinaryDIS(inputStream);
       this.receivingID.initFromBinaryDIS(inputStream);
       for(var idx = 0; idx < this.numberOfPoints; idx++)
       {
           var anX = new dis.Vector3Double();
           anX.initFromBinaryDIS(inputStream);
           this.objectLocation.push(anX);
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
       this.objectID.encodeToBinaryDIS(outputStream);
       this.referencedObjectID.encodeToBinaryDIS(outputStream);
       outputStream.writeUShort(this.updateNumber);
       outputStream.writeUByte(this.forceID);
       outputStream.writeUByte(this.modifications);
       this.objectType.encodeToBinaryDIS(outputStream);
       this.objectAppearance.encodeToBinaryDIS(outputStream);
       outputStream.writeUShort(this.numberOfPoints);
       this.requesterID.encodeToBinaryDIS(outputStream);
       this.receivingID.encodeToBinaryDIS(outputStream);
       for(var idx = 0; idx < this.objectLocation.length; idx++)
       {
           objectLocation[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
