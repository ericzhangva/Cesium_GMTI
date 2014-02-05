/**
 * Section 5.3.7.5. SEES PDU, supplemental emissions entity state information. COMPLETE
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.SeesPdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
   this.protocolVersion = 6;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 30;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   this.protocolFamily = 6;

   /** Timestamp value */
   this.timestamp = 0;

   /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
   this.pduLength = 0;

   /** zero-filled array of padding */
   this.padding = 0;

   /** Originating entity ID */
   this.orginatingEntityID = new dis.EntityID(); 

   /** IR Signature representation index */
   this.infraredSignatureRepresentationIndex = 0;

   /** acoustic Signature representation index */
   this.acousticSignatureRepresentationIndex = 0;

   /** radar cross section representation index */
   this.radarCrossSectionSignatureRepresentationIndex = 0;

   /** how many propulsion systems */
   this.numberOfPropulsionSystems = 0;

   /** how many vectoring nozzle systems */
   this.numberOfVectoringNozzleSystems = 0;

   /** variable length list of propulsion system data */
    this.propulsionSystemData = new Array();
 
   /** variable length list of vectoring system data */
    this.vectoringSystemData = new Array();
 
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
       this.infraredSignatureRepresentationIndex = inputStream.readUShort();
       this.acousticSignatureRepresentationIndex = inputStream.readUShort();
       this.radarCrossSectionSignatureRepresentationIndex = inputStream.readUShort();
       this.numberOfPropulsionSystems = inputStream.readUShort();
       this.numberOfVectoringNozzleSystems = inputStream.readUShort();
       for(var idx = 0; idx < this.numberOfPropulsionSystems; idx++)
       {
           var anX = new dis.PropulsionSystemData();
           anX.initFromBinaryDIS(inputStream);
           this.propulsionSystemData.push(anX);
       }

       for(var idx = 0; idx < this.numberOfVectoringNozzleSystems; idx++)
       {
           var anX = new dis.VectoringNozzleSystemData();
           anX.initFromBinaryDIS(inputStream);
           this.vectoringSystemData.push(anX);
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
       outputStream.writeUShort(this.infraredSignatureRepresentationIndex);
       outputStream.writeUShort(this.acousticSignatureRepresentationIndex);
       outputStream.writeUShort(this.radarCrossSectionSignatureRepresentationIndex);
       outputStream.writeUShort(this.numberOfPropulsionSystems);
       outputStream.writeUShort(this.numberOfVectoringNozzleSystems);
       for(var idx = 0; idx < this.propulsionSystemData.length; idx++)
       {
           propulsionSystemData[idx].encodeToBinaryDIS(outputStream);
       }

       for(var idx = 0; idx < this.vectoringSystemData.length; idx++)
       {
           vectoringSystemData[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
