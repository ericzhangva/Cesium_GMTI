/**
 * Section 5.3.8.1. Detailed information about a radio transmitter. This PDU requires manually         written code to complete, since the modulation parameters are of variable length. UNFINISHED
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.TransmitterPdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
   this.protocolVersion = 6;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 25;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   this.protocolFamily = 4;

   /** Timestamp value */
   this.timestamp = 0;

   /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
   this.pduLength = 0;

   /** zero-filled array of padding */
   this.padding = 0;

   /** ID of the entitythat is the source of the communication */
   this.entityId = new dis.EntityID(); 

   /** particular radio within an entity */
   this.radioId = 0;

   /** linear accelleration of entity */
   this.radioEntityType = new dis.RadioEntityType(); 

   /** transmit state */
   this.transmitState = 0;

   /** input source */
   this.inputSource = 0;

   /** padding */
   this.padding1 = 0;

   /** Location of antenna */
   this.antennaLocation = new dis.Vector3Double(); 

   /** relative location of antenna */
   this.relativeAntennaLocation = new dis.Vector3Float(); 

   /** antenna pattern type */
   this.antennaPatternType = 0;

   /** atenna pattern length */
   this.antennaPatternCount = 0;

   /** frequency */
   this.frequency = 0;

   /** transmit frequency Bandwidth */
   this.transmitFrequencyBandwidth = 0;

   /** transmission power */
   this.power = 0;

   /** modulation */
   this.modulationType = new dis.ModulationType(); 

   /** crypto system enumeration */
   this.cryptoSystem = 0;

   /** crypto system key identifer */
   this.cryptoKeyId = 0;

   /** how many modulation parameters we have */
   this.modulationParameterCount = 0;

   /** padding2 */
   this.padding2 = 0;

   /** padding3 */
   this.padding3 = 0;

   /** variable length list of modulation parameters */
    this.modulationParametersList = new Array();
 
   /** variable length list of antenna pattern records */
    this.antennaPatternList = new Array();
 
  this.initFromBinaryDIS = function(inputStream)
  {

       this.protocolVersion = inputStream.readUByte();
       this.exerciseID = inputStream.readUByte();
       this.pduType = inputStream.readUByte();
       this.protocolFamily = inputStream.readUByte();
       this.timestamp = inputStream.readInt();
       this.pduLength = inputStream.readUShort();
       this.padding = inputStream.readShort();
       this.entityId.initFromBinaryDIS(inputStream);
       this.radioId = inputStream.readUShort();
       this.radioEntityType.initFromBinaryDIS(inputStream);
       this.transmitState = inputStream.readUByte();
       this.inputSource = inputStream.readUByte();
       this.padding1 = inputStream.readUShort();
       this.antennaLocation.initFromBinaryDIS(inputStream);
       this.relativeAntennaLocation.initFromBinaryDIS(inputStream);
       this.antennaPatternType = inputStream.readUShort();
       this.antennaPatternCount = inputStream.readUShort();
       this.frequency = inputStream.readLong();
       this.transmitFrequencyBandwidth = inputStream.readFloat32();
       this.power = inputStream.readFloat32();
       this.modulationType.initFromBinaryDIS(inputStream);
       this.cryptoSystem = inputStream.readUShort();
       this.cryptoKeyId = inputStream.readUShort();
       this.modulationParameterCount = inputStream.readUByte();
       this.padding2 = inputStream.readUShort();
       this.padding3 = inputStream.readUByte();
       for(var idx = 0; idx < this.modulationParameterCount; idx++)
       {
           var anX = new dis.Vector3Float();
           anX.initFromBinaryDIS(inputStream);
           this.modulationParametersList.push(anX);
       }

       for(var idx = 0; idx < this.antennaPatternCount; idx++)
       {
           var anX = new dis.Vector3Float();
           anX.initFromBinaryDIS(inputStream);
           this.antennaPatternList.push(anX);
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
       this.entityId.encodeToBinaryDIS(outputStream);
       outputStream.writeUShort(this.radioId);
       this.radioEntityType.encodeToBinaryDIS(outputStream);
       outputStream.writeUByte(this.transmitState);
       outputStream.writeUByte(this.inputSource);
       outputStream.writeUShort(this.padding1);
       this.antennaLocation.encodeToBinaryDIS(outputStream);
       this.relativeAntennaLocation.encodeToBinaryDIS(outputStream);
       outputStream.writeUShort(this.antennaPatternType);
       outputStream.writeUShort(this.antennaPatternCount);
       outputStream.writeLong(this.frequency);
       outputStream.writeFloat32(this.transmitFrequencyBandwidth);
       outputStream.writeFloat32(this.power);
       this.modulationType.encodeToBinaryDIS(outputStream);
       outputStream.writeUShort(this.cryptoSystem);
       outputStream.writeUShort(this.cryptoKeyId);
       outputStream.writeUByte(this.modulationParameterCount);
       outputStream.writeUShort(this.padding2);
       outputStream.writeUByte(this.padding3);
       for(var idx = 0; idx < this.modulationParametersList.length; idx++)
       {
           modulationParametersList[idx].encodeToBinaryDIS(outputStream);
       }

       for(var idx = 0; idx < this.antennaPatternList.length; idx++)
       {
           antennaPatternList[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
