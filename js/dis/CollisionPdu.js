/**
 * Section 5.3.3.2. Information about a collision. COMPLETE
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.CollisionPdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
   this.protocolVersion = 6;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 4;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   this.protocolFamily = 1;

   /** Timestamp value */
   this.timestamp = 0;

   /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
   this.pduLength = 0;

   /** zero-filled array of padding */
   this.padding = 0;

   /** ID of the entity that issued the collision PDU */
   this.issuingEntityID = new dis.EntityID(); 

   /** ID of entity that has collided with the issuing entity ID */
   this.collidingEntityID = new dis.EntityID(); 

   /** ID of event */
   this.eventID = new dis.EventID(); 

   /** ID of event */
   this.collisionType = 0;

   /** some padding */
   this.pad = 0;

   /** velocity at collision */
   this.velocity = new dis.Vector3Float(); 

   /** mass of issuing entity */
   this.mass = 0;

   /** Location with respect to entity the issuing entity collided with */
   this.location = new dis.Vector3Float(); 

  this.initFromBinaryDIS = function(inputStream)
  {

       this.protocolVersion = inputStream.readUByte();
       this.exerciseID = inputStream.readUByte();
       this.pduType = inputStream.readUByte();
       this.protocolFamily = inputStream.readUByte();
       this.timestamp = inputStream.readInt();
       this.pduLength = inputStream.readUShort();
       this.padding = inputStream.readShort();
       this.issuingEntityID.initFromBinaryDIS(inputStream);
       this.collidingEntityID.initFromBinaryDIS(inputStream);
       this.eventID.initFromBinaryDIS(inputStream);
       this.collisionType = inputStream.readUByte();
       this.pad = inputStream.readByte();
       this.velocity.initFromBinaryDIS(inputStream);
       this.mass = inputStream.readFloat32();
       this.location.initFromBinaryDIS(inputStream);
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
       this.issuingEntityID.encodeToBinaryDIS(outputStream);
       this.collidingEntityID.encodeToBinaryDIS(outputStream);
       this.eventID.encodeToBinaryDIS(outputStream);
       outputStream.writeUByte(this.collisionType);
       outputStream.writeByte(this.pad);
       this.velocity.encodeToBinaryDIS(outputStream);
       outputStream.writeFloat32(this.mass);
       this.location.encodeToBinaryDIS(outputStream);
};
}; // end of class
