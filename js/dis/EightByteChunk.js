/**
 * 64 bit piece of data
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.EightByteChunk = function()
{
   /** Eight bytes of arbitrary data */
   this.otherParameters = new Array(0, 0, 0, 0, 0, 0, 0, 0);

  this.initFromBinaryDIS = function(inputStream)
  {

       for(var idx = 0; idx < 8; idx++)
       {
          this.otherParameters[ idx ] = inputStream.readByte();
       }
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       for(var idx = 0; idx < 8; idx++)
       {
          outputStream.writeByte(this.otherParameters[ idx ] );
       }
};
}; // end of class
