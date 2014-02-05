/**
 * 5.3.3.3. Information about elastic collisions in a DIS exercise shall be communicated using a Collision-Elastic PDU. COMPLETE
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.CollisionElasticPdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
   this.protocolVersion = 6;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 66;

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
   this.collisionEventID = new dis.EventID(); 

   /** some padding */
   this.pad = 0;

   /** velocity at collision */
   this.contactVelocity = new dis.Vector3Float(); 

   /** mass of issuing entity */
   this.mass = 0;

   /** Location with respect to entity the issuing entity collided with */
   this.location = new dis.Vector3Float(); 

   /** tensor values */
   this.collisionResultXX = 0;

   /** tensor values */
   this.collisionResultXY = 0;

   /** tensor values */
   this.collisionResultXZ = 0;

   /** tensor values */
   this.collisionResultYY = 0;

   /** tensor values */
   this.collisionResultYZ = 0;

   /** tensor values */
   this.collisionResultZZ = 0;

   /** This record shall represent the normal vector to the surface at the point of collision detection. The surface normal shall be represented in world coordinates. */
   this.unitSurfaceNormal = new dis.Vector3Float(); 

   /** This field shall represent the degree to which energy is conserved in a collision */
   this.coefficientOfRestitution = 0;

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
       this.collisionEventID.initFromBinaryDIS(inputStream);
       this.pad = inputStream.readShort();
       this.contactVelocity.initFromBinaryDIS(inputStream);
       this.mass = inputStream.readFloat32();
       this.location.initFromBinaryDIS(inputStream);
       this.collisionResultXX = inputStream.readFloat32();
       this.collisionResultXY = inputStream.readFloat32();
       this.collisionResultXZ = inputStream.readFloat32();
       this.collisionResultYY = inputStream.readFloat32();
       this.collisionResultYZ = inputStream.readFloat32();
       this.collisionResultZZ = inputStream.readFloat32();
       this.unitSurfaceNormal.initFromBinaryDIS(inputStream);
       this.coefficientOfRestitution = inputStream.readFloat32();
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
       this.collisionEventID.encodeToBinaryDIS(outputStream);
       outputStream.writeShort(this.pad);
       this.contactVelocity.encodeToBinaryDIS(outputStream);
       outputStream.writeFloat32(this.mass);
       this.location.encodeToBinaryDIS(outputStream);
       outputStream.writeFloat32(this.collisionResultXX);
       outputStream.writeFloat32(this.collisionResultXY);
       outputStream.writeFloat32(this.collisionResultXZ);
       outputStream.writeFloat32(this.collisionResultYY);
       outputStream.writeFloat32(this.collisionResultYZ);
       outputStream.writeFloat32(this.collisionResultZZ);
       this.unitSurfaceNormal.encodeToBinaryDIS(outputStream);
       outputStream.writeFloat32(this.coefficientOfRestitution);
};
}; // end of class
