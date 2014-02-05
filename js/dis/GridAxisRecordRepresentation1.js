/**
 * 5.2.44: Grid data record, representation 1
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.GridAxisRecordRepresentation1 = function()
{
   /** type of environmental sample */
   this.sampleType = 0;

   /** value that describes data representation */
   this.dataRepresentation = 0;

   /** constant scale factor */
   this.fieldScale = 0;

   /** constant offset used to scale grid data */
   this.fieldOffset = 0;

   /** Number of data values */
   this.numberOfValues = 0;

   /** variable length list of data parameters ^^^this is wrong--need padding as well */
    this.dataValues = new Array();
 
  this.initFromBinaryDIS = function(inputStream)
  {

       this.sampleType = inputStream.readUShort();
       this.dataRepresentation = inputStream.readUShort();
       this.fieldScale = inputStream.readFloat32();
       this.fieldOffset = inputStream.readFloat32();
       this.numberOfValues = inputStream.readUShort();
       for(var idx = 0; idx < this.numberOfValues; idx++)
       {
           var anX = new dis.TwoByteChunk();
           anX.initFromBinaryDIS(inputStream);
           this.dataValues.push(anX);
       }

  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUShort(this.sampleType);
       outputStream.writeUShort(this.dataRepresentation);
       outputStream.writeFloat32(this.fieldScale);
       outputStream.writeFloat32(this.fieldOffset);
       outputStream.writeUShort(this.numberOfValues);
       for(var idx = 0; idx < this.dataValues.length; idx++)
       {
           dataValues[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
