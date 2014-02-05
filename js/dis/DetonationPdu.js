/**
 * Section 5.3.4.2. Information about stuff exploding. COMPLETE
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.DetonationPdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
   this.protocolVersion = 6;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 3;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   this.protocolFamily = 2;

   /** Timestamp value */
   this.timestamp = 0;

   /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
   this.pduLength = 0;

   /** zero-filled array of padding */
   this.padding = 0;

   /** ID of the entity that shot */
   this.firingEntityID = new dis.EntityID(); 

   /** ID of the entity that is being shot at */
   this.targetEntityID = new dis.EntityID(); 

   /** ID of muntion that was fired */
   this.munitionID = new dis.EntityID(); 

   /** ID firing event */
   this.eventID = new dis.EventID(); 

   /** ID firing event */
   this.velocity = new dis.Vector3Float(); 

   /** where the detonation is, in world coordinates */
   this.locationInWorldCoordinates = new dis.Vector3Double(); 

   /** Describes munition used */
   this.burstDescriptor = new dis.BurstDescriptor(); 

   /** location of the detonation or impact in the target entity's coordinate system. This information should be used for damage assessment. */
   this.locationInEntityCoordinates = new dis.Vector3Float(); 

   /** result of the explosion */
   this.detonationResult = 0;

   /** How many articulation parameters we have */
   this.numberOfArticulationParameters = 0;

   /** padding */
   this.pad = 0;

    this.articulationParameters = new Array();
 
  this.initFromBinaryDIS = function(inputStream)
  {

       this.protocolVersion = inputStream.readUByte();
       this.exerciseID = inputStream.readUByte();
       this.pduType = inputStream.readUByte();
       this.protocolFamily = inputStream.readUByte();
       this.timestamp = inputStream.readInt();
       this.pduLength = inputStream.readUShort();
       this.padding = inputStream.readShort();
       this.firingEntityID.initFromBinaryDIS(inputStream);
       this.targetEntityID.initFromBinaryDIS(inputStream);
       this.munitionID.initFromBinaryDIS(inputStream);
       this.eventID.initFromBinaryDIS(inputStream);
       this.velocity.initFromBinaryDIS(inputStream);
       this.locationInWorldCoordinates.initFromBinaryDIS(inputStream);
       this.burstDescriptor.initFromBinaryDIS(inputStream);
       this.locationInEntityCoordinates.initFromBinaryDIS(inputStream);
       this.detonationResult = inputStream.readUByte();
       this.numberOfArticulationParameters = inputStream.readUByte();
       this.pad = inputStream.readShort();
       for(var idx = 0; idx < this.numberOfArticulationParameters; idx++)
       {
           var anX = new dis.ArticulationParameter();
           anX.initFromBinaryDIS(inputStream);
           this.articulationParameters.push(anX);
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
       this.firingEntityID.encodeToBinaryDIS(outputStream);
       this.targetEntityID.encodeToBinaryDIS(outputStream);
       this.munitionID.encodeToBinaryDIS(outputStream);
       this.eventID.encodeToBinaryDIS(outputStream);
       this.velocity.encodeToBinaryDIS(outputStream);
       this.locationInWorldCoordinates.encodeToBinaryDIS(outputStream);
       this.burstDescriptor.encodeToBinaryDIS(outputStream);
       this.locationInEntityCoordinates.encodeToBinaryDIS(outputStream);
       outputStream.writeUByte(this.detonationResult);
       outputStream.writeUByte(this.numberOfArticulationParameters);
       outputStream.writeShort(this.pad);
       for(var idx = 0; idx < this.articulationParameters.length; idx++)
       {
           articulationParameters[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
