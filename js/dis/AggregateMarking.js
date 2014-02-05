/**
 * Section 5.2.37. Specifies the character set used inthe first byte, followed by up to 31 characters of text data.
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.AggregateMarking = function()
{
   /** The character set */
   this.characterSet = 0;

   /** The characters */
   this.characters = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

  this.initFromBinaryDIS = function(inputStream)
  {

       this.characterSet = inputStream.readUByte();
       for(var idx = 0; idx < 31; idx++)
       {
          this.characters[ idx ] = inputStream.readByte();
       }
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUByte(this.characterSet);
       for(var idx = 0; idx < 31; idx++)
       {
          outputStream.writeByte(this.characters[ idx ] );
       }
};
}; // end of class
