/**
 * Radio modulation
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.ModulationType = function()
{
   /** spread spectrum, 16 bit boolean array */
   this.spreadSpectrum = 0;

   /** major */
   this.major = 0;

   /** detail */
   this.detail = 0;

   /** system */
   this.system = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.spreadSpectrum = inputStream.readUShort();
       this.major = inputStream.readUShort();
       this.detail = inputStream.readUShort();
       this.system = inputStream.readUShort();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUShort(this.spreadSpectrum);
       outputStream.writeUShort(this.major);
       outputStream.writeUShort(this.detail);
       outputStream.writeUShort(this.system);
};
}; // end of class
