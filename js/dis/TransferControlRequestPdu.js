/**
 * Section 5.3.9.3 Information initiating the dyanic allocation and control of simulation entities         between two simulation applications. Requires manual cleanup. The padding between record sets is variable. UNFINISHED
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.TransferControlRequestPdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
   this.protocolVersion = 6;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 35;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   this.protocolFamily = 7;

   /** Timestamp value */
   this.timestamp = 0;

   /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
   this.pduLength = 0;

   /** zero-filled array of padding */
   this.padding = 0;

   /** ID of entity originating request */
   this.orginatingEntityID = new dis.EntityID(); 

   /** ID of entity receiving request */
   this.recevingEntityID = new dis.EntityID(); 

   /** ID ofrequest */
   this.requestID = 0;

   /** required level of reliabliity service. */
   this.requiredReliabilityService = 0;

   /** type of transfer desired */
   this.tranferType = 0;

   /** The entity for which control is being requested to transfer */
   this.transferEntityID = new dis.EntityID(); 

   /** number of record sets to transfer */
   this.numberOfRecordSets = 0;

   /** ^^^This is wrong--the RecordSet class needs more work */
    this.recordSets = new Array();
 
  this.initFromBinaryDIS = function(inputStream)
  {

       this.protocolVersion = inputStream.readUByte();
       this.exerciseID = inputStream.readUByte();
       this.pduType = inputStream.readUByte();
       this.protocolFamily = inputStream.readUByte();
       this.timestamp = inputStream.readInt();
       this.pduLength = inputStream.readUShort();
       this.padding = inputStream.readShort();
       this.orginatingEntityID.initFromBinaryDIS(inputStream);
       this.recevingEntityID.initFromBinaryDIS(inputStream);
       this.requestID = inputStream.readInt();
       this.requiredReliabilityService = inputStream.readUByte();
       this.tranferType = inputStream.readUByte();
       this.transferEntityID.initFromBinaryDIS(inputStream);
       this.numberOfRecordSets = inputStream.readUByte();
       for(var idx = 0; idx < this.numberOfRecordSets; idx++)
       {
           var anX = new dis.RecordSet();
           anX.initFromBinaryDIS(inputStream);
           this.recordSets.push(anX);
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
       this.orginatingEntityID.encodeToBinaryDIS(outputStream);
       this.recevingEntityID.encodeToBinaryDIS(outputStream);
       outputStream.writeUInt(this.requestID);
       outputStream.writeUByte(this.requiredReliabilityService);
       outputStream.writeUByte(this.tranferType);
       this.transferEntityID.encodeToBinaryDIS(outputStream);
       outputStream.writeUByte(this.numberOfRecordSets);
       for(var idx = 0; idx < this.recordSets.length; idx++)
       {
           recordSets[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
