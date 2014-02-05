/**
 * Section 5.2.32. Variable Datum Record
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.VariableDatum = function()
{
   /** ID of the variable datum */
   this.variableDatumID = 0;

   /** length of the variable datums */
   this.variableDatumLength = 0;

   /** variable length list of 64-bit datums */
    this.variableDatums = new Array();
 
  this.initFromBinaryDIS = function(inputStream)
  {

       this.variableDatumID = inputStream.readInt();
       this.variableDatumLength = inputStream.readInt();
       for(var idx = 0; idx < this.variableDatumLength; idx++)
       {
           var anX = new dis.EightByteChunk();
           anX.initFromBinaryDIS(inputStream);
           this.variableDatums.push(anX);
       }

  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUInt(this.variableDatumID);
       outputStream.writeUInt(this.variableDatumLength);
       for(var idx = 0; idx < this.variableDatums.length; idx++)
       {
           variableDatums[idx].encodeToBinaryDIS(outputStream);
       }

};
}; // end of class
