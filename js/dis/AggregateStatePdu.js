/**
 * Section 5.3.9.1 informationa bout aggregating entities anc communicating information about the aggregated entities.        requires manual intervention to fix the padding between entityID lists and silent aggregate sysem lists--this padding        is dependent on how many entityIDs there are, and needs to be on a 32 bit word boundary. UNFINISHED
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.AggregateStatePdu = function()
{
   /** The version of the protocol. 5=DIS-1995, 6=DIS-1998. */
   this.protocolVersion = 6;

   /** Exercise ID */
   this.exerciseID = 0;

   /** Type of pdu, unique for each PDU class */
   this.pduType = 33;

   /** value that refers to the protocol family, eg SimulationManagement, et */
   this.protocolFamily = 7;

   /** Timestamp value */
   this.timestamp = 0;

   /** Length, in bytes, of the PDU. Changed name from length to avoid use of Hibernate QL reserved word */
   this.pduLength = 0;

   /** zero-filled array of padding */
   this.padding = 0;

   /** ID of aggregated entities */
   this.aggregateID = new dis.EntityID(); 

   /** force ID */
   this.forceID = 0;

   /** state of aggregate */
   this.aggregateState = 0;

   /** entity type of the aggregated entities */
   this.aggregateType = new dis.EntityType(); 

   /** formation of aggregated entities */
   this.formation = 0;

   /** marking for aggregate; first char is charset type, rest is char data */
   this.aggregateMarking = new dis.AggregateMarking(); 

   /** dimensions of bounding box for the aggregated entities, origin at the center of mass */
   this.dimensions = new dis.Vector3Float(); 

   /** orientation of the bounding box */
   this.orientation = new dis.Orientation(); 

   /** center of mass of the aggregation */
   this.centerOfMass = new dis.Vector3Double(); 

   /** velocity of aggregation */
   this.velocity = new dis.Vector3Float(); 

   /** number of aggregates */
   this.numberOfDisAggregates = 0;

   /** number of entities */
   this.numberOfDisEntities = 0;

   /** number of silent aggregate types */
   this.numberOfSilentAggregateTypes = 0;

   /** number of silent entity types */
   this.numberOfSilentEntityTypes = 0;

   /** aggregates  list */
    this.aggregateIDList = new Array();
 
   /** entity ID list */
    this.entityIDList = new Array();
 
   /** ^^^padding to put the start of the next list on a 32 bit boundary. This needs to be fixed */
   this.pad2 = 0;

   /** silent entity types */
    this.silentAggregateSystemList = new Array();
 
   /** silent entity types */
    this.silentEntitySystemList = new Array();
 
   /** number of variable datum records */
   this.numberOfVariableDatumRecords = 0;

   /** variableDatums */
    this.variableDatumList = new Array();
 
  this.initFromBinaryDIS = function(inputStream)
  {

       this.protocolVersion = inputStream.readUByte();
       this.exerciseID = inputStream.readUByte();
       this.pduType = inputStream.readUByte();
       this.protocolFamily = inputStream.readUByte();
       this.timestamp = inputStream.readInt();
       this.pduLength = inputStream.readUShort();
       this.padding = inputStream.readShort();
       this.aggregateID.initFromBinaryDIS(inputStream);
       this.forceID = inputStream.readUByte();
       this.aggregateState = inputStream.readUByte();
       this.aggregateType.initFromBinaryDIS(inputStream);
       this.formation = inputStream.readInt();
       this.aggregateMarking.initFromBinaryDIS(inputStream);
       this.dimensions.initFromBinaryDIS(inputStream);
       this.orientation.initFromBinaryDIS(inputStream);
       this.centerOfMass.initFromBinaryDIS(inputStream);
       this.velocity.initFromBinaryDIS(inputStream);
       this.numberOfDisAggregates = inputStream.readUShort();
       this.numberOfDisEntities = inputStream.readUShort();
       this.numberOfSilentAggregateTypes = inputStream.readUShort();
       this.numberOfSilentEntityTypes = inputStream.readUShort();
       for(var idx = 0; idx < this.numberOfDisAggregates; idx++)
       {
           var anX = new dis.AggregateID();
           anX.initFromBinaryDIS(inputStream);
           this.aggregateIDList.push(anX);
       }

       for(var idx = 0; idx < this.numberOfDisEntities; idx++)
       {
           var anX = new dis.EntityID();
           anX.initFromBinaryDIS(inputStream);
           this.entityIDList.push(anX);
       }

       this.pad2 = inputStream.readUByte();
       for(var idx = 0; idx < this.numberOfSilentAggregateTypes; idx++)
       {
           var anX = new dis.EntityType();
           anX.initFromBinaryDIS(inputStream);
           this.silentAggregateSystemList.push(anX);
       }

       for(var idx = 0; idx < this.numberOfSilentEntityTypes; idx++)
       {
           var anX = new dis.EntityType();
           anX.initFromBinaryDIS(inputStream);
           this.silentEntitySystemList.push(anX);
       }

       this.numberOfVariableDatumRecords = inputStream.readInt();
       for(var idx = 0; idx < this.numberOfVariableDatumRecords; idx++)
       {
           var anX = new dis.VariableDatum();
           anX.initFromBinaryDIS(inputStream);
           this.variableDatumList.push(anX);
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
       this.aggregateID.encodeToBinaryDIS(outputStream);
       outputStream.writeUByte(this.forceID);
       outputStream.writeUByte(this.aggregateState);
       this.aggregateType.encodeToBinaryDIS(outputStream);
       outputStream.writeUInt(this.formation);
       this.aggregateMarking.encodeToBinaryDIS(outputStream);
       this.dimensions.encodeToBinaryDIS(outputStream);
       this.orientation.encodeToBinaryDIS(outputStream);
       this.centerOfMass.encodeToBinaryDIS(outputStream);
       this.velocity.encodeToBinaryDIS(outputStream);
       outputStream.writeUShort(this.numberOfDisAggregates);
       outputStream.writeUShort(this.numberOfDisEntities);
       outputStream.writeUShort(this.numberOfSilentAggregateTypes);
       outputStream.writeUShort(this.numberOfSilentEntityTypes);
       for(var idx = 0; idx < this.aggregateIDList.length; idx++)
       {
           aggregateIDList[idx].encodeToBinaryDIS(outputStream);
       }

       for(var idx = 0; idx < this.entityIDList.length; idx++)
       {
           entityIDList[idx].encodeToBinaryDIS(outputStream);
       }

       outputStream.writeUByte(this.pad2);
       for(var idx = 0; idx < this.silentAggregateSystemList.length; idx++)
       {
           silentAggregateSystemList[idx].encodeToBinaryDIS(outputStream);
       }

       for(var idx = 0; idx < this.silentEntitySystemList.length; idx++)
       {
           silentEntitySystemList[idx].encodeToBinaryDIS(outputStream);
       }

       outputStream.writeUInt(this.numberOfVariableDatumRecords);
       for(var idx = 0; idx < this.variableDatumList.length; idx++)
       {
           variableDatumList[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
