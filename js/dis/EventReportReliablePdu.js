/**
 * Section 5.3.12.11: reports the occurance of a significatnt event to the simulation manager. Needs manual     intervention to fix padding in variable datums. UNFINISHED.
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.EventReportReliablePdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
   this.protocolVersion = 6;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 61;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   this.protocolFamily = 10;

   /** Timestamp value */
   this.timestamp = 0;

   /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
   this.pduLength = 0;

   /** zero-filled array of padding */
   this.padding = 0;

   /** Object originatig the request */
   this.originatingEntityID = new dis.EntityID(); 

   /** Object with which this point object is associated */
   this.receivingEntityID = new dis.EntityID(); 

   /** Event type */
   this.eventType = 0;

   /** padding */
   this.pad1 = 0;

   /** Fixed datum record count */
   this.numberOfFixedDatumRecords = 0;

   /** variable datum record count */
   this.numberOfVariableDatumRecords = 0;

   /** Fixed datum records */
    this.fixedDatumRecords = new Array();
 
   /** Variable datum records */
    this.variableDatumRecords = new Array();
 
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
       this.eventType = inputStream.readUShort();
       this.pad1 = inputStream.readInt();
       this.numberOfFixedDatumRecords = inputStream.readInt();
       this.numberOfVariableDatumRecords = inputStream.readInt();
       for(var idx = 0; idx < this.numberOfFixedDatumRecords; idx++)
       {
           var anX = new dis.FixedDatum();
           anX.initFromBinaryDIS(inputStream);
           this.fixedDatumRecords.push(anX);
       }

       for(var idx = 0; idx < this.numberOfVariableDatumRecords; idx++)
       {
           var anX = new dis.VariableDatum();
           anX.initFromBinaryDIS(inputStream);
           this.variableDatumRecords.push(anX);
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
       this.originatingEntityID.encodeToBinaryDIS(outputStream);
       this.receivingEntityID.encodeToBinaryDIS(outputStream);
       outputStream.writeUShort(this.eventType);
       outputStream.writeUInt(this.pad1);
       outputStream.writeUInt(this.numberOfFixedDatumRecords);
       outputStream.writeUInt(this.numberOfVariableDatumRecords);
       for(var idx = 0; idx < this.fixedDatumRecords.length; idx++)
       {
           fixedDatumRecords[idx].encodeToBinaryDIS(outputStream);
       }

       for(var idx = 0; idx < this.variableDatumRecords.length; idx++)
       {
           variableDatumRecords[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
