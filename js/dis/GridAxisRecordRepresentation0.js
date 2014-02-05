/**
 * 5.2.44: Grid data record, representation 0
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.GridAxisRecordRepresentation0 = function()
{
   /** type of environmental sample */
   this.sampleType = 0;

   /** value that describes data representation */
   this.dataRepresentation = 0;

   /** number of bytes of environmental state data */
   this.numberOfBytes = 0;

   /** variable length list of data parameters ^^^this is wrong--need padding as well */
    this.dataValues = new Array();
 
  this.initFromBinaryDIS = function(inputStream)
  {

       this.sampleType = inputStream.readUShort();
       this.dataRepresentation = inputStream.readUShort();
       this.numberOfBytes = inputStream.readUShort();
       for(var idx = 0; idx < this.numberOfBytes; idx++)
       {
           var anX = new dis.OneByteChunk();
           anX.initFromBinaryDIS(inputStream);
           this.dataValues.push(anX);
       }

  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUShort(this.sampleType);
       outputStream.writeUShort(this.dataRepresentation);
       outputStream.writeUShort(this.numberOfBytes);
       for(var idx = 0; idx < this.dataValues.length; idx++)
       {
           dataValues[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
