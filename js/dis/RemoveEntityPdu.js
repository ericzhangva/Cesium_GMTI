/**
 * Section 5.3.6.2. Remove an entity. COMPLETE
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.RemoveEntityPdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
   this.protocolVersion = 6;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 12;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   this.protocolFamily = 5;

   /** Timestamp value */
   this.timestamp = 0;

   /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
   this.pduLength = 0;

   /** zero-filled array of padding */
   this.padding = 0;

   /** Entity that is sending message */
   this.originatingEntityID = new dis.EntityID(); 

   /** Entity that is intended to receive message */
   this.receivingEntityID = new dis.EntityID(); 

   /** Identifier for the request */
   this.requestID = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.protocolVersion = inputStream.readUByte();
       this.exerciseID = inputStream.readUByte();
       this.pduType = inputStream.readUByte();
       this.protocolFamily = inputStream.readUByte();
       this.timestamp = inputStream.readInt();
       this.pduLength = inputStream.readUShort();
       this.padding = inputStream.readShort();
       this.originatingEntityID.initFromBinaryDIS(inputStream);
       this.receivingEntityID.initFromBinaryDIS(inputStream);
       this.requestID = inputStream.readInt();
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
       this.originatingEntityID.encodeToBinaryDIS(outputStream);
       this.receivingEntityID.encodeToBinaryDIS(outputStream);
       outputStream.writeUInt(this.requestID);
};
}; // end of class
